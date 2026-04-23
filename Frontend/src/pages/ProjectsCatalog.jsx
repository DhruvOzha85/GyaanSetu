import { useQuery } from "@tanstack/react-query";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { projectService } from "@/services/courseService";
import { CardSkeleton } from "@/components/Loaders";
import { Link } from "react-router-dom";

export default function ProjectsCatalog() {
  const { data: projects, isLoading } = useQuery({ queryKey: ["projects"], queryFn: projectService.list });
  return (
    <>
      <SEO title="Build Real Projects" description="Portfolio-ready projects with structured guidance and code reviews." />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Projects</span>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface mt-2 tracking-tight">Ship things employers care about.</h1>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden flex hover:shadow-ambient transition-shadow">
                <div className="w-1/3 overflow-hidden flex-shrink-0">
                  <img src={p.thumbnail} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">{p.category}</span>
                    <span className="px-2.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">{p.difficulty}</span>
                  </div>
                  <h3 className="font-black text-lg text-on-surface">{p.title}</h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-surface-container text-on-surface text-xs font-bold rounded-md">{t}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-on-surface-variant text-xs"><Icon name="schedule" className="text-sm" /> {p.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
