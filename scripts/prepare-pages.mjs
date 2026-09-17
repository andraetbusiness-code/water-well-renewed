import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const source = await readFile(join(dist, "index.html"), "utf8");
const site = "https://selectsourcewaterusa.com";

const citySource = await readFile(join(root, "src/data/cityData.ts"), "utf8");
const storeAreaSource = await readFile(join(root, "src/data/storeServiceAreas.ts"), "utf8");
const blogSource = await readFile(join(root, "src/data/blogData.ts"), "utf8");
const citySlugs = [...new Set([
  ...[...citySource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]),
  ...[...storeAreaSource.matchAll(/marketSlug:\s*["']([^"']+)["']/g)].map((match) => match[1]),
])];
const blogSlugs = [...blogSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]);

const publicRoutes = [
  "hygia-system",
  "filtration-technology",
  "what-in-water",
  "maintenance",
  "process",
  "gallery",
  "service-areas",
  "home-depot-authorized-provider",
  "blog",
  "about",
  "free-water-test",
  "careers",
  "careers/customer-engagement-representative",
  "careers/water-testing-specialist",
  "careers/water-treatment-installer",
  "careers/sales-market-manager",
  "privacy-policy",
  "terms-of-service",
  ...citySlugs.map((slug) => `service-areas/${slug}`),
  ...blogSlugs.map((slug) => `blog/${slug}`),
];

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
  const canonical = `${site}/${route}`;
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

const sitemapRoutes = ["", ...publicRoutes].filter((route) => !route.startsWith("careers/"));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url><loc>${site}/${route}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

console.log(`Prepared ${publicRoutes.length} public routes and ${privateRoutes.length} private routes.`);
