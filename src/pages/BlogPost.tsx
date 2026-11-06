import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/data/blogData";
import { site } from "@/data/site";
import NotFound from "@/pages/NotFound";

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Inline: **bold** and [text](/path) */
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-foreground">{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <Link key={i} to={link[2]} className="font-medium text-primary underline underline-offset-4">{link[1]}</Link>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function renderBlocks(blocks: string[]) {
  const out: JSX.Element[] = [];
  let list: string[] = [];
  const flush = (key: number) => {
    if (!list.length) return;
    out.push(
      <ul key={`ul-${key}`} className="my-5 list-disc space-y-2 pl-6 text-foreground/85">
        {list.map((li, i) => <li key={i}>{inline(li)}</li>)}
      </ul>,
    );
    list = [];
  };
  blocks.forEach((b, i) => {
    if (b.startsWith("- ")) { list.push(b.slice(2)); return; }
    flush(i);
    if (b.startsWith("## ")) {
      const t = b.slice(3);
      out.push(<h2 key={i} id={slugify(t)} className="mb-3 mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl">{t}</h2>);
    } else if (b.startsWith("### ")) {
      out.push(<h3 key={i} className="mb-2 mt-8 text-xl font-semibold tracking-tight">{b.slice(4)}</h3>);
    } else {
      out.push(<p key={i} className="my-4 text-lg leading-relaxed text-foreground/85">{inline(b)}</p>);
    }
  });
  flush(blocks.length);
  return out;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;

  const canonical = `${site.url}/blog/${article.slug}/`;
  const more = blogArticles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);
  const date = new Date(article.publishedAt + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <PageLayout>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            mainEntityOfPage: canonical,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@id": `${site.url}/#organization` },
          })}
        </script>
        {article.faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: article.faqSchema.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
            })}
          </script>
        )}
      </Helmet>

      <article className="container py-14 md:py-20">
        <Link to="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">All guides</Link>
        <h1 className="display mt-6 max-w-4xl text-4xl sm:text-6xl">{article.title}</h1>
        <p className="mt-6 text-sm text-muted-foreground">{date} &middot; {article.readTime} min read</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,44rem)_1fr] lg:gap-20">
          <div>{renderBlocks(article.content)}</div>

          <aside className="self-start lg:sticky lg:top-28">
            <div className="rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold tracking-tight">Need service?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Tell us what you have. Our team contacts you to schedule.</p>
              <Button className="mt-5 w-full" asChild>
                <Link to="/service">Request service</Link>
              </Button>
              <a href={site.phoneHref} className="tabular mt-4 block text-center text-sm font-semibold hover:text-primary">{site.phone}</a>
            </div>
            {article.related && (
              <ul className="rule-list mt-8 border-y border-border">
                {article.related.map((r) => (
                  <li key={r.href}>
                    <Link to={r.href} className="block py-3 text-sm font-medium hover:text-primary">{r.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>

        {more.length > 0 && (
          <div className="mt-20 border-t border-border pt-10">
            <h2 className="text-2xl font-semibold tracking-tight">More guides</h2>
            <ul className="rule-list mt-4 border-y border-border">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link to={`/blog/${m.slug}`} className="block py-4 text-lg font-medium hover:text-primary">{m.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </PageLayout>
  );
}
