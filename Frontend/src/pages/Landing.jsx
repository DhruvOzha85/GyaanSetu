import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { courses } from "@/data/mock";
import { useLanguage } from "@/contexts/LanguageContext";


const features = [
  {
    icon: "biotech",
    title: "Hands-On Labs",
    color: "primary",
    description:
      "No expensive hardware required. Run Python, Java, Cloud Architectures, and Web Dev environments directly in your browser with our optimized sandboxes.",
    bullets: ["Zero Setup Environments", "Real-time Code Feedback"],
    link: { label: "Launch a Lab Demo", to: "/labs" },
  },
  {
    icon: "translate",
    title: "Regional Language Courses",
    color: "secondary",
    description:
      "Complex technical concepts explained in your mother tongue. We offer comprehensive content in Hindi, Gujarati, Marathi, and Tamil alongside English.",
    bullets: ["Bilingual Support Forums", "Localized Case Studies"],
    link: { label: "Browse Languages", to: "/language" },
  },
];

const stats = [
  { value: "50k+", label: "Active Learners" },
  { value: "100+", label: "Industry Mentors" },
  { value: "1.2M", label: "Lab Runs / Month" },
  { value: "92%", label: "Career Outcomes" },
];

const testimonials = [
  {
    name: "Pooja Shah",
    role: "Data Analyst @ Razorpay",
    quote: "Learning ML in Hindi changed everything. I finally felt confident enough to apply for analyst roles.",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
  {
    name: "Aditya Rao",
    role: "Backend Engineer @ Swiggy",
    quote: "The browser labs are unreal. Shipped a real Express API in week one — and got hired in three months.",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    name: "Diya Kapoor",
    role: "Cloud Engineer @ Tata Digital",
    quote: "Hands-down the best AWS course in Gujarati. The labs feel like the real cloud — because they are.",
    avatar: "https://i.pravatar.cc/100?img=38",
  },
];

export default function Landing() {
  const { t } = useLanguage();
  const featured = courses.slice(0, 3);
  return (
    <>
      <SEO
        title={t("hero.title")}
        description={t("hero.subtitle")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "GyaanSetu",
          url: "https://gyaansetu.in",
        }}
      />

      {/* Hero */}
      <section className="pt-20 pb-20 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold tracking-widest uppercase">
              The Digital Courtyard
            </span>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-on-surface">
              {t("hero.title").split(".")[0]}.
              <br />
              <span className="text-primary">{t("hero.title").split(".")[1]}</span>
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 primary-gradient text-on-primary font-bold rounded-xl shadow-ambient hover:shadow-ambient-lg transition-all flex items-center gap-2"
              >
                {t("hero.cta")}
                <Icon name="arrow_forward" />
              </Link>
              <Link
                to="/courses"
                className="px-8 py-4 bg-surface-container-lowest text-primary font-bold rounded-xl hover:bg-surface-container transition-all"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container rounded-full blur-3xl opacity-30" />
            <div className="relative z-10 bg-surface-container-lowest p-5 rounded-3xl shadow-ambient-lg">
              <img
                alt="Online learning dashboard with code editor"
                className="rounded-2xl w-full aspect-video object-cover"
                src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=1200&q=70"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary-fixed text-on-secondary-fixed p-4 rounded-xl shadow-xl flex items-center gap-3">
              <Icon name="terminal" filled className="text-3xl" />
              <div className="pr-4">
                <p className="text-xs font-bold opacity-70 uppercase tracking-tighter">Live Lab</p>
                <p className="font-bold">Cloud Console Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Strip */}
      <section className="py-12 bg-secondary-container/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="flex gap-6 items-start md:pr-8">
            <div className="w-12 h-12 flex-shrink-0 bg-surface-container-lowest rounded-full grid place-items-center text-error">
              <Icon name="block" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Traditional Theory</h3>
              <p className="text-on-surface-variant text-sm">
                Rote memorization and outdated textbooks that leave you unprepared for the modern job market.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start md:pl-8 md:border-l-2 border-surface-container-lowest">
            <div className="w-12 h-12 flex-shrink-0 bg-surface-container-lowest rounded-full grid place-items-center text-secondary">
              <Icon name="rocket_launch" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">GyaanSetu Practical Labs</h3>
              <p className="text-on-surface-variant text-sm">
                Direct industry application through browser-based coding labs and real-world project simulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 text-on-surface">
              Built for the Modern Indian Learner
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:shadow-ambient transition-all border-b-4 ${f.color === "primary" ? "border-primary" : "border-secondary"}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl grid place-items-center mb-8 group-hover:scale-110 transition-transform ${f.color === "primary" ? "bg-primary-fixed text-primary" : "bg-secondary-fixed text-secondary"}`}
                >
                  <Icon name={f.icon} filled className="text-4xl" />
                </div>
                <h3 className="text-3xl font-black text-on-surface mb-4">{f.title}</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{f.description}</p>
                <ul className="space-y-3 mb-8">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-on-surface font-medium">
                      <Icon name="check_circle" className={f.color === "primary" ? "text-primary" : "text-secondary"} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={f.link.to}
                  className={`font-bold flex items-center gap-2 group-hover:gap-4 transition-all ${f.color === "primary" ? "text-primary" : "text-secondary"}`}
                >
                  {f.link.label} <Icon name="trending_flat" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-container relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-on-primary relative z-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-5xl font-black mb-2">{s.value}</p>
              <p className="font-bold uppercase tracking-wider text-xs opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-primary">Trending now</span>
              <h2 className="text-4xl font-black tracking-tight text-on-surface mt-2">Popular Courses</h2>
            </div>
            <Link to="/courses" className="font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all">
              Browse all <Icon name="arrow_forward" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((c) => (
              <Link
                key={c.id}
                to={`/courses/${c.slug}`}
                className="group bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-ambient transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-primary">{c.category}</span>
                    <span className="text-on-surface-variant">·</span>
                    <span className="text-xs font-semibold text-on-surface-variant">{c.language}</span>
                  </div>
                  <h3 className="font-black text-xl text-on-surface mb-2 line-clamp-2">{c.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">{c.subtitle}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-on-surface font-bold">
                      <Icon name="star" filled className="text-tertiary-container text-base" />
                      {c.rating}
                    </span>
                    <span className="font-black text-primary">₹{c.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-primary">Loved by learners</span>
            <h2 className="text-4xl font-black tracking-tight text-on-surface mt-2">Outcomes that speak.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col gap-6">
                <Icon name="format_quote" className="text-4xl text-primary-fixed" />
                <blockquote className="text-on-surface text-lg leading-relaxed flex-1">"{t.quote}"</blockquote>
                <figcaption className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-on-surface text-sm">{t.name}</p>
                    <p className="text-on-surface-variant text-xs">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="primary-gradient rounded-3xl p-12 lg:p-16 text-center text-on-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Your career starts in your language.
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Join 50,000+ learners shipping real-world projects every month. The first lab is on us.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-surface-container-lowest text-primary font-bold rounded-xl hover:bg-surface-container transition-colors"
              >
                Create your free account
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
