import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import { courseService } from "@/services/courseService";
import { CardSkeleton } from "@/components/Loaders";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: my, isLoading } = useQuery({ queryKey: ["my-courses"], queryFn: courseService.myCourses });

  return (
    <>
      <SEO title="Dashboard" />
      <section className="bg-surface-container-low pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Hello, {user?.name.split(" ")[0]}</span>
          <h1 className="text-4xl font-black text-on-surface mt-2 tracking-tight">Welcome back to your courtyard.</h1>
          <p className="text-on-surface-variant max-w-2xl mt-2">Here's your progress this week. Keep the streak alive.</p>

          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Streak", value: "12 days", icon: "local_fire_department", tint: "primary" },
              { label: "Hours this week", value: "8.2", icon: "schedule", tint: "secondary" },
              { label: "Lessons completed", value: "47", icon: "task_alt", tint: "tertiary" },
              { label: "Rank", value: "#412", icon: "leaderboard", tint: "primary" },
            ].map((s) => (
              <div key={s.label} className="bg-surface-container-lowest rounded-2xl p-5">
                <div className={`w-10 h-10 rounded-xl grid place-items-center mb-3 ${s.tint === "primary" ? "bg-primary-fixed text-on-primary-fixed" : s.tint === "secondary" ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>
                  <Icon name={s.icon} />
                </div>
                <p className="text-3xl font-black text-on-surface">{s.value}</p>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-black text-on-surface">Continue learning</h2>
          <Link to="/my-courses" className="text-primary font-bold flex items-center gap-1 text-sm">All courses <Icon name="arrow_forward" className="text-base" /></Link>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {my?.map((c) => (
              <Link key={c.id} to={`/learn/${c.slug}/ls_5`} className="bg-surface-container-lowest rounded-2xl overflow-hidden group hover:shadow-ambient transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-on-surface line-clamp-2">{c.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{c.instructor.name}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-primary">{c.progress}%</span>
                    </div>
                    <div className="h-2 bg-primary-fixed rounded-full overflow-hidden">
                      <div className="h-full primary-gradient" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
