import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import client from './apollo/client';
import Events from './components/Events.tsx';
import './index.css';

// Standalone bootstrap — used when developing this MFE independently
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);