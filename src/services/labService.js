import api from './api';

const labService = {
  getLabs: (params) => api.get('/labs', { params }),

  getLabById: (id) => api.get(`/labs/${id}`),

  runCode: (labId, code, language) => api.post(`/labs/${labId}/run`, { code, language }),

  submitLab: (labId, code) => api.post(`/labs/${labId}/submit`, { code }),

  getLabSubmissions: (id) => api.get(`/labs/${id}/submissions`),
};

export default labService;
