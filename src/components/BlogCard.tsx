import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Droplets, Home, Heart, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { type BlogArticle } from '@/data/blogData';
import { cn } from '@/lib/utils';

// Category icon mapping
const categoryIcons: Record<BlogArticle['category'], React.ComponentType<{ className?: string }>> = {
  'water-quality': Droplets,
  'home-improvement': Home,
  'health': Heart,
  'local': MapPin,
};

// Category color dots
const categoryDotColors: Record<BlogArticle['category'], string> = {
  'water-quality': 'bg-blue-500',
  'home-improvement': 'bg-emerald-500',
  'health': 'bg-red-500',
  'local': 'bg-amber-500',
};

const categoryLabels: Record<BlogArticle['category'], string> = {
  'water-quality': 'Water Quality',
  'home-improvement': 'Home Improvement',
  'health': 'Health & Wellness',
  'local': 'Local News',
};

// SVG dot pattern overlay (subtle)
const dotPatternStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E")`,
  backgroundSize: '20px 20px',
};

// Gradient map — avoids Tailwind purge of dynamic class names
const gradientMap: Record<string, string> = {
  'from-blue-600 to-cyan-500':    'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
  'from-red-500 to-orange-500':   'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  'from-slate-600 to-blue-700':   'linear-gradient(135deg, #475569 0%, #1d4ed8 100%)',
  'from-emerald-500 to-teal-600': 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
};

function getGradientStyle(imageGradient: string): React.CSSProperties {
  const bg = gradientMap[imageGradient] ?? 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)';
  return {
    background: bg,
    ...dotPatternStyle,
  };
}

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ article, featured = false, index = 0 }: BlogCardProps) {
  const CategoryIcon = categoryIcons[article.category];
  const dotColor = categoryDotColors[article.category];
  const categoryLabel = categoryLabels[article.category];

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12"
      >
        <Link
          to={`/blog/${article.slug}`}
          className="group block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Gradient header */}
          <div
            className="relative w-full min-h-[280px] md:min-h-[340px] flex items-end p-8 md:p-12"
            style={getGradientStyle(article.imageGradient)}
          >
            {/* Large category icon watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <CategoryIcon className="w-64 h-64 text-white" />
            </div>

            {/* Featured badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                Featured Article
              </span>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  <span className={cn('w-2 h-2 rounded-full', dotColor)} />
                  {categoryLabel}
                </span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </span>
                <span className="flex items-center gap-1.5 text-white/80 text-sm">
                  <Calendar className="w-4 h-4" />
                  {format(parseISO(article.publishedAt), 'MMM d, yyyy')}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3 max-w-2xl">
                {article.title}
              </h2>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mb-6 line-clamp-2">
                {article.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full group-hover:gap-3 transition-all duration-200">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Standard card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      layout
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full block"
      >
        {/* Gradient image header */}
        <div
          className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
          style={getGradientStyle(article.imageGradient)}
        >
          {/* Category icon overlay */}
          <CategoryIcon className="w-20 h-20 text-white/20" />

          {/* Smaller foreground icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <CategoryIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Read time chip */}
          <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Category badge + date */}
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              <span className={cn('w-1.5 h-1.5 rounded-full', dotColor)} />
              {categoryLabel}
            </span>
            <span className="text-xs text-muted-foreground">
              {format(parseISO(article.publishedAt), 'MMM d, yyyy')}
            </span>
          </div>

          <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-snug">
            {article.title}
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
            {article.excerpt}
          </p>

          <span className="text-primary font-medium text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200 mt-auto">
            Read Article <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
