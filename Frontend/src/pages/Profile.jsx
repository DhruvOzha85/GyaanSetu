import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import { achievements } from "@/data/mock";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <SEO title="Profile" />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start gap-8">
          <img src={user?.avatar} alt={user?.name} className="w-32 h-32 rounded-2xl object-cover shadow-ambient" />
          <div className="flex-1">
            <h1 className="text-3xl font-black text-on-surface">{user?.name ?? "Student"}</h1>
            <p className="text-on-surface-variant">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">Student</span>
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">12-day streak</span>
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold">Joined {user?.joinedAt}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-xl font-black text-on-surface mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((a) => (
            <div key={a.id} className={`bg-surface-container-lowest rounded-2xl p-5 text-center ${!a.earned ? "opacity-40" : ""}`}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-fixed text-on-primary-fixed grid place-items-center mb-3">
                <Icon name={a.icon} filled className="text-2xl" />
              </div>
              <p className="font-bold text-sm text-on-surface">{a.title}</p>
              <p className="text-xs text-on-surface-variant mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
