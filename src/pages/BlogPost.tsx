import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Tag,
  Droplets,
  Home,
  Heart,
  MapPin,
  Facebook,
  Link as LinkIcon,
  Twitter,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { ContactCTA } from '@/components/ContactCTA';
import { blogArticles, type BlogArticle } from '@/data/blogData';
import { cn } from '@/lib/utils';

// ─── Category config ───────────────────────────────────────────────────────────
const categoryIcons: Record<BlogArticle['category'], React.ComponentType<{ className?: string }>> = {
  'water-quality': Droplets,
  'home-improvement': Home,
  'health': Heart,
  'local': MapPin,
};

const categoryLabels: Record<BlogArticle['category'], string> = {
  'water-quality': 'Water Quality',
  'home-improvement': 'Home Improvement',
  'health': 'Health & Wellness',
  'local': 'Local News',
};

// ─── SVG dot pattern ───────────────────────────────────────────────────────────
const dotPatternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E")`,
  backgroundSize: '20px 20px',
};

// Gradient map — inline CSS avoids Tailwind purge of dynamic class names
const gradientMap: Record<string, string> = {
  'from-blue-600 to-cyan-500':    'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
  'from-red-500 to-orange-500':   'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  'from-slate-600 to-blue-700':   'linear-gradient(135deg, #475569 0%, #1d4ed8 100%)',
  'from-emerald-500 to-teal-600': 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
};

function getGradientStyle(imageGradient: string): React.CSSProperties {
  const bg = gradientMap[imageGradient] ?? 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)';
  return { background: bg, ...dotPatternStyle };
}

// ─── Reading progress bar ─────────────────────────────────────────────────────
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setProgress(Math.min(100, (scrollTop / scrollHeight) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
      <motion.div
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
        transition={{ ease: 'linear', duration: 0.05 }}
      />
    </div>
  );
}

