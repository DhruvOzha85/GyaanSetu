import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPage, trackEvent } from '../utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  // Automatically track page views on route change
  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location]);

  const logEvent = useCallback((category, action, label) => {
    trackEvent(category, action, label);
  }, []);

  const logButtonClick = useCallback((label) => {
    trackEvent('Interaction', 'Button Click', label);
  }, []);

  return {
    trackPage: (path) => trackPage(path),
    trackEvent: logEvent,
    logButtonClick,
  };
};

export default useAnalytics;
