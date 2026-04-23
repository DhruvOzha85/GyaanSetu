import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courseService } from "@/services/courseService";
import { EmptyState } from "@/components/EmptyState";
import { CardSkeleton } from "@/components/Loaders";

export default function MyCourses() {
  const { data, isLoading } = useQuery({ queryKey: ["my-courses"], queryFn: courseService.myCourses });
  return (
    <>
      <SEO title="My Courses" />
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black text-on-surface mb-8">My Courses</h1>
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : !data?.length ? (
          <EmptyState icon="school" title="You haven't enrolled yet" description="Browse the catalog and pick a course to start." action={<Link to="/courses" className="px-5 py-2.5 primary-gradient text-on-primary rounded-xl font-bold">Browse courses</Link>} />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {data.map((c) => (
              <Link key={c.id} to={`/learn/${c.slug}/ls_5`} className="bg-surface-container-lowest rounded-2xl overflow-hidden">
                <img src={c.thumbnail} alt={c.title} className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-black text-on-surface">{c.title}</h3>
                  <div className="mt-3 h-1.5 bg-primary-fixed rounded-full overflow-hidden">
                    <div className="h-full primary-gradient" style={{ width: `${c.progress}%` }} />
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1"><Icon name="play_arrow" className="text-base" /> {c.progress}% complete</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
