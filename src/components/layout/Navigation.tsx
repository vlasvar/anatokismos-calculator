import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";

export function Navigation() {
  const { lang, setLang, t } = useI18n();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">anatokismos.gr</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground">{t("nav.calculator")}</Link>
            <Link to="/articles" className="transition-colors hover:text-foreground/80 text-foreground">{t("nav.articles")}</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground hidden sm:block">{lang === "el" ? t("lang.el") : t("lang.en")}</div>
          <select
            aria-label="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value as "el" | "en")}
            className="rounded border bg-background/70 px-2 py-1 text-sm"
          >
            <option value="el">{t("lang.el")}</option>
            <option value="en">{t("lang.en")}</option>
          </select>
        </div>
      </div>
    </nav>
  );
}