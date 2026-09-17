# selectsourcewater.com migration runbook

## Current state

- `selectsourcewater.com` and `www.selectsourcewater.com` currently serve the Webflow site through Cloudflare.
- This repository currently deploys through GitHub Pages.
- The migration branch prepares this repository to use `selectsourcewater.com` as its canonical domain.
- No DNS or Webflow setting has been changed by this branch.

## Before cutover

1. Approve the rendered replacement site and verify all public claims, offers, contact details, forms, analytics, and conversion tracking.
2. Confirm the customer chat configuration for the public site. The recruiting widget is intentionally limited to careers and application routes.
3. Preserve the recruiting/A2P compliance surface currently associated with `selectsourcewaterusa.com`; do not remove that host until its registration and widget requirements have a replacement.
4. Add and verify `selectsourcewater.com` in Google Search Console. Keep the existing Webflow property accessible during the move.
5. Record the current Cloudflare DNS records and lower TTL before the planned cutover.
6. Verify GitHub Pages accepts `selectsourcewater.com` as the custom domain and that HTTPS enforcement is available.

## Cutover

1. Publish the approved repository version.
2. Replace the Webflow DNS targets with the GitHub Pages records shown in the repository's GitHub Pages settings.
3. Choose one hostname (`selectsourcewater.com` is the canonical in this branch) and redirect `www` to it.
4. Preserve every matching URL path. Create explicit 301 redirects for any Webflow paths that changed.
5. Submit `https://selectsourcewater.com/sitemap.xml` in Search Console and request indexing for the homepage and primary service pages.

## After cutover

1. Verify the homepage and important routes return HTTP 200, the chosen hostname is canonical, and the alternate hostname redirects once.
2. Verify `robots.txt`, the sitemap, structured data, social cards, contact forms, phone links, and analytics on the live domain.
3. Monitor Search Console indexing, canonical selection, 404s, Core Web Vitals, and query performance for at least four weeks.
4. Keep the old Webflow project and DNS record export available until the migration is stable.

## Known redirect map

Configure these as edge-level 301 redirects in Cloudflare during cutover:

| Existing Webflow path | Replacement path |
| --- | --- |
| `/water-filtration-systems-and-services` | `/filtration-technology` |
| `/water-test` | `/free-water-test` |
| `/contact` | `/free-water-test` |
| `/blogs` | `/blog` |

Google currently exposes Webflow articles under `/post/<slug>`. Inventory every indexed `/post/` URL before cutover. Preserve an article at the same path when the replacement has equivalent reviewed content; otherwise redirect it to the closest genuinely equivalent article, not automatically to the homepage.

## Do not do

- Do not point DNS at GitHub before the custom domain is verified there.
- Do not delete the Webflow site before redirects and forms have been validated.
- Do not remove `selectsourcewaterusa.com` without resolving its recruiting/A2P dependency.
- Do not claim rankings are guaranteed; indexing, content usefulness, local authority, and time all affect results.
