import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import { blogArticles, blogCategories } from "@/data/blogData";
import { site } from "@/data/site";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Blog() {
  const [cat, setCat] = useState("all");
  const posts = [...blogArticles]
    .filter((a) => cat === "all" || a.category === cat)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <PageLayout>
      <Helmet>
        <title>Water System Guides | Select Source Water</title>
        <meta name="description" content="Plain-language guides on water softener, filter and reverse osmosis service, hard water, and getting your water tested." />
        <link rel="canonical" href={`${site.url}/blog/`} />
      </Helmet>

      <PageHero title="Guides." description="Plain-language help for owners of water softeners, filters and reverse osmosis systems." />

      <section className="py-12 md:py-16">
        <div className="container">
          <div role="group" aria-label="Filter guides" className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={cat === c.value}
                onClick={() => setCat(c.value)}
                className={`h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
                  cat === c.value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="rule-list mt-10 border-y border-border">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="group grid gap-2 py-7 md:grid-cols-[9rem_1fr] md:gap-10">
                  <p className="text-sm text-muted-foreground">{fmt(p.publishedAt)}</p>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight group-hover:text-primary">{p.title}</h2>
                    <p className="measure mt-2 text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
