import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { userService } from "@/services/userService";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export default function AdminUsers() {
  const { data: users, refetch } = useQuery({ queryKey: ["admin-users"], queryFn: userService.list });
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 200);
  const filtered = useMemo(() =>
    (users ?? []).filter((u) => u.name.toLowerCase().includes(dq.toLowerCase()) || u.email.toLowerCase().includes(dq.toLowerCase())),
    [users, dq]);

  const toggle = async (id, currentRole) => {
    const next = currentRole === "admin" ? "student" : "admin";
    await userService.setRole(id, next);
    toast.success(`Role updated to ${next}`);
    refetch();
  };

  return (
    <>
      <SEO title="Admin · Users" />
      <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col h-[700px]">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1 bg-surface-container-low rounded-xl px-4 py-2.5">
            <Icon name="search" className="text-on-surface-variant" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="bg-transparent outline-none w-full text-sm text-on-surface" />
          </div>
        </div>
        
        <div className="flex items-center px-4 pb-3 text-on-surface-variant text-xs uppercase tracking-widest font-bold">
          <div className="flex-1">User</div>
          <div className="flex-1 hidden md:block">Email</div>
          <div className="w-24 px-4">Role</div>
          <div className="w-32 hidden lg:block">Joined</div>
          <div className="w-40 text-right">Actions</div>
        </div>

        <div className="flex-1">
          <Virtuoso
            data={filtered}
            itemContent={(index, u) => (
              <div className="flex items-center px-4 border-t border-outline-variant/30 text-sm h-16">
                <div className="flex-1 flex items-center gap-3 pr-4">
                  <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                  <span className="font-bold text-on-surface truncate">{u.name}</span>
                </div>
                <div className="flex-1 text-on-surface-variant truncate hidden md:block">{u.email}</div>
                <div className="w-24 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${u.role === "admin" ? "bg-primary-fixed text-on-primary-fixed" : "bg-secondary-fixed text-on-secondary-fixed"}`}>{u.role}</span>
                </div>
                <div className="w-32 text-on-surface-variant truncate hidden lg:block">{u.joinedAt}</div>
                <div className="w-40 text-right">
                  <button onClick={() => toggle(u.id, u.role)} className="px-3 py-1.5 bg-surface-container-low rounded-lg font-bold text-xs hover:bg-surface-container whitespace-nowrap">
                    Make {u.role === "admin" ? "student" : "admin"}
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}
