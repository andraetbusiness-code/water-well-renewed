import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface IntegrationBannerProps {
  hasGHL: boolean;
}

export function IntegrationBanner({ hasGHL }: IntegrationBannerProps) {
  // If GHL is connected, nothing to prompt.
  if (hasGHL) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-dashed border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Connect GoHighLevel</h3>
                <p className="text-sm text-muted-foreground">
                  Push D2D and Home Depot leads directly into your CRM.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary">GoHighLevel</Badge>

              <Button asChild size="sm">
                <Link to="/portal/admin/settings">
                  Connect
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
