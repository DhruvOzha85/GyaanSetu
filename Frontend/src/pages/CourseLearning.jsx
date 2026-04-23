import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courseService } from "@/services/courseService";
import { PageLoader } from "@/components/Loaders";
import { cn } from "@/lib/utils";

export default function CourseLearning() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseService.get(courseId),
    enabled: !!courseId,
  });
  const { data: modules } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => courseService.modules(courseId),
    enabled: !!courseId,
  });
  const [tab, setTab] = useState("notes");
  const [notes, setNotes] = useState("");

  const flat = useMemo(
    () => modules?.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))) ?? [],
    [modules],
  );
  const idx = flat.findIndex((l) => l.id === lessonId);
  const current = idx >= 0 ? flat[idx] : flat[0];
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  if (isLoading || !course || !current) return <PageLoader />;

  return (
    <div className="min-h-screen bg-surface-container-low">
      <SEO title={`${current.title} — ${course.title}`} description={course.subtitle} />

      <header className="bg-surface-container-lowest px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
        <Link to={`/courses/${course.slug}`} className="w-10 h-10 grid place-items-center rounded-xl hover:bg-surface-container-low text-on-surface-variant">
          <Icon name="arrow_back" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">{course.category}</p>
          <h1 className="font-black text-on-surface truncate">{course.title}</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-on-surface-variant">
          <Icon name="task_alt" /> Lesson {idx + 1} of {flat.length}
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px]">
        <main className="p-6 lg:p-8 space-y-6">
          <div className="aspect-video bg-inverse-surface rounded-2xl overflow-hidden grid place-items-center text-inverse-on-surface relative">
            <img
              src={course.thumbnail}
              alt={current.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <button className="relative z-10 w-20 h-20 rounded-full primary-gradient text-on-primary grid place-items-center hover:scale-110 transition-transform shadow-ambient-lg">
              <Icon name="play_arrow" filled className="text-5xl" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">{current.moduleTitle}</p>
              <h2 className="text-2xl font-black text-on-surface mt-1">{current.title}</h2>
            </div>
            <div className="flex gap-2">
              <button
                disabled={!prev}
                onClick={() => prev && navigate(`/learn/${course.slug}/${prev.id}`)}
                className="px-4 py-2.5 bg-surface-container-lowest text-on-surface rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
              >
                <Icon name="arrow_back" className="text-base" /> Prev
              </button>
              <button
                disabled={!next}
                onClick={() => next && navigate(`/learn/${course.slug}/${next.id}`)}
                className="px-4 py-2.5 primary-gradient text-on-primary rounded-xl font-bold disabled:opacity-50 flex items-center gap-2"
              >
                Next <Icon name="arrow_forward" className="text-base" />
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl">
            <div className="flex border-b border-outline-variant/30">
              {["notes", "transcript", "discuss"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-5 py-3 font-bold capitalize text-sm border-b-2 transition-colors",
                    tab === t ? "border-primary text-primary" : "border-transparent text-on-surface-variant",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="p-5">
              {tab === "notes" && (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes for this lesson…"
                  className="w-full min-h-[200px] bg-surface-container-low rounded-xl p-4 outline-none text-on-surface text-sm"
                />
              )}
              {tab === "transcript" && (
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Welcome to {current.title}. In this lesson we'll cover the foundational concepts, work through hands-on examples, and finish with a short challenge to cement what you've learned.
                </p>
              )}
              {tab === "discuss" && (
                <p className="text-on-surface-variant text-sm">No questions yet. Be the first to start the discussion.</p>
              )}
            </div>
          </div>
        </main>

        <aside className="bg-surface-container-lowest lg:h-[calc(100vh-64px)] lg:sticky lg:top-16 overflow-y-auto">
          <div className="p-5">
            <h3 className="font-black text-on-surface mb-4">Course content</h3>
            <div className="space-y-4">
              {modules?.map((m, mi) => (
                <div key={m.id}>
                  <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-2">
                    Module {mi + 1} · {m.title}
                  </p>
                  <ul className="space-y-1">
                    {m.lessons.map((l) => {
                      const active = l.id === current.id;
                      return (
                        <li key={l.id}>
                          <Link
                            to={`/learn/${course.slug}/${l.id}`}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
                              active
                                ? "bg-primary-fixed text-on-primary-fixed font-bold"
                                : "text-on-surface hover:bg-surface-container-low",
                            )}
                          >
                            <Icon
                              name={l.completed ? "check_circle" : l.type === "video" ? "play_circle" : "biotech"}
                              className={l.completed ? "text-secondary" : active ? "text-primary" : "text-on-surface-variant"}
                            />
                            <span className="flex-1 truncate">{l.title}</span>
                            <span className="text-xs text-on-surface-variant">{l.duration}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