// ─── Parse H2 headings from content ──────────────────────────────────────────
function extractH2s(content: string[]): string[] {
  return content
    .filter(b => b.startsWith('## '))
    .map(b => b.replace('## ', ''));
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── Table of contents ─────────────────────────────────────────────────────────
interface TOCProps {
  headings: string[];
  activeId: string;
}

function TableOfContents({ headings, activeId }: TOCProps) {
  const [open, setOpen] = useState(false);

  if (headings.length < 3) return null;

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-secondary/60 backdrop-blur-sm border border-border rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            In this article
          </p>
          <nav className="space-y-1">
            {headings.map(h => {
              const id = slugify(h);
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={cn(
                    'block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 leading-snug',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary pl-2.5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {h}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile collapsible */}
      <div className="xl:hidden mb-6 bg-secondary/60 border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground"
        >
          <span>Table of Contents</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border px-5 pb-4 pt-2 space-y-1"
            >
              {headings.map(h => (
                <a
                  key={slugify(h)}
                  href={`#${slugify(h)}`}
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById(slugify(h))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setOpen(false);
                  }}
                  className="block text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  {h}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── Bold markdown helper ──────────────────────────────────────────────────────
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

// ─── Content renderer ──────────────────────────────────────────────────────────
function renderContent(block: string, index: number) {
  // H2
  if (block.startsWith('## ')) {
    const text = block.replace('## ', '');
    const id = slugify(text);
    return (
      <h2
        key={index}
        id={id}
        className="text-2xl font-bold text-foreground mt-10 mb-4 pl-4 border-l-4 border-primary leading-tight scroll-mt-24"
      >
        {text}
      </h2>
    );
  }

  // H3
  if (block.startsWith('### ')) {
    const text = block.replace('### ', '');
    return (
      <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-3 leading-snug">
        {text}
      </h3>
    );
  }

  // STAT callout
  if (block.startsWith('STAT: ')) {
    const text = block.replace('STAT: ', '');
    const match = text.match(/^([\d,%.+x]+)\s*(.*)$/);
    if (match) {
      return (
        <div key={index} className="my-8 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <div className="text-5xl font-bold text-primary mb-2">{match[1]}</div>
          <p className="text-muted-foreground text-base">{match[2]}</p>
        </div>
      );
    }
    return (
      <div key={index} className="my-8 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
        <p className="text-xl font-semibold text-primary">{text}</p>
      </div>
    );
  }

  // Normal paragraph
  return (
    <p key={index} className="text-foreground/80 leading-[1.85] text-[1.0625rem] mb-5">
      {renderInline(block)}
    </p>
  );
}

// ─── FAQ Accordion ──────────────────────────────────────────────────────────────
interface FAQProps {
  items: { question: string; answer: string }[];
}

function FAQAccordion({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 border-t border-border pt-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground hover:bg-secondary/50 transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn('w-5 h-5 text-muted-foreground flex-shrink-0 ml-3 transition-transform duration-200', openIndex === i && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pt-2 text-muted-foreground text-sm leading-relaxed border-t border-border">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Related Articles ──────────────────────────────────────────────────────────
interface RelatedProps {
  current: BlogArticle;
}

function RelatedArticles({ current }: RelatedProps) {
  const related = blogArticles
    .filter(a => a.slug !== current.slug && a.category === current.category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 border-t border-border pt-10">
      <h2 className="text-xl font-bold text-foreground mb-5">More in {categoryLabels[current.category]}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {related.map(article => {
          const Icon = categoryIcons[article.category];
          return (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group flex flex-col rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Mini gradient thumb */}
              <div
                className="relative h-24 flex items-center justify-center"
                style={getGradientStyle(article.imageGradient)}
              >
                <div className="bg-white/15 rounded-xl p-2.5 border border-white/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-4 flex-1">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                  {article.title}
                </p>
                <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── Share buttons ─────────────────────────────────────────────────────────────
interface ShareProps {
  title: string;
  slug: string;
}

function ShareButtons({ title, slug }: ShareProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://selectsourcewatercalifornia.com/blog/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
      <span className="text-sm text-muted-foreground font-medium mr-1">Share:</span>
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-[#1877F2] text-white text-xs font-semibold px-3.5 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        <Facebook className="w-3.5 h-3.5" />
        Facebook
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-semibold px-3.5 py-2 rounded-full hover:opacity-80 transition-opacity"
      >
        <Twitter className="w-3.5 h-3.5" />
        X / Twitter
      </a>
      <button
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-all',
          copied
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border'
        )}
      >
        <LinkIcon className="w-3.5 h-3.5" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}

// ─── Author Box ────────────────────────────────────────────────────────────────
function AuthorBox() {
  return (
    <div className="mt-8 flex items-start gap-4 p-5 bg-secondary/50 border border-border rounded-2xl">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
        <Droplets className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">Select Source Water Team</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Water treatment experts serving the Inland Empire since 1998.
        </p>
      </div>
    </div>
  );
}

// ─── Main BlogPost ─────────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);
  const [activeId, setActiveId] = useState('');
  const articleRef = useRef<HTMLDivElement>(null);

  // Active section tracking
  useEffect(() => {
    if (!article) return;
    const h2s = extractH2s(article.content);
    if (h2s.length < 3) return;

    const ids = h2s.map(slugify);
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-20% 0% -60% 0%' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const CategoryIcon = categoryIcons[article.category];
  const categoryLabel = categoryLabels[article.category];
  const h2Headings = extractH2s(article.content);
  const showTOC = h2Headings.length >= 3;

  const faqJsonLd = article.faqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqSchema.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

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
        {faqJsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(faqJsonLd)}
          </script>
        )}
      </Helmet>

      {/* Reading progress bar */}
      <ReadingProgressBar />

      <Header />
      <TrustBar />

      <main className="min-h-screen bg-background">
        {/* ── Featured image header ── */}
        <div
          className="relative w-full min-h-[300px] md:min-h-[360px] flex items-end"
          style={getGradientStyle(article.imageGradient)}
        >
          {/* Large icon watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <CategoryIcon className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 container mx-auto px-4 pb-10 pt-16 max-w-4xl">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                <CategoryIcon className="w-3.5 h-3.5" />
                {categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                {format(parseISO(article.publishedAt), 'MMMM d, yyyy')}
              </span>
              <span className="flex items-center gap-1.5 text-white/80 text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>

        {/* ── Article body + sidebar ── */}
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className={cn('flex gap-12', showTOC && 'xl:flex-row-reverse')}>
            {/* TOC sidebar */}
            {showTOC && (
              <TableOfContents headings={h2Headings} activeId={activeId} />
            )}

            {/* Main content */}
            <article ref={articleRef} className="min-w-0 flex-1">
              {/* Content blocks */}
              <div className="prose-article">
                {article.content.map((block, i) => renderContent(block, i))}
              </div>

              {/* Author box */}
              <AuthorBox />

              {/* Share buttons */}
              <ShareButtons title={article.title} slug={article.slug} />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                <Tag className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                {article.tags.map(tag => (
                  <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Related articles */}
              <RelatedArticles current={article} />

              {/* FAQ */}
              {article.faqSchema && article.faqSchema.length > 0 && (
                <FAQAccordion items={article.faqSchema} />
              )}

              {/* CTA */}
              <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Get Your Free Water Test</h3>
                <p className="text-muted-foreground mb-5">
                  Find out exactly what's in your Inland Empire water supply — completely free, no obligation.
                </p>
                <a
                  href="tel:+19514995136"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Call (951) 499-5136
                </a>
              </div>
            </article>
          </div>
        </div>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
