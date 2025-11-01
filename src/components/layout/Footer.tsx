import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built with care in Greece & lIV@NI🚀. Open source on{" "}
            <a
              href="https://github.com/vlasvar/anatokismos-calculator"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/terms"
            className="text-sm underline underline-offset-4"
          >
            Όροι Χρήσης
          </Link>
          <Link
            to="/privacy"
            className="text-sm underline underline-offset-4"
          >
            Απόρρητο
          </Link>
        </div>
      </div>
    </footer>
  );
}