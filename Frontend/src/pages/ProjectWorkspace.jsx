import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";

export default function ProjectWorkspace() {
  return (
    <div className="min-h-screen bg-surface-container-low">
      <SEO title="Project Workspace" />
      <header className="bg-surface-container-lowest px-6 py-4 flex items-center gap-4">
        <Link to="/projects" className="w-10 h-10 grid place-items-center rounded-xl hover:bg-surface-container-low text-on-surface-variant">
          <Icon name="arrow_back" />
        </Link>
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Project Workspace</p>
          <h1 className="font-black text-on-surface">E-Commerce Storefront</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid lg:grid-cols-[2fr_1fr] gap-6">
        <section className="space-y-6">
          {[
            { step: 1, title: "Setup the Next.js scaffold", done: true },
            { step: 2, title: "Build the product catalog page", done: true },
            { step: 3, title: "Add cart & checkout flow", done: false },
            { step: 4, title: "Wire up Stripe payments", done: false },
            { step: 5, title: "Deploy to production", done: false },
          ].map((s) => (
            <div key={s.step} className="bg-surface-container-lowest rounded-2xl p-5 flex items-center gap-5">
              <div className={`w-10 h-10 rounded-xl grid place-items-center font-black ${s.done ? "bg-secondary text-on-secondary" : "bg-primary-fixed text-on-primary-fixed"}`}>
                {s.done ? <Icon name="check" /> : s.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-on-surface">{s.title}</h3>
                <p className="text-on-surface-variant text-xs">{s.done ? "Completed" : "In progress"}</p>
              </div>
              <button className="px-4 py-2 bg-surface-container-low text-on-surface font-bold rounded-xl text-sm">View</button>
            </div>
          ))}
        </section>
        <aside className="bg-surface-container-lowest rounded-2xl p-5 h-fit">
          <h3 className="font-black text-on-surface mb-4">Repo</h3>
          <div className="bg-surface-container-low rounded-xl p-4 font-mono text-xs text-on-surface-variant">
            git clone https://github.com/gyaansetu/projects/ecom-storefront
          </div>
          <button className="w-full mt-4 px-4 py-2.5 primary-gradient text-on-primary font-bold rounded-xl">Open editor</button>
        </aside>
      </div>
    </div>
  );
}
