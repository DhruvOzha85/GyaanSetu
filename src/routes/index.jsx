import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Components & Layouts
import PublicLayout from '../components/layout/PublicLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import AuthLayout from '../components/layout/AuthLayout';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import FullPageLoader from '../components/ui/FullPageLoader';
import { useAnalytics } from '../hooks/useAnalytics';

// Lazy loading all pages
const Landing = lazy(() => import('../pages/public/Landing'));
const Pricing = lazy(() => import('../pages/public/Pricing'));
const Contact = lazy(() => import('../pages/public/Contact'));
const CourseCatalog = lazy(() => import('../pages/courses/CourseCatalog'));
const CourseDetail = lazy(() => import('../pages/courses/CourseDetail'));
const InstructorProfile = lazy(() => import('../pages/profile/InstructorProfile'));
const NotFound = lazy(() => import('../pages/public/Landing'));

const Login = lazy(() => import('../pages/auth/Login'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

const LanguageSelection = lazy(() => import('../pages/onboarding/LanguageSelection'));
const GoalSetting = lazy(() => import('../pages/onboarding/GoalSetting'));

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const MyCourses = lazy(() => import('../pages/courses/MyCourses'));
const CourseLearning = lazy(() => import('../pages/courses/CourseLearning'));
const LabCatalog = lazy(() => import('../pages/dashboard/Dashboard'));
const LabEnvironment = lazy(() => import('../pages/labs/LabEnvironment'));
const ProjectCatalog = lazy(() => import('../pages/projects/ProjectCatalog'));
const ProjectWorkspace = lazy(() => import('../pages/projects/ProjectWorkspace'));
import StudentProfile from '../pages/profile/StudentProfile';
import Leaderboard from '../pages/leaderboard/Leaderboard';
const Settings = lazy(() => import('../pages/settings/Settings'));

const AppRouter = () => {
  useAnalytics(); // Auto-tracks page views

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/instructor/:instructorId" element={<InstructorProfile />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding */}
          <Route path="/onboarding/language" element={<LanguageSelection />} />
          <Route path="/onboarding/goals" element={<GoalSetting />} />

          {/* Main Dashboard apps */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/labs" element={<LabCatalog />} />
            <Route path="/projects" element={<ProjectCatalog />} />
            <Route path="/projects/:projectId" element={<ProjectWorkspace />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Immersive routes (No sidebar) */}
          <Route path="/courses/:courseId/learn" element={<CourseLearning />} />
          <Route path="/labs/:labId" element={<LabEnvironment />} />
        </Route>

        {/* 404 */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
