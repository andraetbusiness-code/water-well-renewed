/**
 * Pre-render every generated route into real HTML.
 *
 * Why this exists: `prepare-pages.mjs` copies the built SPA shell to each route
 * and rewrites only <title>, <link rel="canonical"> and og:url. The <body> stays
 * empty, so anything that does not execute JavaScript sees a blank document.
 * Google renders JS on a second pass, but AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, CCBot, Google-Extended) do not. They were seeing 94 blank pages.
 *
 * This serves dist/ locally, loads each route in Chromium, waits for React to
 * finish, and writes the rendered DOM back over the shell. That single pass also
 * lands the JSON-LD, the <h1>s and the <img> tags, all of which are produced by
 * React and were therefore never reaching the HTML either.
 *
 * The app uses createRoot (client render, not hydrateRoot), so React replaces
 * this markup on load rather than hydrating it. That is intentional and is why
 * no hydration-mismatch handling is needed here.
 */
import { createServer } from "node:http";
import { readFile, writeFile, stat } from "node:fs/promises";
import { join, extname, dirname, relative, sep } from "node:path";
import { glob } from "node:fs/promises";
import { chromium } from "playwright";

const root = process.cwd();
const dist = join(root, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

async function collectPages() {
  const pages = [];
  for await (const entry of glob("**/*.html", { cwd: dist })) {
    const abs = join(dist, entry);
    const html = await readFile(abs, "utf8");

    // Never pre-render the legacy redirect pages: the browser would follow the
    // meta refresh and we would write the destination's markup over them.
    if (/http-equiv=["']refresh["']/i.test(html)) continue;

    // The three static legal pages are already real HTML, not shells.
    if (!entry.endsWith("index.html")) continue;

    const dir = dirname(entry);
    const route = dir === "." ? "/" : `/${dir.split(sep).join("/")}/`;
    pages.push({ abs, route });
  }
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

async function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let path = decodeURIComponent(url.pathname);
      let file = join(dist, path);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      } catch {
        // Unknown path: fall back to the SPA 404 so the render still resolves.
        file = join(dist, "404.html");
      }
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
    }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { server, port: server.address().port };
}

const CONCURRENCY = 6;

async function run() {
  const pages = await collectPages();
  const { server, port } = await serveDist();
  const base = `http://127.0.0.1:${port}`;
  // CI installs its own browser via `npx playwright install chromium`. Some
  // sandboxes ship a preinstalled one instead; PRERENDER_CHROMIUM points at it.
  const executablePath = process.env.PRERENDER_CHROMIUM || undefined;
  const browser = await chromium.launch({ args: ["--no-sandbox"], executablePath });

  let done = 0;
  const failures = [];
  const queue = [...pages];

  async function worker() {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    // Images are irrelevant to the markup we capture and dominate render time.
    await page.route("**/*.{png,jpg,jpeg,webp,avif,gif,mp4,woff,woff2}", (r) => r.abort());

    while (queue.length) {
      const item = queue.shift();
      try {
        await page.goto(base + item.route, { waitUntil: "networkidle", timeout: 45000 });
        await page.waitForFunction(
          () => {
            const el = document.getElementById("root");
            return el && el.innerHTML.trim().length > 500;
          },
          { timeout: 20000 },
        );
        const html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
        await writeFile(item.abs, html);
        done += 1;
      } catch (err) {
        failures.push({ route: item.route, error: err.message.split("\n")[0].slice(0, 120) });
      }
    }
    await ctx.close();
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();
  server.close();

  console.log(`Pre-rendered ${done} of ${pages.length} routes.`);
  if (failures.length) {
    console.error(`\n${failures.length} route(s) failed to pre-render:`);
    for (const f of failures) console.error(`  ${f.route} — ${f.error}`);
    // A shell that failed to render is an SEO regression, not a warning.
    process.exitCode = 1;
  }
}

await run();
