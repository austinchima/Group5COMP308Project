import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Landing from './pages/Landing.tsx';
import NotFound from './pages/NotFound.tsx';
import { ErrorBoundary } from './pages/ServerError.tsx';
import { getAuthUser } from './hooks/useAuth.ts';
import type { UserRole } from './hooks/useAuth.ts';

// Runtime imports from remote Micro Frontends via Module Federation
const RemoteAuth = React.lazy(() => import('mfe_auth/Auth'));
const RemoteProfile = React.lazy(() => import('mfe_auth/Profile'));
const RemoteFeed = React.lazy(() => import('mfe_community/Feed'));
const RemoteHelp = React.lazy(() => import('mfe_community/Help'));
const RemoteBusiness = React.lazy(() => import('mfe_community/Business'));
const RemoteEvents = React.lazy(() => import('mfe_events/Events'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm text-on-surface-variant font-body">Loading module…</p>
      </div>
    </div>
  );
}

/** Maps each role to the route paths it is allowed to access (beyond /feed & /profile) */
const ROLE_ROUTES: Record<UserRole, string[]> = {
  'Resident': ['/help'],
  'Business Owner': ['/business'],
  'Community Organizer': ['/events'],
};

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    navigate('/auth');
  };

  if (!token) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<RemoteAuth onAuth={() => setToken(localStorage.getItem('token'))} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    );
  }

  const user = getAuthUser();
  const role: UserRole = user?.role ?? 'Resident';
  const allowed = ROLE_ROUTES[role] ?? [];

  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Default redirect → Feed (accessible to everyone) */}
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/feed" element={<RemoteFeed />} />
            <Route path="/profile" element={<RemoteProfile onLogout={handleLogout} />} />

            {/* Role-gated routes — only rendered when the user's role allows */}
            {allowed.includes('/help') && (
              <Route path="/help" element={<RemoteHelp />} />
            )}
            {allowed.includes('/business') && (
              <Route path="/business" element={<RemoteBusiness />} />
            )}
            {allowed.includes('/events') && (
              <Route path="/events" element={<RemoteEvents />} />
            )}

            {/* Catch-all: unauthorized paths → redirect to feed */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
