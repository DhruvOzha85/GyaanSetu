import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courseService } from "@/services/courseService";
import { CardSkeleton } from "@/components/Loaders";
import { EmptyState } from "@/components/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";
import { safeGet, safeSet, STORAGE_KEYS } from "@/lib/storage";
import { cn } from "@/lib/utils";

const categories = ["All", "Data Science", "Cloud", "Web Dev", "AI / ML", "Interview Prep"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const languages = ["All Languages", "English", "Hindi", "Gujarati"];
const sorts = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

const defaultFilters = {
  q: "",
  category: "All",
  level: "All Levels",
  language: "All Languages",
  sort: "popular",
};

export default function CoursesCatalog() {
  const [filters, setFilters] = useState(() =>
    safeGet(STORAGE_KEYS.catalogFilters, defaultFilters, "session"),
  );
  const debouncedQ = useDebounce(filters.q, 250);

  const update = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    safeSet(STORAGE_KEYS.catalogFilters, next, "session");
  };

  const { data: courses, isLoading } = useQuery({ queryKey: ["courses"], queryFn: courseService.list });

  const filtered = useMemo(() => {
    if (!courses) return [];
    let out = courses.filter((c) => {
      if (filters.category !== "All" && c.category !== filters.category) return false;
      if (filters.level !== "All Levels" && c.level !== filters.level) return false;
      if (filters.language !== "All Languages" && c.language !== filters.language) return false;
      if (debouncedQ) {
        const q = debouncedQ.toLowerCase();
        if (!c.title.toLowerCase().includes(q) && !c.subtitle.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    out = [...out].sort((a, b) => {
      switch (filters.sort) {
        case "rating": return b.rating - a.rating;
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "newest": return b.id.localeCompare(a.id);
        default: return b.studentsEnrolled - a.studentsEnrolled;
      }
    });
    return out;
  }, [courses, filters, debouncedQ]);

  return (
    <>
      <SEO title="Browse Courses" description="Explore expert-led, hands-on technical courses in English, Hindi, and Gujarati." />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Course catalog</span>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface mt-2 mb-3 tracking-tight">
            Master industry-grade skills.
          </h1>
          <p className="text-on-surface-variant max-w-2xl">
            {courses?.length ?? 0} courses across data, cloud, web, and AI — taught hands-on in your language.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8">
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex items-center gap-3 flex-1 bg-surface-container-low rounded-xl px-4 py-3">
            <Icon name="search" className="text-on-surface-variant" />
            <input
              value={filters.q}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Search by title, instructor, technology…"
              className="bg-transparent outline-none w-full text-on-surface placeholder:text-on-surface-variant text-sm"
            />
          </div>
          <select
            value={filters.level}
            onChange={(e) => update("level", e.target.value)}
            className="bg-surface-container-low rounded-xl px-4 py-3 text-sm font-semibold text-on-surface outline-none"
          >
            {levels.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select
            value={filters.language}
            onChange={(e) => update("language", e.target.value)}
            className="bg-surface-container-low rounded-xl px-4 py-3 text-sm font-semibold text-on-surface outline-none"
          >
            {languages.map((l) => <option key={l}>{l}</option>)}
          </select>
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
            className="bg-surface-container-low rounded-xl px-4 py-3 text-sm font-semibold text-on-surface outline-none"
          >
            {sorts.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => update("category", c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                filters.category === c
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="search_off"
            title="No courses match those filters"
            description="Try clearing filters or searching for something more general."
            action={
              <button
                onClick={() => { setFilters(defaultFilters); safeSet(STORAGE_KEYS.catalogFilters, defaultFilters, "session"); }}
                className="px-5 py-2.5 primary-gradient text-on-primary rounded-xl font-bold"
              >
                Reset filters
              </button>
            }
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.slug}`}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-ambient transition-shadow flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">
                      {c.category}
                    </span>
                    <span className="px-2.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">
                      {c.level}
                    </span>
                  </div>
                  <h3 className="font-black text-lg text-on-surface mb-1 line-clamp-2">{c.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2 flex-1">{c.subtitle}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={c.instructor.avatar} alt={c.instructor.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-on-surface">{c.instructor.name}</p>
                      <p className="text-xs text-on-surface-variant">{c.instructor.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <span className="flex items-center gap-1 text-on-surface font-bold text-sm">
                      <Icon name="star" filled className="text-tertiary-container text-base" />
                      {c.rating} <span className="text-on-surface-variant font-medium">({c.reviewCount.toLocaleString()})</span>
                    </span>
                    <span className="font-black text-lg text-primary">₹{c.price}</span>
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
