import api from './api';

const userService = {
  getProfile: (userId) => api.get(userId ? `/users/${userId}` : '/users/profile'),

  updateProfile: (data) => api.put('/users/profile', data),

  getLeaderboard: (type = 'global', lang = 'all') =>
    api.get('/leaderboard', { params: { type, lang } }),

  getAchievements: () => api.get('/users/achievements'),

  updatePreferences: (preferences) => api.patch('/users/preferences', preferences),
};

export default userService;
