import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { I18nProvider } from "@/i18n";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import { ArticlePage } from "./pages/Articles";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <I18nProvider>
            <Layout>
              <Routes>
              <Route path="/" element={<Index />} />
              {/* Articles and content pages */}
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticlePage />} />
              {/* Legal pages */}
              <Route path="/terms" element={<div className="container py-8"><h1>Όροι Χρήσης</h1></div>} />
              <Route path="/privacy" element={<div className="container py-8"><h1>Πολιτική Απορρήτου</h1></div>} />
              {/* /about removed until content is available */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </I18nProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
