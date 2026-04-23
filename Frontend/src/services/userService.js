import { api } from "@/services/apiClient";

const useReal = import.meta.env.VITE_USE_REAL_API === "true";
const fakeDelay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const seedUsers = [
  { id: "u_1", name: "Aanya Sharma", email: "aanya@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=47", role: "student", joinedAt: "2024-01-15" },
  { id: "u_2", name: "Rohan Verma", email: "rohan@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=11", role: "admin", joinedAt: "2023-06-01" },
  { id: "u_3", name: "Priya Iyer", email: "priya@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=32", role: "student", joinedAt: "2024-02-08" },
  { id: "u_4", name: "Arjun Patel", email: "arjun@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=15", role: "student", joinedAt: "2024-03-12" },
  { id: "u_5", name: "Meera Nair", email: "meera@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=45", role: "student", joinedAt: "2024-03-20" },
  { id: "u_6", name: "Karan Joshi", email: "karan@gyaansetu.in", avatar: "https://i.pravatar.cc/100?img=33", role: "student", joinedAt: "2024-04-02" },
];

export const userService = {
  async list() {
    if (useReal) return (await api.get("/admin/users")).data;
    await fakeDelay();
    return seedUsers;
  },
  async setRole(id, role) {
    if (useReal) return (await api.patch(`/admin/users/${id}`, { role })).data;
    await fakeDelay();
    const u = seedUsers.find((x) => x.id === id);
    if (u) u.role = role;
    return u;
  },
};
