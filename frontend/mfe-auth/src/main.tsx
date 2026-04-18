import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import client from './apollo.ts'; // 👈 your Apollo client
import Auth from './components/Auth.tsx';
import Profile from './components/Profile.tsx';
import './index.css';

// Standalone bootstrap — used when developing this MFE independently
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Auth onAuth={() => console.log('Auth successful')} />}
          />
          <Route
            path="/profile"
            element={<Profile onLogout={() => console.log('Logged out')} />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);