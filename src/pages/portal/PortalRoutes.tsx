import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from '@/components/portal/AuthProvider';

// Lazy load portal pages
const Login = lazy(() => import('./Login'));
const Dashboard = lazy(() => import('./Dashboard'));

// Placeholder pages - will be implemented in later phases
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-2">Coming soon...</p>
    </div>
  </div>
);

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default function PortalRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public portal routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected portal routes */}
        <Route path="/" element={<Dashboard />} />
        
        {/* LMS routes - placeholders for now */}
        <Route path="/program" element={
          <AuthProvider>
            <PlaceholderPage title="Training Program" />
          </AuthProvider>
        } />
        <Route path="/courses" element={
          <AuthProvider>
            <PlaceholderPage title="Courses" />
          </AuthProvider>
        } />
        <Route path="/assignments" element={
          <AuthProvider>
            <PlaceholderPage title="Assignments" />
          </AuthProvider>
        } />
        <Route path="/checkins" element={
          <AuthProvider>
            <PlaceholderPage title="Daily Check-ins" />
          </AuthProvider>
        } />
        <Route path="/scorecard" element={
          <AuthProvider>
            <PlaceholderPage title="My Scorecard" />
          </AuthProvider>
        } />
        
        {/* Manager routes */}
        <Route path="/manager/team" element={
          <AuthProvider>
            <PlaceholderPage title="My Team" />
          </AuthProvider>
        } />
        <Route path="/manager/reviews" element={
          <AuthProvider>
            <PlaceholderPage title="Submission Reviews" />
          </AuthProvider>
        } />
        
        {/* Admin routes */}
        <Route path="/admin/users" element={
          <AuthProvider>
            <PlaceholderPage title="User Management" />
          </AuthProvider>
        } />
        <Route path="/admin/content" element={
          <AuthProvider>
            <PlaceholderPage title="Content Management" />
          </AuthProvider>
        } />
        <Route path="/admin/settings" element={
          <AuthProvider>
            <PlaceholderPage title="Portal Settings" />
          </AuthProvider>
        } />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/portal" replace />} />
      </Routes>
    </Suspense>
  );
}
