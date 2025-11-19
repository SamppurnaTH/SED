// services/analytics.ts

// To enable Web Vitals, you would first install the library:
// npm install web-vitals
// Then you can import the metric types and functions.
// For this demonstration, we are showing the implementation structure.
// import { onCLS, onFID, onLCP } from 'web-vitals';


/**
 * -----------------------------------------------------------------------------
 * Analytics Service with Production Examples
 * -----------------------------------------------------------------------------
 * This module simulates a real analytics service. The console logs are
 * placeholders for actual SDK calls to services like Google Analytics (for tracking)
 * and Sentry (for error reporting).
 * -----------------------------------------------------------------------------
 */

/**
 * Tracks a page view event.
 * @param {string} path - The path of the page being viewed (e.g., '/programs').
 */
export const trackPageView = (path: string): void => {
  console.log(`[Analytics] Page View: ${path}`);
  // Production implementation for Google Analytics:
  // window.gtag('event', 'page_view', { page_path: path });
};

/**
 * Tracks a custom event.
 * @param {string} eventName - The name of the event (e.g., 'course_saved').
 * @param {object} [params] - Optional parameters providing more context about the event.
 */
export const trackEvent = (eventName: string, params?: object): void => {
  console.log(`[Analytics] Event: ${eventName}`, params || '');
  // Production implementation for Google Analytics:
  // window.gtag('event', eventName, params);
};

/**
 * Reports an error to an error tracking service like Sentry.
 * In your app's entry point (e.g., index.tsx), you would initialize Sentry:
 * import * as Sentry from "@sentry/react";
 * Sentry.init({ dsn: "YOUR_SENTRY_DSN_HERE" });
 * @param {Error} error - The error object.
 * @param {object} [extraInfo] - Optional extra information about the error context.
 */
export const reportError = (error: Error, extraInfo?: object): void => {
  console.error('[Analytics] Error Reported:', error, extraInfo || '');
  // Production implementation with Sentry:
  // import * as Sentry from "@sentry/react";
  // Sentry.captureException(error, { extra: extraInfo });
};

/**
 * Reports Web Vitals performance metrics to your analytics service.
 * This function is designed to be a callback for the 'web-vitals' library.
 * @param {object} metric - The metric object from the web-vitals library (CLS, FID, LCP).
 */
export const reportWebVitals = (metric: { name: string; value: number; id: string }): void => {
  console.log(`[Analytics] Web Vital: ${metric.name}`, { value: `${Math.round(metric.value)}ms`, id: metric.id });
  // Production implementation for Google Analytics:
  // window.gtag('event', metric.name, {
  //   value: Math.round(metric.value),
  //   event_label: metric.id, // A unique ID for this metric instance
  //   non_interaction: true, // To avoid affecting bounce rate
  // });
};

/**
 * Initializes performance monitoring by setting up web-vitals reporting.
 * This should be called once when the application starts.
 */
export const initPerformanceMonitoring = (): void => {
    console.log('[Analytics] Performance monitoring initialized.');
    // In a real app, you would install 'web-vitals': `npm install web-vitals`
    // Then, uncomment the following lines to report Core Web Vitals.
    // The library automatically measures metrics and calls the callback.
    /*
    import { onCLS, onFID, onLCP } from 'web-vitals';
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
    */
};

const analytics = {
  trackPageView,
  trackEvent,
  reportError,
  initPerformanceMonitoring,
};

export default analytics;
