import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ARTICLES from "@/content/articles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      <div className="container max-w-7xl mx-auto px-4 py-16">
        <header className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">Άρθρα — Ανατοκισμός</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">Επεξηγήσεις και παραδείγματα για τον σύνθετο τόκο, στην ελληνική γλώσσα.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ARTICLES.map((a) => (
            <Card key={a.slug} className="flex flex-col">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl font-bold tracking-tight">{a.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed">{a.summary}</p>
              </CardHeader>
              <CardContent className="flex-1" />
              <div className="px-6 pb-6">
                <Link
                  to={`/articles/${a.slug}`}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Διαβάστε περισσότερα →
                </Link>
              </div>
            </Card>
          ))}
        </section>
      </div>
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

      <header className="container max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">{article.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{article.summary}</p>
        </div>
      </header>

      <section className="container max-w-7xl mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert">{article.content}</div>
          <div className="mt-12 pt-6 border-t">
            <Link 
              to="/articles" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Πίσω στη λίστα άρθρων
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Articles;
