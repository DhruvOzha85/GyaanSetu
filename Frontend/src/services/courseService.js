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
    if (useReal) return (await api.get("/me/courses")).data;
    await fakeDelay();
    return mockCourses.filter((c) => (c.progress ?? 0) > 0);
  },
  async create(payload) {
    if (useReal) return (await api.post("/courses", payload)).data;
    await fakeDelay();
    return { ...mockCourses[0], ...payload, id: `c_${Date.now()}` };
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
