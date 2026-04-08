import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { ContactCTA } from '@/components/ContactCTA';
import { WaveDivider } from '@/components/WaveDivider';
import { BlogCard } from '@/components/BlogCard';
import { blogArticles, blogCategories } from '@/data/blogData';
import { cn } from '@/lib/utils';

// Category color dots for filter bar
const categoryDotColors: Record<string, string> = {
  'all': 'bg-primary',
  'water-quality': 'bg-blue-500',
  'home-improvement': 'bg-emerald-500',
  'health': 'bg-red-500',
  'local': 'bg-amber-500',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? blogArticles
    : blogArticles.filter(a => a.category === activeCategory);

  // Featured = first article (latest)
  const featuredArticle = blogArticles[0];
  const gridArticles = activeCategory === 'all'
    ? blogArticles.slice(1)
    : filtered;

  const showFeatured = activeCategory === 'all';

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
        <section className="relative bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground py-20 md:py-28 overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
            {/* Article count badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
            >
              <BookOpen className="w-4 h-4" />
              {blogArticles.length} articles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
            >
              Water Quality Blog
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Expert insights on water quality, treatment technology, and protecting your Inland Empire home.
            </motion.p>
          </div>

          {/* Wave divider */}
          <WaveDivider position="bottom" variant="smooth" fillColor="hsl(var(--background))" />
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 pt-12 pb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200',
                  activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70 hover:scale-105'
                )}
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full transition-opacity',
                    categoryDotColors[cat.value],
                    activeCategory === cat.value ? 'opacity-100' : 'opacity-60'
                  )}
                />
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className="container mx-auto px-4 pb-20">
          {/* Featured Article */}
          <AnimatePresence mode="wait">
            {showFeatured && (
              <motion.div
                key="featured"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BlogCard article={featuredArticle} featured />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(showFeatured ? gridArticles : filtered).map((article, i) => (
                <BlogCard key={article.slug} article={article} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground py-16 text-lg"
            >
              No articles in this category yet. Check back soon!
            </motion.p>
          )}
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
