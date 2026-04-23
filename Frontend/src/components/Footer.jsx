import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="bg-surface-container-low pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <span className="text-2xl font-black text-primary-container italic">GyaanSetu</span>
            <p className="text-on-surface-variant text-sm mt-4 leading-relaxed">
              The Digital Courtyard. Bridging theory and industry for the modern Indian learner — in your language.
            </p>
            <div className="flex gap-3 mt-6">
              {["public", "alternate_email", "rss_feed"].map((i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={i}
                  className="w-10 h-10 grid place-items-center rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors"
                >
                  <Icon name={i} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Learn", links: [
              { label: "Courses", to: "/courses" },
              { label: "Labs", to: "/labs" },
              { label: "Projects", to: "/projects" },
              { label: "Leaderboard", to: "/leaderboard" },
            ]},
            { title: "Platform", links: [
              { label: "Pricing", to: "/pricing" },
              { label: "For Teams", to: "/pricing" },
              { label: "Help Center", to: "/help" },
              { label: "Contact", to: "/help" },
            ]},
            { title: "Account", links: [
              { label: "Sign in", to: "/login" },
              { label: "Sign up", to: "/signup" },
              { label: "Dashboard", to: "/dashboard" },
              { label: "Settings", to: "/settings" },
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest font-bold text-on-surface-variant mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-on-surface font-medium hover:text-primary transition-colors text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row gap-4 justify-between items-center text-on-surface-variant text-xs">
          <p>© {new Date().getFullYear()} GyaanSetu Learning Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
