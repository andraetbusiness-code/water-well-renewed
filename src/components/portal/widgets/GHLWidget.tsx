import { motion } from 'framer-motion';
import { Target, DollarSign, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Placeholder data - will be replaced with real data from leads table
const placeholderPipeline = {
  stages: [
    { name: 'New Leads', count: 24, color: 'bg-blue-500' },
    { name: 'Qualified', count: 12, color: 'bg-purple-500' },
    { name: 'Proposal', count: 8, color: 'bg-orange-500' },
    { name: 'Closed', count: 5, color: 'bg-green-500' },
  ],
  totalValue: 145000,
  closedThisMonth: 3,
};

export function GHLWidget() {
  const totalLeads = placeholderPipeline.stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Pipeline Overview
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/portal/pipeline">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Pipeline Funnel */}
          <div className="flex items-center gap-1 mb-4">
            {placeholderPipeline.stages.map((stage, index) => (
              <div key={stage.name} className="flex-1 flex items-center">
                <div className="text-center flex-1">
                  <div className={`h-2 rounded-full ${stage.color} mb-1`} />
                  <p className="text-xs text-muted-foreground">{stage.name}</p>
                  <p className="text-lg font-bold">{stage.count}</p>
                </div>
                {index < placeholderPipeline.stages.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-muted-foreground mx-1 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="h-3.5 w-3.5" />
                <span className="text-xs">Total Leads</span>
              </div>
              <p className="text-xl font-bold">{totalLeads}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="text-xs">Pipeline Value</span>
              </div>
              <p className="text-xl font-bold">
                ${(placeholderPipeline.totalValue / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
