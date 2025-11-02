import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";

const schema = z.object({
  principal: z.coerce.number().min(0).default(10000),
  contribution: z.coerce.number().min(0).default(200),
  rate: z.coerce.number().min(0).max(100).default(7),
  years: z.coerce.number().min(1).max(60).default(10),
  compounding: z.enum(["daily", "weekly", "monthly", "quarterly", "semiannual", "annual", "continuous"]).default("annual"),
  contributionFrequency: z.coerce.number().int().min(1).max(365).default(12),
  due: z.boolean().default(false),
  inflation: z.coerce.number().min(0).max(100).optional().default(0),
});

type FormValues = z.infer<typeof schema>;

type YearRow = {
  year: number;
  endBalance: number;
  deposits: number;
  interest: number;
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR" }).format(n);
}

function formatPercent(n: number) {
  return new Intl.NumberFormat("el-GR", { maximumFractionDigits: 2 }).format(n);
}

function effectiveStepRate(nominalRate: number, comp: FormValues["compounding"], stepsPerYear: number) {
  const r = nominalRate / 100;
  if (comp === "continuous") return Math.exp(r / stepsPerYear) - 1;
  const m = comp === "daily" ? 365 : comp === "weekly" ? 52 : comp === "monthly" ? 12 : comp === "quarterly" ? 4 : comp === "semiannual" ? 2 : 1;
  return Math.pow(1 + r / m, m / stepsPerYear) - 1;
}

function computeSchedule(values: FormValues) {
  const { principal, contribution, rate, years, compounding, contributionFrequency, due, inflation = 0 } = values;
  const stepsPerYear = contributionFrequency;
  const stepRate = effectiveStepRate(rate, compounding, stepsPerYear);
  const totalSteps = years * stepsPerYear;

  let balance = principal;
  let schedule: YearRow[] = [];
  let totalDeposits = principal;
  let prevYearEnd = principal;
  let depositsThisYear = 0;

  for (let step = 1; step <= totalSteps; step++) {
    if (due) balance += contribution; // κατάθεση στην αρχή
    balance *= 1 + stepRate; // ανατοκισμός για το βήμα
    if (!due) balance += contribution; // κατάθεση στο τέλος

    depositsThisYear += contribution;
    totalDeposits += contribution;

    const isYearEnd = step % stepsPerYear === 0;
    if (isYearEnd) {
      const year = step / stepsPerYear;
      const endBalance = balance;
      const interest = endBalance - prevYearEnd - depositsThisYear;
      schedule.push({ year, endBalance, deposits: depositsThisYear, interest });
      prevYearEnd = endBalance;
      depositsThisYear = 0;
    }
  }

  const totalInterest = balance - totalDeposits;
  const realBalance = inflation > 0 ? balance / Math.pow(1 + inflation / 100, years) : balance;

  return { balance, totalDeposits, totalInterest, realBalance, schedule };
}

const Stat = ({ label, value, colorClass }: { label: string; value: string; colorClass: string }) => (
  <div className={`p-4 rounded-lg bg-gradient-to-r ${colorClass}`}>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold text-foreground">{value}</p>
  </div>
);

