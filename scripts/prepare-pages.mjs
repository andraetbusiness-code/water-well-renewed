import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const source = await readFile(join(dist, "index.html"), "utf8");
const site = "https://selectsourcewater.com";

const citySource = await readFile(join(root, "src/data/cityData.ts"), "utf8");
const storeAreaSource = await readFile(join(root, "src/data/storeServiceAreas.ts"), "utf8");
const blogSource = await readFile(join(root, "src/data/guideData.ts"), "utf8");
const citySlugs = [...new Set([
  ...[...citySource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]),
  ...[...storeAreaSource.matchAll(/marketSlug:\s*["']([^"']+)["']/g)].map((match) => match[1]),
])];
const blogSlugs = [...blogSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);

const publicRoutes = [
  "hygia-system",
  "filtration-technology",
  "what-in-water",
  "service",
  "maintenance",
  "process",
  "gallery",
  "service-areas",
  "home-depot-authorized-provider",
  "blog",
  "about",
  "complimentary-water-test",
  "careers",
  "careers/customer-engagement-representative",
  "careers/water-testing-specialist",
  "careers/water-treatment-installer",
  "careers/sales-market-manager",
  ...citySlugs.map((slug) => `service-areas/${slug}`),
  ...blogSlugs.map((slug) => `blog/${slug}`),
];

// GitHub Pages serves every route as a directory, so /about 301s to /about/.
// Canonicals, og:url and the sitemap all use the trailing-slash URL so nothing
// points at a redirect.
const pageUrl = (route) => (route ? `${site}/${route}/` : `${site}/`);

// The SMS consent forms link to the static /privacy-policy.html and
// /terms-of-service.html, so those stay the indexed versions. The React routes
// with the same content are kept for the footer but point their canonical at
// the static file and are not indexed.
const legalMirrors = {
  "privacy-policy": "privacy-policy.html",
  "terms-of-service": "terms-of-service.html",
};

const privateRoutes = [
  "404",
  "apply",
  "portal",
  "onboarding",
  "audit",
  "growth-plan",
  "gbp-audit",
  "presentations",
  "demo/hygia-plus",
];

function withCanonical(html, route) {
  const canonical = pageUrl(route);
  const pageName = route
    .split("/")
    .at(-1)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return html
    .replace(/<title>[^<]+<\/title>/, `<title>${pageName} | Select Source Water</title>`)
    .replace(/<link rel="canonical" href="[^"]+"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]+"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
}

function noindex(html) {
  return html.replace(
    /<meta name="robots" content="[^"]+"\s*\/>/,
    '<meta name="robots" content="noindex, nofollow" />',
  );
}

async function writeRoute(route, html) {
  const output = join(dist, route, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

await Promise.all(publicRoutes.map((route) => writeRoute(route, withCanonical(source, route))));
await Promise.all(privateRoutes.map((route) => writeRoute(route, noindex(source))));
await writeFile(join(dist, "404.html"), noindex(source));

function legalMirror(html, staticFile) {
  const canonical = `${site}/${staticFile}`;
  return noindex(html)
    .replace(/<link rel="canonical" href="[^"]+"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta name="robots" content="[^"]+"\s*\/>/, '<meta name="robots" content="noindex, follow" />');
}
await Promise.all(
  Object.entries(legalMirrors).map(([route, file]) => writeRoute(route, legalMirror(source, file))),
);

// Legacy Webflow URLs from the previous selectsourcewater.com site.
// GitHub Pages cannot serve server-side 301s, so each legacy path gets a small
// page that carries the canonical of its replacement and sends the visitor there.
const legacyRedirects = {
  "water-filtration-systems-and-services": "filtration-technology",
  "water-test": "complimentary-water-test",
  "contact": "complimentary-water-test",
  // Renamed 2026-11-06: the test is complimentary, never "free".
  "free-water-test": "complimentary-water-test",
  "blog/free-water-test-beaumont-riverside-county": "blog/complimentary-water-test-beaumont-riverside-county",
  "blogs": "blog",
  // Posts removed 2026-11-06 (unsourced contaminant, price or local-statistic claims)
  "blog/arsenic-in-hemet-water": "blog",
  "blog/chromium-6-california-drinking-water": "blog",
  "blog/banning-ca-water-quality-report": "blog",
  "blog/home-depot-authorized-water-treatment-provider": "home-depot-authorized-provider",
  // Ranking URLs that returned 404 in the 2026-11-05 Semrush audit.
  "post/water-softener-vs-water-conditioner-which-is-best-for-sacramento-homes": "service-areas/sacramento-ca",
  "water-filtration-systems-services": "filtration-technology",
  // 404s still collecting impressions in Search Console (read 2026-11-05).
  "warranty": "hygia-system",
};

async function writeRedirect(fromRoute, toRoute) {
  const target = pageUrl(toRoute);
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Moved | Select Source Water</title>
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex, follow" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <script>window.location.replace(${JSON.stringify(target)});</script>
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${target}</a>.</p>
  </body>
</html>
`;
  const output = join(dist, fromRoute, "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

await Promise.all(
  Object.entries(legacyRedirects).map(([from, to]) => writeRedirect(from, to)),
);

const sitemapRoutes = ["", ...publicRoutes].filter((route) => !route.startsWith("careers/"));
const sitemapUrls = [...sitemapRoutes.map(pageUrl), ...Object.values(legalMirrors).map((file) => `${site}/${file}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

console.log(`Prepared ${publicRoutes.length} public routes, ${privateRoutes.length} private routes, and ${Object.keys(legacyRedirects).length} legacy redirects.`);
