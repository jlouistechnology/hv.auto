import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA } from './utils/analytics';

// Initialize Google Analytics with your measurement ID
initGA('G-XXXXXXXXXX'); // Replace with your actual Google Analytics measurement ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);