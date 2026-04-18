/**
 * GyaanSetu — Google Analytics (GA4) Helpers
 * Uses window.gtag for event tracking. Safe no-op if gtag is not loaded.
 */

/**
 * Track a page view event.
 * @param {string} path - the current route path
 * @param {string} [title] - optional page title
 */
export const trackPage = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track a custom analytics event.
 * @param {string} eventName - e.g., 'signup_completed', 'lab_submitted'
 * @param {Object} [params] - additional event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// ─── Pre-defined Event Helpers ──────────────────────────────────────

export const trackSignup = (method = 'email') => {
  trackEvent('signup_completed', { method });
};

export const trackLogin = (method = 'email') => {
  trackEvent('login', { method });
};

export const trackCourseView = (courseId, courseName) => {
  trackEvent('course_viewed', { course_id: courseId, course_name: courseName });
};

export const trackCourseEnroll = (courseId, courseName, price) => {
  trackEvent('course_enrolled', { course_id: courseId, course_name: courseName, value: price });
};

export const trackLabStart = (labId, labName) => {
  trackEvent('lab_started', { lab_id: labId, lab_name: labName });
};

export const trackLabSubmit = (labId, labName, score) => {
  trackEvent('lab_submitted', { lab_id: labId, lab_name: labName, score });
};

export const trackLanguageChange = (fromLang, toLang) => {
  trackEvent('language_changed', { from: fromLang, to: toLang });
};

export const trackThemeChange = (theme) => {
  trackEvent('theme_changed', { theme });
};

export const trackSearch = (query, resultCount) => {
  trackEvent('search_performed', { search_term: query, results_count: resultCount });
};

export const trackFilterApply = (filterType, filterValue) => {
  trackEvent('filter_applied', { filter_type: filterType, filter_value: filterValue });
};
