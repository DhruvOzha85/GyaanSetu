import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * PublicRoute - For routes that should NOT be accessible to logged in users
 * used for Login, Signup, Forgot Password etc.
 */
const PublicRoute = () => {
  const { isAuthenticated, onboardingComplete } = useAuth();

  if (isAuthenticated) {
    // If logged in but hasn't finished onboarding, go to onboarding
    if (!onboardingComplete) {
      return <Navigate to="/onboarding/language" replace />;
    }
    // If fully logged in and ready, go to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, show the public page
  return <Outlet />;
};

export default PublicRoute;
