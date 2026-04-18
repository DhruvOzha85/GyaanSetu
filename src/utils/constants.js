/**
 * GyaanSetu — App-wide Constants
 */

// ─── App Identity ───────────────────────────────────────────────────
export const APP_NAME = 'GyaanSetu';
export const APP_TAGLINE = 'Bridging the Gap Between Education and Industry — In Every Indian Language';
export const APP_URL = 'https://gyaansetu.in';
export const APP_DESCRIPTION =
  'India\'s first bilingual practical EdTech platform. Learn by doing in your language with hands-on labs, real projects, and industry-ready curriculum.';

// ─── Supported Languages ───────────────────────────────────────────
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', courses: 'All', isLive: true, flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', courses: '80+', isLive: true, flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', courses: '60+', isLive: true, flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', courses: '—', isLive: false, flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', courses: '—', isLive: false, flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', courses: '—', isLive: false, flag: '🇮🇳' },
];

// ─── Navigation Links ──────────────────────────────────────────────
export const PUBLIC_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Labs', href: '/labs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
];

export const DASHBOARD_NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'GridView' },
  { label: 'My Courses', href: '/my-courses', icon: 'MenuBook' },
  { label: 'Labs', href: '/labs', icon: 'Science' },
  { label: 'Projects', href: '/projects', icon: 'Work' },
  { label: 'Leaderboard', href: '/leaderboard', icon: 'EmojiEvents' },
  { label: 'Profile', href: '/profile', icon: 'Person' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

// ─── Pricing Plans ──────────────────────────────────────────────────
export const PRICING_PLANS = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Get started with basic access',
    features: [
      '5 Labs per month',
      'English content only',
      'Community support',
      'No certificates',
      'Limited courses',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 499,
    annualPrice: 349,
    description: 'Full access for serious learners',
    features: [
      'Unlimited Labs',
      'All languages (EN, हिंदी, ગુજ)',
      'Priority support',
      'Certificates included',
      'All courses unlocked',
      'Project workspace access',
      'Leaderboard participation',
    ],
    cta: 'Start Free Trial',
    highlight: true,
    badge: 'RECOMMENDED',
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'Custom solutions for teams & colleges',
    features: [
      'Everything in Pro',
      'Custom course content',
      'Dedicated mentor',
      'Branded certificates',
      'Analytics dashboard',
      'API access',
      'Volume discounts',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

// ─── Course Categories ──────────────────────────────────────────────
export const COURSE_CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'AI / ML',
  'DSA',
  'DevOps',
  'System Design',
  'Mobile Development',
];

// ─── Difficulty Levels ──────────────────────────────────────────────
export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// ─── User Roles ─────────────────────────────────────────────────────
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

// ─── Onboarding Goals ───────────────────────────────────────────────
export const ONBOARDING_GOALS = [
  { id: 'job', emoji: '🎯', title: 'Get a Job in Tech' },
  { id: 'upskill', emoji: '📈', title: 'Level Up My Current Skills' },
  { id: 'learn', emoji: '🎓', title: 'Learn Something New' },
  { id: 'company', emoji: '🏢', title: 'Upskill for My Company' },
];

// ─── LocalStorage Keys ─────────────────────────────────────────────
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'gs_auth_token',
  USER: 'gs_user',
  THEME: 'gs_theme',
  LANGUAGE: 'gs_language',
  ONBOARDING_COMPLETE: 'gs_onboarding_complete',
  LAB_CODE_PREFIX: 'gs_lab_code_',
  LESSON_NOTES_PREFIX: 'gs_lesson_notes_',
  COMPLETED_LESSONS: 'gs_completed_lessons',
  RETURN_URL: 'gs_return_url',
  COURSE_FILTERS: 'gs_course_filters',
};

// ─── API Endpoints ──────────────────────────────────────────────────
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id) => `/courses/${id}`,
    ENROLL: (id) => `/courses/${id}/enroll`,
    ENROLLED: '/courses/enrolled',
    MARK_COMPLETE: (courseId, lessonId) => `/courses/${courseId}/lessons/${lessonId}/complete`,
  },
  LABS: {
    LIST: '/labs',
    DETAIL: (id) => `/labs/${id}`,
    RUN: (id) => `/labs/${id}/run`,
    SUBMIT: (id) => `/labs/${id}/submit`,
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id) => `/projects/${id}`,
    SUBMIT: (id) => `/projects/${id}/submit`,
    UPDATE_MILESTONE: (projectId, milestoneId) =>
      `/projects/${projectId}/milestones/${milestoneId}`,
  },
  USERS: {
    PROFILE: (userId) => `/users/${userId}`,
    UPDATE_PROFILE: '/users/profile',
    LEADERBOARD: '/leaderboard',
    ACHIEVEMENTS: '/users/achievements',
  },
  UPLOAD: '/upload',
};

// ─── Pagination ─────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 12;
export const LEADERBOARD_PAGE_SIZE = 25;
