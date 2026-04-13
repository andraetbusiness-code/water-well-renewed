import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Star, Flame, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Placeholder leaderboard data
const leaderboardData = [
  { rank: 1, name: 'Jordan Smith', score: 2450, streak: 12, badges: ['Top Closer', 'Speed Demon'], change: 0 },
  { rank: 2, name: 'Alex Rivera', score: 2280, streak: 8, badges: ['Consistency King'], change: 1 },
  { rank: 3, name: 'Sam Johnson', score: 2150, streak: 15, badges: ['Streak Master', 'Early Bird'], change: -1 },
  { rank: 4, name: 'Taylor Brown', score: 1980, streak: 5, badges: ['Quick Start'], change: 2 },
  { rank: 5, name: 'Casey Williams', score: 1875, streak: 7, badges: [], change: 0 },
  { rank: 6, name: 'Morgan Davis', score: 1720, streak: 3, badges: ['Newcomer'], change: 3 },
  { rank: 7, name: 'Jamie Lee', score: 1650, streak: 10, badges: ['Persistence'], change: -2 },
  { rank: 8, name: 'Riley Garcia', score: 1580, streak: 4, badges: [], change: 1 },
  { rank: 9, name: 'Drew Martinez', score: 1490, streak: 6, badges: ['Team Player'], change: -1 },
  { rank: 10, name: 'Avery Thompson', score: 1420, streak: 2, badges: [], change: 0 },
];

const currentUserStats = {
  rank: 12,
  score: 1250,
  streak: 5,
  badges: ['Quick Start', 'Newcomer'],
  weeklyGoal: 500,
  weeklyProgress: 320,
};

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return null;
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

function LeaderboardRow({ entry, isCurrentUser = false }: { entry: typeof leaderboardData[0], isCurrentUser?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
        isCurrentUser ? 'bg-primary/10 border-2 border-primary' : 'hover:bg-muted/50'
      }`}
    >
      {/* Rank */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
        entry.rank === 1 ? 'bg-yellow-500 text-white' :
        entry.rank === 2 ? 'bg-gray-400 text-white' :
        entry.rank === 3 ? 'bg-amber-600 text-white' :
        'bg-muted text-muted-foreground'
      }`}>
        {getRankIcon(entry.rank) || entry.rank}
      </div>

      {/* Avatar & Name */}
      <Avatar className="h-10 w-10">
        <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">{entry.name}</p>
          {isCurrentUser && <Badge variant="outline" className="text-xs">You</Badge>}
        </div>
        <div className="flex items-center gap-2 mt-1">
          {entry.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
          {entry.badges.length > 2 && (
            <span className="text-xs text-muted-foreground">+{entry.badges.length - 2}</span>
          )}
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1 text-orange-500">
        <Flame className="h-4 w-4" />
        <span className="font-medium">{entry.streak}</span>
      </div>

      {/* Score */}
      <div className="text-right">
        <p className="text-xl font-bold text-primary">{entry.score.toLocaleString()}</p>
        <p className={`text-xs ${
          entry.change > 0 ? 'text-green-500' : 
          entry.change < 0 ? 'text-red-500' : 
          'text-muted-foreground'
        }`}>
          {entry.change > 0 ? `↑ ${entry.change}` : entry.change < 0 ? `↓ ${Math.abs(entry.change)}` : '−'}
        </p>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'all_time'>('weekly');

  return (
    <PortalLayout title="Leaderboard">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-7 w-7 text-yellow-500" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Compete with your team and climb the rankings
            </p>
          </div>
        </motion.div>

        {/* Current User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-primary">#{currentUserStats.rank}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold">{currentUserStats.score.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center mb-2">
                    <Flame className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold">{currentUserStats.streak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">
                    {Math.round((currentUserStats.weeklyProgress / currentUserStats.weeklyGoal) * 100)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Weekly Goal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Your Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentUserStats.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
                <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
                  +5 more to unlock
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Rankings</CardTitle>
                <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="all_time">All Time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.map((entry, index) => (
                  <LeaderboardRow 
                    key={entry.rank} 
                    entry={entry} 
                    isCurrentUser={entry.rank === currentUserStats.rank}
                  />
                ))}
              </div>
              
              {/* Show current user if not in top 10 */}
              {currentUserStats.rank > 10 && (
                <>
                  <div className="text-center py-2 text-muted-foreground">• • •</div>
                  <LeaderboardRow 
                    entry={{
                      rank: currentUserStats.rank,
                      name: 'You',
                      score: currentUserStats.score,
                      streak: currentUserStats.streak,
                      badges: currentUserStats.badges,
                      change: 0,
                    }} 
                    isCurrentUser 
                  />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Placeholder Notice */}
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="py-6 text-center">
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-sm text-muted-foreground">
              Showing placeholder data. Rankings will populate from portal activity.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
