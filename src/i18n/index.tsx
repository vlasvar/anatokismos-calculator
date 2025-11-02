import React, { createContext, useContext, useMemo, useState } from "react";

type Lang = "el" | "en";

const translations: Record<Lang, Record<string, string>> = {
  el: {
    "nav.calculator": "Υπολογιστής",
    "nav.articles": "Άρθρα",
    "header.title": "Υπολογιστής Ανατοκισμού (Σύνθετου Τόκου)",
    "intro.title": "Τι είναι ο ανατοκισμός;",
    "intro.p1": "Ο σύνθετος τόκος είναι όταν οι τόκοι προστίθενται στο κεφάλαιο και επανεπενδύονται — αυτό κάνει τα χρήματα να αναπτύσσονται ταχύτερα με τον χρόνο.",
    "intro.p2": "Δοκίμασε γρήγορα σενάρια στον υπολογιστή στα δεξιά για να δεις πώς οι καταθέσεις και ο χρόνος επηρεάζουν το τελικό αποτέλεσμα.",
    "settings.title": "Ρυθμίσεις Υπολογισμού",
    "results.title": "Αποτελέσματα",
    "chart.title": "Γράφημα Ανάπτυξης",
    "table.title": "Ανάλυση ανά έτος",
    "footer.builtWith": "Built with care in Greece. Open source on",
    "lang.el": "Ελληνικά",
    "lang.en": "English",
  },
  en: {
    "nav.calculator": "Calculator",
    "nav.articles": "Articles",
    "header.title": "Compound Interest Calculator",
    "intro.title": "What is compound interest?",
    "intro.p1": "Compound interest is when interest earned is added to the principal and reinvested — this makes money grow faster over time.",
    "intro.p2": "Quickly try scenarios in the calculator to see how contributions and time affect the final amount.",
    "settings.title": "Calculation Settings",
    "results.title": "Results",
    "chart.title": "Growth Chart",
    "table.title": "Yearly Breakdown",
    "footer.builtWith": "Built with care. Open source on",
    "lang.el": "Ελληνικά",
    "lang.en": "English",
  },
};

type I18n = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18n>({
  lang: "el",
  setLang: () => {},
  t: (k: string) => k,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>((typeof navigator !== "undefined" && navigator.language?.startsWith("en")) ? "en" : "el");

  const t = useMemo(() => {
    return (key: string) => translations[lang][key] ?? key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

export default I18nContext;
