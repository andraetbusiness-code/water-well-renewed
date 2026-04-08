import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrustBar from '@/components/TrustBar';
import ContactCTA from '@/components/ContactCTA';
import { blogArticles, blogCategories } from '@/data/blogData';
import { cn } from '@/lib/utils';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Water Quality Blog | Select Source Water California</title>
        <meta name="description" content="Expert articles on water quality, hard water solutions, and home water treatment for the Inland Empire. Tips from Select Source Water." />
        <link rel="canonical" href="https://selectsourcewatercalifornia.com/blog" />
      </Helmet>

      <Header />
      <TrustBar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Water Quality Blog</h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Expert insights on water quality, treatment technology, and protecting your Inland Empire home.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(article => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-secondary flex items-center justify-center text-6xl">
                  {article.imagePlaceholder}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium capitalize">
                      {article.category.replace('-', ' ')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min read
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No articles in this category yet. Check back soon!
            </p>
          )}
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
