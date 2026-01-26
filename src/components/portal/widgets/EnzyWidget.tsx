import { motion } from 'framer-motion';
import { Trophy, Medal, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Placeholder data - will be replaced with real data from leaderboard_cache
const placeholderLeaderboard = [
  { rank: 1, name: 'Jordan Smith', score: 2450, initials: 'JS' },
  { rank: 2, name: 'Alex Rivera', score: 2280, initials: 'AR' },
  { rank: 3, name: 'Sam Johnson', score: 2150, initials: 'SJ' },
  { rank: 4, name: 'Taylor Brown', score: 1980, initials: 'TB' },
  { rank: 5, name: 'Casey Williams', score: 1875, initials: 'CW' },
];

interface EnzyWidgetProps {
  currentUserRank?: number;
}

export function EnzyWidget({ currentUserRank = 12 }: EnzyWidgetProps) {
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
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboard
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/portal/leaderboard">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {placeholderLeaderboard.map((entry, index) => (
              <div
                key={entry.rank}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  entry.rank === 1 ? 'bg-yellow-500 text-white' :
                  entry.rank === 2 ? 'bg-gray-400 text-white' :
                  entry.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {entry.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{entry.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{entry.name}</p>
                </div>
                <div className="text-sm font-semibold text-primary">
                  {entry.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Current User Position */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Your Position</span>
              </div>
              <span className="text-lg font-bold text-primary">#{currentUserRank}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
