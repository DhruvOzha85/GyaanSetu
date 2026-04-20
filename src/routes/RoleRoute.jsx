import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * RoleRoute - Extends ProtectedRoute to check for specific user roles
 * @param {string[]} allowedRoles - List of roles that can access this route
 */
const RoleRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  const userRole = user?.role || 'student';
  const isAllowed = allowedRoles.includes(userRole);

  if (!isAllowed) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

RoleRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default RoleRoute;
