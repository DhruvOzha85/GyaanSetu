import { SEO } from "@/components/SEO";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState("en");
  return (
    <>
      <SEO title="Settings" />
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-on-surface">Settings</h1>
          <p className="text-on-surface-variant mt-1">Tailor GyaanSetu to how you learn best.</p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h2 className="font-black text-on-surface mb-4 flex items-center gap-2"><Icon name="palette" /> Appearance</h2>
          <div className="grid grid-cols-2 gap-3">
            {["light", "dark"].map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`p-4 rounded-xl text-left font-bold capitalize ${theme === t ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-low text-on-surface"}`}>
                <Icon name={t === "light" ? "light_mode" : "dark_mode"} className="mb-2" />
                <p>{t} mode</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h2 className="font-black text-on-surface mb-4 flex items-center gap-2"><Icon name="translate" /> Language</h2>
          <div className="grid grid-cols-3 gap-3">
            {[{ k: "en", l: "English" }, { k: "hi", l: "हिंदी" }, { k: "gu", l: "ગુજરાતી" }].map((o) => (
              <button key={o.k} onClick={() => setLang(o.k)} className={`px-4 py-3 rounded-xl font-bold ${lang === o.k ? "primary-gradient text-on-primary" : "bg-surface-container-low text-on-surface"}`}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-6">
          <h2 className="font-black text-on-surface mb-4 flex items-center gap-2"><Icon name="notifications" /> Notifications</h2>
          {["Weekly progress digest", "New course recommendations", "Lab reminders"].map((label) => (
            <label key={label} className="flex items-center justify-between py-3 cursor-pointer">
              <span className="text-on-surface">{label}</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
