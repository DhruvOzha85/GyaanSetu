import api from './api';

const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),

  signup: (userData) => api.post('/auth/signup', userData),

  logout: () => api.post('/auth/logout'), // Optional backend logout

  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),

  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),

  getMe: () => api.get('/auth/me'),

  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
};

export default authService;
