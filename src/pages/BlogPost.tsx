import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBar from '@/components/TrustBar';
import ContactCTA from '@/components/ContactCTA';
import { blogArticles } from '@/data/blogData';
import { format, parseISO } from 'date-fns';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-style heading rendering
  const renderContent = (block: string) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={block} className="text-2xl font-bold text-foreground mt-8 mb-4">
          {block.replace('## ', '')}
        </h2>
      );
    }
    return (
      <p key={block.substring(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
        {block}
      </p>
    );
  };

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://selectsourcewatercalifornia.com/blog/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.publishedAt,
            author: {
              '@type': 'Organization',
              name: 'Select Source Water',
            },
          })}
        </script>
      </Helmet>

      <Header />
      <TrustBar />

      <main className="min-h-screen bg-background">
        <article className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Category + Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium capitalize">
              {article.category.replace('-', ' ')}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(parseISO(article.publishedAt), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Content */}
          <div className="prose-lg">
            {article.content.map(renderContent)}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            <Tag className="w-4 h-4 text-muted-foreground mt-1" />
            {article.tags.map(tag => (
              <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Get Your Free Water Test</h3>
            <p className="text-muted-foreground mb-4">
              Find out exactly what's in your Inland Empire water supply — completely free, no obligation.
            </p>
            <a
              href="tel:+19516124094"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Call (951) 612-4094
            </a>
          </div>
        </article>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
