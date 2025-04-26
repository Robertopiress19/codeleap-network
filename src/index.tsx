import React from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from './styles/globalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalStyles />
    <App />
  </React.StrictMode>
);

reportWebVitals();