const Index = () => {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: schema.parse({}),
    mode: "onChange",
  });

  const results = useMemo(() => (submitted ? computeSchedule(submitted) : null), [submitted]);

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  const { t } = useI18n();

  // Extract translations before useMemo calls
  const chartLabels = {
    finalBalance: t("stats.finalBalance"),
    totalDeposits: t("stats.totalDeposits"),
    totalInterest: t("stats.totalInterest"),
  };

  // Update useMemo to use extracted translations
  const memoizedChartLabels = useMemo(() => chartLabels, []);

  const scheduleData = useMemo(() => {
    if (!results) return [] as any[];
    return results.schedule.map((row) => ({
      year: row.year,
      finalBalance: row.endBalance,
      totalDeposits: row.deposits,
      totalInterest: row.interest
    }));
  }, [results]);

  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content="anatokismos.gr" />
        <meta property="og:title" content={t("header.title")} />
        <meta property="og:description" content={t("meta.description")} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: `${t("header.title")} — anatokismos.gr`,
          applicationCategory: "FinanceApplication",
          inLanguage: "el-GR",
          description: t("meta.description"),
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" }
        })}</script>
      </Helmet>

      <header className="container mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{t("header.title")}</h1>
      </header>

      {/* Compact intro moved into the calculator section to keep the calculator visible */}

  <section className="container mx-auto px-4 pb-16 relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto h-64 md:h-80 w-full max-w-5xl rounded-full blur-3xl opacity-40 bg-gradient-to-r from-primary/20 to-accent/20" />
        </div>

        {/* Top row: Introduction and Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Introduction column */}
          <Card className="p-6 prose prose-sm max-w-none">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">{t("intro.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{t("intro.p1")}</p>
              <p className="text-sm text-muted-foreground">{t("intro.p2")}</p>
            </CardContent>
          </Card>

          {/* Calculator column */}
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="principal">{t("form.principal")}</Label>
                    <Input id="principal" type="number" step="0.01" {...form.register("principal", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contribution">{t("form.contribution")}</Label>
                    <Input id="contribution" type="number" step="0.01" {...form.register("contribution", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate">{t("form.rate")}</Label>
                    <Input id="rate" type="number" step="0.01" {...form.register("rate", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">{t("form.years")}</Label>
                    <Input id="years" type="number" step="1" {...form.register("years", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inflation">{t("form.inflation")}</Label>
                    <Input id="inflation" type="number" step="0.01" {...form.register("inflation", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("form.compounding")}</Label>
                    <Select defaultValue={form.getValues("compounding")} onValueChange={(v) => form.setValue("compounding", v as FormValues["compounding"]) }>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">{t("select.compounding.daily")}</SelectItem>
                        <SelectItem value="weekly">{t("select.compounding.weekly")}</SelectItem>
                        <SelectItem value="monthly">{t("select.compounding.monthly")}</SelectItem>
                        <SelectItem value="quarterly">{t("select.compounding.quarterly")}</SelectItem>
                        <SelectItem value="semiannual">{t("select.compounding.semiannual")}</SelectItem>
                        <SelectItem value="annual">{t("select.compounding.annual")}</SelectItem>
                        <SelectItem value="continuous">{t("select.compounding.continuous")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t("form.contributionFrequency")}</Label>
                    <Select defaultValue={String(form.getValues("contributionFrequency"))} onValueChange={(v) => form.setValue("contributionFrequency", parseInt(v)) }>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select.placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">{t("select.contribution.monthly")}</SelectItem>
                        <SelectItem value="52">{t("select.contribution.weekly")}</SelectItem>
                        <SelectItem value="1">{t("select.contribution.annual")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <Label className="font-medium">{t("form.due.label")}</Label>
                    <p className="text-sm text-muted-foreground">{t("form.due.description")}</p>
                  </div>
                  <Switch checked={form.watch("due")} onCheckedChange={(c) => form.setValue("due", c)} />
                </div>

                <Button type="submit" className="w-full">{t("form.calcButton")}</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row: Results section */}
        {results && (
          <div className="space-y-6">
            {/* Results overview */}
            <Card>
              <CardHeader>
                <CardTitle>{t("results.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Stat label={t("stats.finalBalance")} value={formatCurrency(results.balance)} colorClass="from-[hsl(var(--brand-orange))] to-[hsl(var(--brand-yellow))]" />
                  <Stat label={t("stats.totalDeposits")} value={formatCurrency(results.totalDeposits)} colorClass="from-[hsl(var(--brand-pink))] to-[hsl(var(--brand-orange))]" />
                  <Stat label={t("stats.totalInterest")} value={formatCurrency(results.totalInterest)} colorClass="from-[hsl(var(--brand-orange-dark))] to-[hsl(var(--brand-rust))]" />
                  <Stat label={t("stats.realBalance")} value={formatCurrency(results.realBalance)} colorClass="from-[hsl(var(--brand-yellow))] to-[hsl(var(--brand-pink))]" />
                </div>
              </CardContent>
            </Card>

            {/* Growth chart */}
            <Card>
              <CardHeader>
                <CardTitle>{t("chart.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scheduleData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <defs>
                        <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--brand-orange))" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="hsl(var(--brand-orange))" stopOpacity={0.05}/>
                        </linearGradient>
                        <linearGradient id="deposits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--brand-pink))" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="hsl(var(--brand-pink))" stopOpacity={0.05}/>
                        </linearGradient>
                        <linearGradient id="interest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="year" 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(v) => `${v}`} 
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(v) => new Intl.NumberFormat("el-GR", { 
                          notation: "compact",
                          maximumFractionDigits: 1 
                        }).format(v)}
                      />
                      <Tooltip 
                        formatter={(v: any) => formatCurrency(Number(v))} 
                        labelFormatter={(l) => t("table.year") + " " + l}
                      />
                      <Legend 
                        formatter={(value: string) => value}
                      />
                      <Area 
                        type="monotone"
                        dataKey="finalBalance"
                        stroke="hsl(var(--brand-orange))"
                        fill="url(#balance)"
                        name={t("stats.finalBalance")}
                      />
                      <Area 
                        type="monotone"
                        dataKey="totalDeposits"
                        stroke="hsl(var(--brand-pink))"
                        fill="url(#deposits)"
                        name={t("stats.totalDeposits")}
                      />
                      <Area 
                        type="monotone"
                        dataKey="totalInterest"
                        stroke="hsl(var(--brand-yellow))"
                        fill="url(#interest)"
                        name={t("stats.totalInterest")}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
};

export default Index;
