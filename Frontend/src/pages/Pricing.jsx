import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { Link } from "react-router-dom";

const plans = [
  { name: "Free", price: "₹0", period: "/forever", features: ["Access to 20+ free courses", "Basic browser labs", "Community support"], cta: "Get started", highlight: false },
  { name: "Pro", price: "₹499", period: "/month", features: ["All courses & labs", "Verified certificates", "1-on-1 mentor reviews", "Priority support"], cta: "Start free trial", highlight: true },
  { name: "Teams", price: "Custom", period: "", features: ["Everything in Pro", "Team analytics dashboard", "Custom learning paths", "Dedicated success manager"], cta: "Talk to sales", highlight: false },
];

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing — Plans for every learner" />
      <section className="bg-surface-container-low py-16 text-center">
        <span className="text-xs uppercase tracking-widest font-bold text-primary">Pricing</span>
        <h1 className="text-4xl lg:text-5xl font-black text-on-surface mt-2">Plans that grow with you.</h1>
        <p className="text-on-surface-variant max-w-xl mx-auto mt-3">Start free. Upgrade when you're ready to ship real projects.</p>
      </section>
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-3xl p-8 ${p.highlight ? "primary-gradient text-on-primary shadow-ambient-lg" : "bg-surface-container-lowest text-on-surface"}`}>
            {p.highlight && <span className="inline-block px-3 py-1 bg-on-primary/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Most popular</span>}
            <h3 className="text-2xl font-black">{p.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-5xl font-black">{p.price}</span>
              <span className={p.highlight ? "opacity-80" : "text-on-surface-variant"}>{p.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Icon name="check_circle" className={p.highlight ? "" : "text-secondary"} /> {f}
                </li>
              ))}
            </ul>
            <Link to="/signup" className={`block text-center px-6 py-3 rounded-xl font-bold ${p.highlight ? "bg-surface-container-lowest text-primary" : "primary-gradient text-on-primary"}`}>{p.cta}</Link>
          </div>
        ))}
      </section>
    </>
  );
}
