import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import storage from '../utils/storage';

/**
 * ProtectedRoute - For routes that require authentication
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, onboardingComplete } = useAuth();
  const location = useLocation();

  // Show nothing or a global loader while restoring session
  if (isLoading) {
    return null; // Or a Spinner component
  }

  if (!isAuthenticated) {
    // Save the attempted URL to redirect back after login
    storage.setSessionItem('redirectPath', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  // Handle onboarding requirement
  // Exception: don't redirect if already on an onboarding route
  const isOnboardingRoute = location.pathname.startsWith('/onboarding');
  if (!onboardingComplete && !isOnboardingRoute) {
    return <Navigate to="/onboarding/language" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
