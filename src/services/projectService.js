import api from './api';

const projectService = {
  getProjects: (params) => api.get('/projects', { params }),

  getProjectById: (id) => api.get(`/projects/${id}`),

  submitProject: (id, data) => api.post(`/projects/${id}/submit`, data),

  updateMilestone: (projectId, milestoneId, status) =>
    api.patch(`/projects/${projectId}/milestones/${milestoneId}`, { status }),

  getProjectWorkspace: (id) => api.get(`/projects/${id}/workspace`),
};

export default projectService;
