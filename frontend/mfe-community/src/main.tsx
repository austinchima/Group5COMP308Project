import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './components/Feed.tsx';
import Help from './components/Help.tsx';
import Business from './components/Business.tsx';
import './index.css';

// Standalone bootstrap — used when developing this MFE independently
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/help" element={<Help />} />
        <Route path="/business" element={<Business />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
