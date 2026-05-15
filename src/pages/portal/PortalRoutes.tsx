import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from '@/components/portal/AuthProvider';
import { ProtectedRoute } from '@/components/portal/ProtectedRoute';

// Lazy load portal pages
const Login = lazy(() => import('./Login'));
const Dashboard = lazy(() => import('./Dashboard'));
const ProgramPage = lazy(() => import('./ProgramPage'));
const AssignmentsPage = lazy(() => import('./AssignmentsPage'));
const CheckinsPage = lazy(() => import('./CheckinsPage'));
const ScorecardPage = lazy(() => import('./ScorecardPage'));
const LeaderboardPage = lazy(() => import('./LeaderboardPage'));
const PipelinePage = lazy(() => import('./PipelinePage'));

// Manager pages
const TeamPage = lazy(() => import('./manager/TeamPage'));
const ReviewsPage = lazy(() => import('./manager/ReviewsPage'));

// Admin pages
const UsersPage = lazy(() => import('./admin/UsersPage'));
const ContentPage = lazy(() => import('./admin/ContentPage'));
const SettingsPage = lazy(() => import('./admin/SettingsPage'));
const InfographicGenerator = lazy(() => import('./admin/InfographicGenerator'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function PortalRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public portal routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected portal routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* LMS routes */}
          <Route path="/program" element={
            <ProtectedRoute>
              <ProgramPage />
            </ProtectedRoute>
          } />
          <Route path="/assignments" element={
            <ProtectedRoute>
              <AssignmentsPage />
            </ProtectedRoute>
          } />
          <Route path="/checkins" element={
            <ProtectedRoute>
              <CheckinsPage />
            </ProtectedRoute>
          } />
          <Route path="/scorecard" element={
            <ProtectedRoute>
              <ScorecardPage />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          } />
          <Route path="/pipeline" element={
            <ProtectedRoute>
              <PipelinePage />
            </ProtectedRoute>
          } />
          
          {/* Manager routes */}
          <Route path="/manager/team" element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <TeamPage />
            </ProtectedRoute>
          } />
          <Route path="/manager/reviews" element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <ReviewsPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/content" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <ContentPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/infographics" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <InfographicGenerator />
            </ProtectedRoute>
          } />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/portal" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
