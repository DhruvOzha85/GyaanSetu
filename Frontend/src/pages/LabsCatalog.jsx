import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { labService } from "@/services/courseService";
import { CardSkeleton } from "@/components/Loaders";

export default function LabsCatalog() {
  const { data: labs, isLoading } = useQuery({ queryKey: ["labs"], queryFn: labService.list });
  return (
    <>
      <SEO title="Hands-On Labs" description="Browser-based coding labs with zero setup. Practice Python, AWS, SQL, and more." />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Browser labs</span>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface mt-2 tracking-tight">Practice. Don't just watch.</h1>
          <p className="text-on-surface-variant max-w-2xl mt-3">Spin up real environments in seconds — Python, Node, AWS, SQL — all in your browser.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs?.map((l) => (
              <Link key={l.id} to={`/labs/${l.id}`} className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-ambient transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={l.thumbnail} alt={l.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">{l.category}</span>
                    <span className="px-2.5 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">{l.difficulty}</span>
                  </div>
                  <h3 className="font-black text-lg text-on-surface mb-1">{l.title}</h3>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">{l.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-on-surface-variant"><Icon name="schedule" className="text-base" /> {l.duration}</span>
                    <span className="flex items-center gap-1 text-on-surface font-bold"><Icon name="star" filled className="text-tertiary-container text-base" /> {l.rating}</span>
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
