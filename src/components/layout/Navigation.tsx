import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              anatokismos.gr
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Υπολογιστής
            </Link>
            <Link
              to="/articles"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Άρθρα
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Σχετικά
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}