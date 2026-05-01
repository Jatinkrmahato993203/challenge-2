import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSentry } from './lib/sentry';
import { reportWebVitals } from './lib/webVitals';
import 'leaflet/dist/leaflet.css';

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

const reminders = JSON.parse(localStorage.getItem('civic-reminders') || '[]');
const now = new Date();
reminders.forEach((r: any) => {
  if (new Date(r.remindAt) <= now && Notification.permission === 'granted') {
    new Notification(`📅 Reminder: ${r.title} is coming up!`);
  }
});
