import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courseService } from "@/services/courseService";
import { PageLoader } from "@/components/Loaders";
import { EmptyState } from "@/components/EmptyState";
import { useState } from "react";

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.get(id),
    enabled: !!id,
  });
  const { data: modules } = useQuery({
    queryKey: ["modules", id],
    queryFn: () => courseService.modules(id),
    enabled: !!id,
  });
  const [tab, setTab] = useState("overview");

  if (isLoading) return <PageLoader />;
  if (!course) return <EmptyState icon="search_off" title="Course not found" description="The course you're looking for doesn't exist." />;

  return (
    <>
      <SEO
        title={course.title}
        description={course.subtitle}
        image={course.thumbnail}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: { "@type": "Organization", name: "GyaanSetu" },
        }}
      />

      <section className="bg-surface-container-low pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/courses" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              <Icon name="arrow_back" className="text-base" /> All courses
            </Link>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">{course.category}</span>
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">{course.language}</span>
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold">{course.level}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-on-surface leading-tight">{course.title}</h1>
            <p className="text-xl text-on-surface-variant">{course.subtitle}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <span className="flex items-center gap-1.5 text-on-surface font-bold">
                <Icon name="star" filled className="text-tertiary-container" />
                {course.rating} <span className="text-on-surface-variant font-medium">({course.reviewCount.toLocaleString()} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <Icon name="group" className="text-base" /> {course.studentsEnrolled.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <Icon name="schedule" className="text-base" /> {course.duration}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Created by</p>
                <p className="font-bold text-on-surface">{course.instructor.name} <span className="text-on-surface-variant font-medium">— {course.instructor.title}</span></p>
              </div>
            </div>
          </div>

          <aside className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient h-fit lg:sticky lg:top-24">
            <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover rounded-xl mb-5" />
            <p className="text-3xl font-black text-primary mb-1">₹{course.price}</p>
            <p className="text-on-surface-variant text-xs mb-5">One-time payment · Lifetime access</p>
            <Link
              to={`/learn/${course.slug}/${modules?.[0]?.lessons?.[0]?.id ?? "ls_1"}`}
              className="block w-full text-center px-6 py-3 primary-gradient text-on-primary font-bold rounded-xl mb-3 hover:shadow-ambient transition-shadow"
            >
              Enroll & Start Learning
            </Link>
            <button className="w-full px-6 py-3 bg-surface-container-low text-on-surface font-bold rounded-xl hover:bg-surface-container transition-colors">
              Add to wishlist
            </button>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { icon: "play_circle", label: `${course.lessons} on-demand lessons` },
                { icon: "biotech", label: "Hands-on browser labs" },
                { icon: "workspace_premium", label: "Verified completion certificate" },
                { icon: "all_inclusive", label: "Lifetime access on all devices" },
              ].map((it) => (
                <li key={it.label} className="flex items-center gap-3 text-on-surface">
                  <Icon name={it.icon} className="text-primary" /> {it.label}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex gap-2 border-b border-outline-variant/40 mb-8">
          {["overview", "curriculum", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 font-bold capitalize text-sm border-b-2 transition-colors ${
                tab === t ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-on-surface mb-4">About this course</h2>
                <p className="text-on-surface-variant leading-relaxed">{course.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-black text-on-surface mb-4">What you'll learn</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "Build production-ready projects from scratch",
                    "Use industry-standard tools and workflows",
                    "Deploy to the cloud with zero-config sandboxes",
                    "Ace technical interviews with confidence",
                    "Practice with realistic, locale-aware datasets",
                    "Earn a verified GyaanSetu certificate",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-on-surface text-sm">
                      <Icon name="check_circle" className="text-secondary mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-on-surface">You'll master</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 bg-surface-container text-on-surface rounded-lg text-xs font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "curriculum" && (
          <div className="space-y-4 max-w-4xl">
            {modules?.map((m, i) => (
              <details key={m.id} open={i === 0} className="bg-surface-container-lowest rounded-2xl">
                <summary className="cursor-pointer flex items-center justify-between p-5 list-none">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-primary">Module {i + 1}</p>
                    <h3 className="font-black text-on-surface text-lg mt-1">{m.title}</h3>
                  </div>
                  <Icon name="expand_more" className="text-on-surface-variant" />
                </summary>
                <ul className="px-5 pb-5 space-y-2">
                  {m.lessons.map((l) => (
                    <li key={l.id} className="flex items-center gap-3 py-2 text-sm">
                      <Icon
                        name={l.type === "video" ? "play_circle" : l.type === "lab" ? "biotech" : l.type === "quiz" ? "quiz" : "menu_book"}
                        className="text-primary"
                      />
                      <span className="flex-1 text-on-surface">{l.title}</span>
                      <span className="text-on-surface-variant text-xs">{l.duration}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}

        {tab === "reviews" && (
          <div className="space-y-6 max-w-3xl">
            {[
              { name: "Aanya S.", rating: 5, text: "Best Hindi course I've taken. Labs are gold." },
              { name: "Karan J.", rating: 5, text: "Instructor explains complex concepts so well. Highly recommend." },
              { name: "Diya K.", rating: 4, text: "Great content. Would love a few more advanced labs." },
            ].map((r) => (
              <div key={r.name} className="bg-surface-container-lowest rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-2 text-tertiary-container">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="star" filled className="text-base" />
                  ))}
                </div>
                <p className="text-on-surface mb-3">{r.text}</p>
                <p className="text-on-surface-variant text-xs font-bold">— {r.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
