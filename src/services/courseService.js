import api from './api';

const courseService = {
  getCourses: (params) => api.get('/courses', { params }),

  getCourseById: (id) => api.get(`/courses/${id}`),

  enrollCourse: (id) => api.post(`/courses/${id}/enroll`),

  getEnrolledCourses: () => api.get('/courses/enrolled'),

  markLessonComplete: (courseId, lessonId) =>
    api.post(`/courses/${courseId}/lessons/${lessonId}/complete`),

  getCourseCurriculum: (id) => api.get(`/courses/${id}/curriculum`),

  submitReview: (id, reviewData) => api.post(`/courses/${id}/reviews`, reviewData),
};

export default courseService;
