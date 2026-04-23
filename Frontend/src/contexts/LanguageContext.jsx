import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("gyaansetu_lang") || "en");

  useEffect(() => {
    localStorage.setItem("gyaansetu_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Basic translation helper
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
