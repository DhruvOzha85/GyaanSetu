import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { id: "en", label: "English", native: "English", desc: "Global standard for tech", icon: "language" },
  { id: "hi", label: "Hindi", native: "हिंदी", desc: "अपनी मातृभाषा में सीखें", icon: "translate" },
  { id: "gu", label: "Gujarati", native: "ગુજરાતી", desc: "સરળ સમજૂતી સાથે શીખો", icon: "history_edu" },
];

export default function LanguageSelection() {
  const { lang: selected, setLang: setSelected } = useLanguage();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selected) {
      navigate("/dashboard");
    }
  };


  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-6">
      <SEO title="Choose Language" />

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary-container rounded-3xl mx-auto flex items-center justify-center shadow-ambient mb-8 animate-fade-in">
            <Icon name="translate" className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight">
            Choose your learning path
          </h1>
          <p className="text-xl text-on-surface-variant max-w-lg mx-auto">
            Select the language you are most comfortable with to personalize your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelected(lang.id)}
              className={cn(
                "group relative bg-surface-container-lowest p-8 rounded-[2.5rem] text-left transition-all duration-500 border-2",
                selected === lang.id
                  ? "border-primary shadow-ambient-lg scale-105"
                  : "border-transparent hover:border-primary/20 hover:shadow-ambient"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500",
                selected === lang.id ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary"
              )}>
                <Icon name={lang.icon} className="text-2xl" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest text-primary">{lang.label}</p>
                <h2 className="text-3xl font-black text-on-surface">{lang.native}</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">{lang.desc}</p>
              </div>

              {selected === lang.id && (
                <div className="absolute top-6 right-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-fade-in">
                  <Icon name="check" className="text-on-primary text-lg" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 pt-8">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={cn(
              "px-12 py-4 rounded-2xl font-black text-lg transition-all duration-500 flex items-center gap-3",
              selected
                ? "primary-gradient text-on-primary shadow-ambient hover:scale-105 active:scale-95"
                : "bg-surface-container-highest text-on-surface-variant cursor-not-allowed"
            )}
          >
            Continue Learning <Icon name="arrow_forward" />
          </button>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
            You can change this later in settings
          </p>
        </div>
      </div>
    </div>
  );
}
