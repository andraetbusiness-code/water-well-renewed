// Article content comes from guideData.ts, rewritten to the SSW compliance floor
// (no prices, no contaminant or health claims, no invented local numbers,
// "complimentary" test). This file keeps the live blog's shape and design.
import { guideArticles, type GuideArticle } from "@/data/guideData";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: 'water-quality' | 'home-improvement' | 'health' | 'local';
  readTime: number;
  publishedAt: string;
  imageGradient: string;
  imagePlaceholder: string;
  metaTitle: string;
  metaDescription: string;
  content: string[];
  tags: string[];
  related?: { label: string; href: string }[];
  faqSchema?: { question: string; answer: string }[];
}

export const blogCategories = [
  { value: 'all', label: 'All Articles' },
  { value: 'home-improvement', label: 'Service & Care' },
  { value: 'water-quality', label: 'Know Your Water' },
  { value: 'local', label: 'By Region' },
];

const categoryMap: Record<GuideArticle['category'], BlogArticle['category']> = {
  service: 'home-improvement',
  'know-your-water': 'water-quality',
  areas: 'local',
};
const look: Record<BlogArticle['category'], { imageGradient: string; imagePlaceholder: string }> = {
  'home-improvement': { imageGradient: 'from-blue-600 to-cyan-500', imagePlaceholder: '🔧' },
  'water-quality': { imageGradient: 'from-emerald-500 to-teal-600', imagePlaceholder: '💧' },
  health: { imageGradient: 'from-emerald-500 to-teal-600', imagePlaceholder: '💧' },
  local: { imageGradient: 'from-slate-600 to-blue-700', imagePlaceholder: '📍' },
};

export const blogArticles: BlogArticle[] = guideArticles.map((a) => {
  const category = categoryMap[a.category];
  return { ...a, category, ...look[category] };
});
