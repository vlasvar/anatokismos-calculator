import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ARTICLES from "@/content/articles";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" }).format(n);
}

const Articles = () => {
  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Άρθρα • anatokismos.gr</title>
        <meta name="description" content="Άρθρα και επεξηγήσεις για τον σύνθετο τόκο και το πώς να τον χρησιμοποιήσετε για αποταμίευση και επενδύσεις (Ελληνικά)." />
      </Helmet>

      <header className="container mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Άρθρα — Ανατοκισμός</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">Επεξηγήσεις και παραδείγματα για τον σύνθετο τόκο, στην ελληνική γλώσσα.</p>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((a) => (
            <article key={a.slug} className="p-6 border rounded-md">
              <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{a.summary}</p>
              <Link to={`/articles/${a.slug}`} className="text-primary underline">Διαβάστε περισσότερα →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = ARTICLES.find((s) => s.slug === slug);

  if (!article) {
    // fallback: navigate back to list
    React.useEffect(() => {
      navigate("/articles");
    }, [navigate]);
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} • anatokismos.gr</title>
        <meta name="description" content={article.summary} />
      </Helmet>

      <header className="container mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{article.title}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{article.summary}</p>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="prose max-w-none">{article.content}</div>
        <div className="mt-8">
          <Link to="/articles" className="text-muted-foreground underline">← Πίσω στη λίστα άρθρων</Link>
        </div>
      </section>
    </main>
  );
};

export default Articles;
