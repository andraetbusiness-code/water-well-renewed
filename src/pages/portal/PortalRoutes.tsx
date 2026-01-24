import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from '@/components/portal/AuthProvider';
import { ProtectedRoute } from '@/components/portal/ProtectedRoute';
import { PortalLayout } from '@/components/portal/PortalLayout';

// Lazy load portal pages
const Login = lazy(() => import('./Login'));
const Dashboard = lazy(() => import('./Dashboard'));

// Placeholder pages - will be implemented in later phases
const PlaceholderPage = ({ title }: { title: string }) => (
  <PortalLayout title={title}>
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-2">Coming soon...</p>
      </div>
    </div>
  </PortalLayout>
);

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
          
          {/* LMS routes - placeholders for now */}
          <Route path="/program" element={
            <ProtectedRoute>
              <PlaceholderPage title="Training Program" />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <PlaceholderPage title="Courses" />
            </ProtectedRoute>
          } />
          <Route path="/assignments" element={
            <ProtectedRoute>
              <PlaceholderPage title="Assignments" />
            </ProtectedRoute>
          } />
          <Route path="/checkins" element={
            <ProtectedRoute>
              <PlaceholderPage title="Daily Check-ins" />
            </ProtectedRoute>
          } />
          <Route path="/scorecard" element={
            <ProtectedRoute>
              <PlaceholderPage title="My Scorecard" />
            </ProtectedRoute>
          } />
          
          {/* Manager routes */}
          <Route path="/manager/team" element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <PlaceholderPage title="My Team" />
            </ProtectedRoute>
          } />
          <Route path="/manager/reviews" element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <PlaceholderPage title="Submission Reviews" />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <PlaceholderPage title="User Management" />
            </ProtectedRoute>
          } />
          <Route path="/admin/content" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <PlaceholderPage title="Content Management" />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requiredRoles={['admin']}>
              <PlaceholderPage title="Portal Settings" />
            </ProtectedRoute>
          } />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/portal" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
