import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSentry } from './lib/sentry';
import { reportWebVitals } from './lib/webVitals';

// Initialize error tracking (requires VITE_SENTRY_DSN env var)
initSentry();

// Accessibility auditing in development
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(import('react'), import('react-dom'), 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Report Core Web Vitals (LCP, FID, CLS, FCP, TTFB, INP)
reportWebVitals();
