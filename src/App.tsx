/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Events from './features/events/Events.tsx';
import Feed from './features/community/Feed.tsx';
import Help from './features/community/Help.tsx';
import Business from './features/business/Business.tsx';
import Profile from './features/profile/Profile.tsx';
import Auth from './features/auth/Auth.tsx';
import Landing from './pages/Landing.tsx';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth onAuth={() => setToken(localStorage.getItem('token'))} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<Events />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/help" element={<Help />} />
        <Route path="/business" element={<Business />} />
        <Route path="/profile" element={<Profile onLogout={() => { localStorage.removeItem('token'); setToken(null); }} />} />
        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </Layout>
  );
}
