import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MUIProvider } from "@/contexts/MUIProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute, RoleRoute } from "@/components/RouteGuards";

import { PublicLayout } from "@/components/layouts/PublicLayout";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { PageLoader } from "@/components/Loaders";
import { ScrollToTop } from "@/components/ScrollToTop";


// Public
const Landing = lazy(() => import("./pages/Landing"));
const CoursesCatalog = lazy(() => import("./pages/CoursesCatalog"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LabsCatalog = lazy(() => import("./pages/LabsCatalog"));
const LabEnvironment = lazy(() => import("./pages/LabEnvironment"));
const ProjectsCatalog = lazy(() => import("./pages/ProjectsCatalog"));
const ProjectWorkspace = lazy(() => import("./pages/ProjectWorkspace"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const LanguageSelection = lazy(() => import("./pages/LanguageSelection"));


// Student (protected)
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const CourseLearning = lazy(() => import("./pages/CourseLearning"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// Admin
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminCourses = lazy(() => import("./pages/admin/AdminCourses"));
const AdminCourseBuilder = lazy(() => import("./pages/admin/AdminCourseBuilder"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 },
  },
});

const App = () => (
  <ErrorBoundary>
    <LanguageProvider>
      <ThemeProvider>
        <MUIProvider>
          <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <AuthProvider>

                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public + student routes share PublicLayout */}
                    <Route element={<PublicLayout />}>
                      <Route path="/" element={<Landing />} />
                      <Route path="/courses" element={<CoursesCatalog />} />
                      <Route path="/courses/:id" element={<CourseDetail />} />
                      <Route path="/labs" element={<LabsCatalog />} />
                      <Route path="/labs/:id" element={<LabEnvironment />} />
                      <Route path="/projects" element={<ProjectsCatalog />} />
                      <Route path="/projects/:id" element={<ProjectWorkspace />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/help" element={<HelpCenter />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/language" element={<LanguageSelection />} />


                      {/* Protected student routes */}
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <StudentDashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/my-courses"
                        element={
                          <ProtectedRoute>
                            <MyCourses />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/learn/:courseId/:lessonId"
                        element={
                          <ProtectedRoute>
                            <CourseLearning />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute>
                            <Settings />
                          </ProtectedRoute>
                        }
                      />
                    </Route>

                    {/* Admin routes */}
                    <Route
                      path="/admin"
                      element={
                        <RoleRoute role="admin">
                          <AdminLayout />
                        </RoleRoute>
                      }
                    >
                      <Route index element={<AdminOverview />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="courses" element={<AdminCourses />} />
                      <Route path="courses/new" element={<AdminCourseBuilder />} />
                      <Route path="courses/:id/edit" element={<AdminCourseBuilder />} />
                      <Route path="analytics" element={<AdminAnalytics />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
          </QueryClientProvider>
        </MUIProvider>
      </ThemeProvider>
    </LanguageProvider>

  </ErrorBoundary>
);

export default App;
