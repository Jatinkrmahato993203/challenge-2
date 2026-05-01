import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry for production error tracking.
 * Set VITE_SENTRY_DSN in your .env.local to enable.
 *
 * Get your DSN from: https://sentry.io → Project Settings → Client Keys
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // Performance monitoring — sample 10% of transactions in production
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // Session replay — capture 1% of sessions, 100% on error
    replaysSessionSampleRate: 0.01,
    replaysOnErrorSampleRate: 1.0,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Don't send errors in development
    enabled: import.meta.env.PROD,
  });
}

// Re-export Sentry for use in ErrorBoundary
export { Sentry };
