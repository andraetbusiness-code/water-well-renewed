import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Presentation, Monitor, Users, Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { usePresentations } from '@/hooks/usePresentations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const categoryIcons = {
  training: Users,
  marketing: Monitor,
  internal: Briefcase
};

const categoryLabels = {
  training: 'Training',
  marketing: 'Marketing',
  internal: 'Internal'
};

export default function Presentations() {
  const { data: presentations, isLoading, error } = usePresentations();
  
  return (
    <>
      <Helmet>
        <title>Presentations | Select Source Water</title>
        <meta name="description" content="Training, marketing, and internal presentations" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary tracking-wider uppercase mb-4 block">
              Resources
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Presentations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Training materials, sales decks, and internal documentation
            </p>
          </motion.div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Unable to load presentations</p>
            </div>
          )}
          
          {/* Empty state */}
          {!isLoading && !error && presentations?.length === 0 && (
            <div className="text-center py-20">
              <Presentation className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No presentations available yet</p>
            </div>
          )}
          
          {/* Presentations grid */}
          {presentations && presentations.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presentations.map((pres, index) => {
                const IconComponent = categoryIcons[pres.category] || Presentation;
                
                return (
                  <motion.div
                    key={pres.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/presentations/${pres.slug}`}
                      className="group block bg-card border border-border/30 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Category badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary tracking-wider uppercase">
                          {categoryLabels[pres.category]}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pres.title}
                      </h2>
                      
                      {/* Description */}
                      {pres.description && (
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {pres.description}
                        </p>
                      )}
                      
                      {/* View link */}
                      <div className="flex items-center text-primary font-medium">
                        View presentation
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
