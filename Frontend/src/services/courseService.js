import { api } from "@/services/apiClient";
import { courses as mockCourses, labs as mockLabs, projects as mockProjects, courseModules } from "@/data/mock";

const useReal = import.meta.env.VITE_USE_REAL_API === "true";
const fakeDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const courseService = {
  async list() {
    if (useReal) return (await api.get("/courses")).data;
    await fakeDelay();
    return mockCourses;
  },
  async get(id) {
    if (useReal) return (await api.get(`/courses/${id}`)).data;
    await fakeDelay();
    return mockCourses.find((c) => c.id === id || c.slug === id);
  },
  async modules(_courseId) {
    if (useReal) return (await api.get(`/courses/${_courseId}/modules`)).data;
    await fakeDelay();
    return courseModules;
  },
  async myCourses() {
    if (useReal) {
      const enrollments = (await api.get("/enroll/my")).data;
      return enrollments.map(e => ({ ...e.course, progress: e.progress, enrollmentId: e._id }));
    }
    await fakeDelay();
    return mockCourses.filter((c) => (c.progress ?? 0) > 0);
  },
  async enroll(courseId) {
    if (useReal) return (await api.post(`/enroll/${courseId}`)).data;
    await fakeDelay();
    return { ok: true };
  },
  async getStatus(courseId) {
    if (useReal) return (await api.get(`/enroll/status/${courseId}`)).data;
    await fakeDelay();
    const c = mockCourses.find(x => x.id === courseId || x.slug === courseId);
    return { enrolled: !!c, progress: c?.progress || 0, completedLessons: [] };
  },
  async updateProgress(courseId, lessonId) {
    if (useReal) return (await api.patch(`/enroll/progress/${courseId}`, { lessonId })).data;
    await fakeDelay();
    return { ok: true };
  },
  async create(payload) {
    if (useReal) return (await api.post("/admin/courses", payload)).data;
    await fakeDelay();
    return { id: "c_" + Date.now(), ...payload };
  },
  async update(id, payload) {
    if (useReal) return (await api.put(`/admin/courses/${id}`, payload)).data;
    await fakeDelay();
    return { id, ...payload };
  },
  async delete(id) {
    if (useReal) return (await api.delete(`/admin/courses/${id}`)).data;
    await fakeDelay();
    return { ok: true };
  },
  async updateModules(courseId, modules) {
    if (useReal) return (await api.put(`/admin/courses/${courseId}/modules`, { modules })).data;
    await fakeDelay();
    return modules;
  },
};

export const labService = {
  async list() {
    if (useReal) return (await api.get("/labs")).data;
    await fakeDelay();
    return mockLabs;
  },
};

export const projectService = {
  async list() {
    if (useReal) return (await api.get("/projects")).data;
    await fakeDelay();
    return mockProjects;
  },
};
