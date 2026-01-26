import { motion } from 'framer-motion';
import { Target, DollarSign, Users, Filter, ArrowRight, Phone, Mail, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { useAuthContext } from '@/components/portal/AuthProvider';

// Placeholder pipeline stages with sample leads
const pipelineStages = [
  {
    id: 'new',
    name: 'New Leads',
    color: 'bg-blue-500',
    leads: [
      { id: 1, name: 'John Smith', email: 'john@email.com', value: 5500, source: 'Web Form', daysInStage: 2 },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', value: 4200, source: 'Referral', daysInStage: 1 },
      { id: 3, name: 'Mike Williams', email: 'mike@email.com', value: 6800, source: 'Home Depot', daysInStage: 3 },
    ],
  },
  {
    id: 'qualified',
    name: 'Qualified',
    color: 'bg-purple-500',
    leads: [
      { id: 4, name: 'Emily Davis', email: 'emily@email.com', value: 7200, source: 'D2D', daysInStage: 5 },
      { id: 5, name: 'Chris Brown', email: 'chris@email.com', value: 3900, source: 'Web Form', daysInStage: 2 },
    ],
  },
  {
    id: 'proposal',
    name: 'Proposal Sent',
    color: 'bg-orange-500',
    leads: [
      { id: 6, name: 'Amanda Wilson', email: 'amanda@email.com', value: 8500, source: 'Referral', daysInStage: 3 },
      { id: 7, name: 'David Lee', email: 'david@email.com', value: 5100, source: 'Home Depot', daysInStage: 1 },
    ],
  },
  {
    id: 'closed',
    name: 'Closed Won',
    color: 'bg-green-500',
    leads: [
      { id: 8, name: 'Jessica Taylor', email: 'jessica@email.com', value: 6200, source: 'D2D', daysInStage: 0 },
    ],
  },
];

function LeadCard({ lead, stageColor }: { lead: typeof pipelineStages[0]['leads'][0], stageColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm">{lead.name}</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span className="truncate">{lead.email}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {lead.source}
          </Badge>
          <span className="text-sm font-semibold text-primary">
            ${lead.value.toLocaleString()}
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {lead.daysInStage === 0 ? 'Today' : `${lead.daysInStage}d in stage`}
        </div>
      </div>
    </motion.div>
  );
}

function PipelineColumn({ stage }: { stage: typeof pipelineStages[0] }) {
  const totalValue = stage.leads.reduce((sum, lead) => sum + lead.value, 0);
  
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-3 h-3 rounded-full ${stage.color}`} />
          <h3 className="font-semibold">{stage.name}</h3>
          <Badge variant="secondary" className="ml-auto">
            {stage.leads.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          ${totalValue.toLocaleString()} total value
        </p>
      </div>
      
      <div className="space-y-3">
        {stage.leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} stageColor={stage.color} />
        ))}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const { isAdmin, isManager } = useAuthContext();
  
  const totalLeads = pipelineStages.reduce((sum, stage) => sum + stage.leads.length, 0);
  const totalValue = pipelineStages.reduce(
    (sum, stage) => sum + stage.leads.reduce((s, l) => s + l.value, 0),
    0
  );
  const closedValue = pipelineStages.find(s => s.id === 'closed')?.leads.reduce((s, l) => s + l.value, 0) || 0;

  return (
    <PortalLayout title="Pipeline">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Target className="h-7 w-7 text-primary" />
              Sales Pipeline
            </h1>
            <p className="text-muted-foreground mt-1">
              Track leads from first contact to closed deal
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {(isAdmin() || isManager()) && (
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Team View
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Target className="h-4 w-4" />
                <span className="text-sm">Total Leads</span>
              </div>
              <p className="text-2xl font-bold">{totalLeads}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Pipeline Value</span>
              </div>
              <p className="text-2xl font-bold">${(totalValue / 1000).toFixed(1)}k</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <ArrowRight className="h-4 w-4" />
                <span className="text-sm">Conversion Rate</span>
              </div>
              <p className="text-2xl font-bold">
                {totalLeads > 0 ? Math.round((pipelineStages.find(s => s.id === 'closed')?.leads.length || 0) / totalLeads * 100) : 0}%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Closed This Month</span>
              </div>
              <p className="text-2xl font-bold">${(closedValue / 1000).toFixed(1)}k</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-6 overflow-x-auto pb-4">
                {pipelineStages.map((stage, index) => (
                  <PipelineColumn key={stage.id} stage={stage} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Placeholder Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <Target className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Showing placeholder data. Connect GoHighLevel to sync real pipeline data.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
