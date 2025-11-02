import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

type Lang = "el" | "en";

const STORAGE_KEY = "anatokismos_lang";

const translations: Record<Lang, Record<string, string>> = {
  el: {
    "meta.title": "anatokismos.gr • Υπολογιστής Ανατοκισμού",
    "meta.description": "Ελληνικός υπολογιστής ανατοκισμού: υπολογίστε σύνθετο τόκο, τελικό υπόλοιπο και τόκους με μηνιαίες καταθέσεις και γράφημα.",
    "nav.calculator": "Υπολογιστής",
    "nav.articles": "Άρθρα",
    "header.title": "Υπολογιστής Ανατοκισμού (Σύνθετου Τόκου)",
    "intro.title": "Τι είναι ο ανατοκισμός;",
    "intro.p1": "Ο σύνθετος τόκος είναι όταν οι τόκοι προστίθενται στο κεφάλαιο και επανεπενδύονται — αυτό κάνει τα χρήματα να αναπτύσσονται ταχύτερα με τον χρόνο.",
    "intro.p2": "Δοκίμασε γρήγορα σενάρια στον υπολογιστή στα δεξιά για να δεις πώς οι καταθέσεις και ο χρόνος επηρεάζουν το τελικό αποτέλεσμα.",
    "settings.title": "Ρυθμίσεις Υπολογισμού",
    "form.principal": "Αρχικό κεφάλαιο (€)",
    "form.contribution": "Μηνιαία κατάθεση (€)",
    "form.rate": "Ετήσιο επιτόκιο (%)",
    "form.years": "Διάρκεια (έτη)",
    "form.inflation": "Πληθωρισμός (%)",
    "form.compounding": "Συχνότητα ανατοκισμού",
    "form.contributionFrequency": "Συχνότητα καταθέσεων",
    "form.due.label": "Καταθέσεις στην αρχή της περιόδου",
    "form.due.description": "Αν ενεργό, οι καταθέσεις γίνονται στην αρχή κάθε περιόδου.",
    "form.calcButton": "Υπολογισμός",
    "select.placeholder": "Επιλέξτε",
    "select.compounding.daily": "Καθημερινά",
    "select.compounding.weekly": "Εβδομαδιαία",
    "select.compounding.monthly": "Μηνιαία",
    "select.compounding.quarterly": "Τριμηνιαία",
    "select.compounding.semiannual": "Εξαμηνιαία",
    "select.compounding.annual": "Ετήσια",
    "select.compounding.continuous": "Συνεχής",
    "select.contribution.monthly": "Μηνιαία",
    "select.contribution.weekly": "Εβδομαδιαία",
    "select.contribution.annual": "Ετήσια",
    "results.title": "Αποτελέσματα",
    "results.prompt": "Συμπληρώστε τα πεδία και πατήστε Υπολογισμός για να δείτε τα αποτελέσματα.",
    "results.noData": "Δεν υπάρχουν δεδομένα ακόμη.",
    "stats.finalBalance": "Τελικό υπόλοιπο",
    "stats.totalDeposits": "Σύνολο καταθέσεων",
    "stats.totalInterest": "Σύνολο τόκων",
    "stats.realBalance": "Πραγματικό υπόλοιπο (με πληθωρισμό)",
    "chart.title": "Γράφημα Ανάπτυξης",
    "table.title": "Ανάλυση ανά έτος",
    "table.year": "Έτος",
    "table.deposits": "Καταθέσεις",
    "table.interest": "Τόκοι",
    "table.endBalance": "Τελικό υπόλοιπο",
    "footer.builtWith": "Built with care in Greece. Open source on",
    "lang.el": "Ελληνικά",
    "lang.en": "English",
    "articles.title": "Άρθρα • anatokismos.gr",
    "articles.description": "Άρθρα και επεξηγήσεις για τον σύνθετο τόκο και το πώς να τον χρησιμοποιήσετε για αποταμίευση και επενδύσεις.",
    "terms.title": "Όροι Χρήσης",
    "privacy.title": "Πολιτική Απορρήτου",
  },
  en: {
    "meta.title": "anatokismos.gr • Compound Interest Calculator",
    "meta.description": "Greek compound interest calculator: compute compound interest, final balance and interest with periodic contributions.",
    "nav.calculator": "Calculator",
    "nav.articles": "Articles",
    "header.title": "Compound Interest Calculator",
    "intro.title": "What is compound interest?",
    "intro.p1": "Compound interest is when interest earned is added to the principal and reinvested — this makes money grow faster over time.",
    "intro.p2": "Quickly try scenarios in the calculator to see how contributions and time affect the final amount.",
    "settings.title": "Calculation Settings",
    "form.principal": "Initial principal (€)",
    "form.contribution": "Contribution (€)",
    "form.rate": "Annual rate (%)",
    "form.years": "Years",
    "form.inflation": "Inflation (%)",
    "form.compounding": "Compounding frequency",
    "form.contributionFrequency": "Contribution frequency",
    "form.due.label": "Contributions at period start",
    "form.due.description": "If enabled, contributions occur at the start of each period.",
    "form.calcButton": "Calculate",
    "select.placeholder": "Select",
    "select.compounding.daily": "Daily",
    "select.compounding.weekly": "Weekly",
    "select.compounding.monthly": "Monthly",
    "select.compounding.quarterly": "Quarterly",
    "select.compounding.semiannual": "Semiannual",
    "select.compounding.annual": "Annual",
    "select.compounding.continuous": "Continuous",
    "select.contribution.monthly": "Monthly",
    "select.contribution.weekly": "Weekly",
    "select.contribution.annual": "Annual",
    "results.title": "Results",
    "results.prompt": "Fill in the fields and press Calculate to see results.",
    "results.noData": "No data yet.",
    "stats.finalBalance": "Final balance",
    "stats.totalDeposits": "Total deposits",
    "stats.totalInterest": "Total interest",
    "stats.realBalance": "Real balance (with inflation)",
    "chart.title": "Growth Chart",
    "table.title": "Yearly Breakdown",
    "table.year": "Year",
    "table.deposits": "Deposits",
    "table.interest": "Interest",
    "table.endBalance": "End balance",
    "footer.builtWith": "Built with care. Open source on",
    "lang.el": "Ελληνικά",
    "lang.en": "English",
    "articles.title": "Articles • anatokismos.gr",
    "articles.description": "Articles and explanations about compound interest and how to use it for saving and investing.",
    "terms.title": "Terms of use",
    "privacy.title": "Privacy policy",
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
  const initial = ((): Lang => {
    try {
      const stored = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored === "el" || stored === "en") return stored;
    } catch {}
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("en")) return "en";
    return "el";
  })();

  const [lang, setLangState] = useState<Lang>(initial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

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
