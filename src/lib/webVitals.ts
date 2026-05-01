import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals';

/**
 * Reports Core Web Vitals to analytics.
 * Measures real-user performance: LCP, FID, CLS, FCP, TTFB, INP.
 *
 * Usage: Call reportWebVitals() in main.tsx after app mounts.
 */
export function reportWebVitals(onReport?: (metric: Metric) => void) {
  const report = onReport || sendToAnalytics;

  onCLS(report);
  onFID(report);
  onLCP(report);
  onFCP(report);
  onTTFB(report);
  onINP(report);
}

/**
 * Default reporter — sends metrics to Google Analytics 4.
 * Requires VITE_GA_ID to be set.
 */
function sendToAnalytics(metric: Metric) {
  const gaId = import.meta.env.VITE_GA_ID;

  // Log to console in development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
    return;
  }

  // Send to GA4 in production
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      event_category: 'Web Vitals',
      non_interaction: true,
    });
  }
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
