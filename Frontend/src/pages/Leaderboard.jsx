import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { leaderboard, achievements } from "@/data/mock";

export default function Leaderboard() {
  return (
    <>
      <SEO title="Leaderboard & Achievements" />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Community</span>
          <h1 className="text-4xl font-black text-on-surface mt-2">Climb the courtyard.</h1>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-6">
          <h2 className="font-black text-on-surface mb-4">Top learners — this month</h2>
          <ul className="space-y-2">
            {leaderboard.map((p) => (
              <li key={p.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low">
                <span className={`w-9 h-9 rounded-full grid place-items-center font-black ${p.rank === 1 ? "bg-tertiary-container text-on-tertiary" : p.rank <= 3 ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container text-on-surface-variant"}`}>{p.rank}</span>
                <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-bold text-on-surface">{p.name}</p>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1"><Icon name="local_fire_department" className="text-base text-primary" /> {p.streak}-day streak</p>
                </div>
                <span className="font-black text-primary">{p.points.toLocaleString()} XP</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h2 className="font-black text-on-surface mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div key={a.id} className={`text-center p-3 rounded-xl bg-surface-container-low ${!a.earned ? "opacity-40" : ""}`}>
                <div className="w-12 h-12 mx-auto rounded-xl primary-gradient text-on-primary grid place-items-center mb-2">
                  <Icon name={a.icon} filled />
                </div>
                <p className="text-xs font-bold text-on-surface">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
