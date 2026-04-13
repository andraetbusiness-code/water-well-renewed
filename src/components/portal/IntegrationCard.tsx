import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Settings2, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSyncIntegration } from '@/hooks/useIntegrations';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface IntegrationCardProps {
  system: 'ghl';
  name: string;
  description: string;
  icon: React.ReactNode;
  configured: boolean;
  active: boolean;
  lastSync: string | null;
  error: string | null;
  onConnect: () => void;
}

export function IntegrationCard({
  system,
  name,
  description,
  icon,
  configured,
  active,
  lastSync,
  error,
  onConnect,
}: IntegrationCardProps) {
  const { mutate: syncIntegration, isPending: isSyncing } = useSyncIntegration();

  const handleSync = () => {
    syncIntegration(system, {
      onSuccess: (data) => {
        toast({
          title: 'Sync Complete',
          description: data.message || `${name} data synced successfully.`,
        });
      },
      onError: (err) => {
        toast({
          title: 'Sync Failed',
          description: err.message || 'Failed to sync data.',
          variant: 'destructive',
        });
      },
    });
  };

  const isConnected = configured && active;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={isConnected ? 'border-green-500/30 bg-green-500/5' : ''}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isConnected ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'
              }`}>
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {name}
                  {isConnected ? (
                    <Badge variant="default" className="bg-green-500 text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      <XCircle className="h-3 w-3 mr-1" />
                      Not Connected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Status Info */}
          {isConnected && lastSync && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-3.5 w-3.5" />
              <span>Last synced {formatDistanceToNow(new Date(lastSync), { addSuffix: true })}</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive mb-4 p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {isConnected ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSync}
                  disabled={isSyncing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </Button>
                <Button variant="ghost" size="sm" onClick={onConnect}>
                  <Settings2 className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </>
            ) : (
              <Button onClick={onConnect}>
                Connect {name}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
