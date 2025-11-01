import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const scheduleData = useMemo(() => {
    if (!results) return [] as any[];
    return results.schedule.map((row) => ({
      year: row.year,
      "Τελικό Υπόλοιπο": row.endBalance,
      "Καταθέσεις": row.deposits,
      "Τόκοι": row.interest,
    }));
  }, [results]);

  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>anatokismos.gr • Υπολογιστής Ανατοκισμού</title>
        <meta name="description" content="Ελληνικός υπολογιστής ανατοκισμού: υπολογίστε σύνθετο τόκο, τελικό υπόλοιπο και τόκους με μηνιαίες καταθέσεις και γράφημα." />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content="anatokismos.gr" />
        <meta property="og:title" content="Υπολογιστής Ανατοκισμού" />
        <meta property="og:description" content="Υπολογίστε σύνθετο τόκο, τελικό υπόλοιπο και τόκους με μηνιαίες καταθέσεις." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Υπολογιστής Ανατοκισμού — anatokismos.gr",
          applicationCategory: "FinanceApplication",
          inLanguage: "el-GR",
          description: "Υπολογίστε σύνθετο τόκο, τελικό υπόλοιπο και τόκους με ελληνικό υπολογιστή ανατοκισμού.",
          offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" }
        })}</script>
      </Helmet>

      <header className="container mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Υπολογιστής Ανατοκισμού (Σύνθετου Τόκου)
        </h1>
      </header>

      {/* Informational article section for homepage (Greek) */}
      <section className="container mx-auto px-4 py-12">
        <Card className="prose prose-lg max-w-none p-8 lg:p-12">
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl lg:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Ο ανατοκισμός μπορεί να μεταμορφώσει την αποταμίευσή σας</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                Ο ανατοκισμός είναι μια μαθηματική έννοια που σχετίζεται με τα χρήματα και τις επενδύσεις, αλλά μπορεί να
                μεταμορφώσει τη ζωή κάποιου αν την κατανοήσει σωστά. Ας δούμε απλά τι σημαίνει, πώς λειτουργεί και γιατί
                είναι τόσο δυναμικό εργαλείο για να χτίσει κανείς μια μικρή περιουσία.
              </p>

              <h3>Τι είναι ο ανατοκισμός;</h3>
              <p>
                Ο ανατοκισμός (ή σύνθετος τόκος) είναι όταν τα χρήματα που κερδίζεις από τους τόκους μιας επένδυσης
                προστίθενται στο αρχικό σου κεφάλαιο, και επενδύονται ξανά. Έτσι, το επόμενο διάστημα, οι τόκοι
                υπολογίζονται όχι μόνο πάνω στο αρχικό ποσό που είχες βάλει, αλλά και πάνω στους προηγούμενους τόκους που
                έχεις ήδη κερδίσει. Φαντάσου να φυτεύεις ένα δέντρο και κάθε χρόνο το ίδιο το δέντρο γεννά καινούρια μικρά
                δέντρα που επίσης μεγαλώνουν και σου δίνουν καρπούς.
              </p>

              <h3>Γιατί είναι χρήσιμος ο ανατοκισμός;</h3>
              <ul>
                <li>Όσο πιο συχνά επανεπενδύονται οι τόκοι, τόσο πιο γρήγορα μεγαλώνει το κεφάλαιό σου.</li>
                <li>Ακόμα και μικρά μηνιαία ποσά, μέσω της δύναμης του ανατοκισμού, μπορούν να οδηγήσουν σε σημαντικά ποσά στο μέλλον.</li>
                <li>Ο ανατοκισμός λειτουργεί σαν «επιταχυντής» πλούτου – όσο περισσότερο χρόνο του δώσεις, τόσο πιο εντυπωσιακά αποτελέσματα έχει.</li>
              </ul>

              <h3>Πώς να χτίσεις μικρή περιουσία με αποταμίευση και επένδυση</h3>
              <ol>
                <li><strong>Ξεκίνα όσο νωρίτερα γίνεται.</strong> Ο χρόνος είναι το πιο σημαντικό συστατικό του ανατοκισμού.</li>
                <li><strong>Βάλε ένα αρχικό κεφάλαιο και πρόσθεσε μικρά μηνιαία ποσά.</strong> Ακόμη και 50€ το μήνα μπορούν να κάνουν μεγάλη διαφορά σε δεκαετίες.</li>
                <li><strong>Επίλεξε επένδυση που δίνει σύνθετο τόκο.</strong> Τράπεζες, επενδυτικά κεφάλαια και ορισμένες επενδύσεις παρέχουν ανατοκισμό.</li>
                <li><strong>Μη βιαστείς να κάνεις ανάληψη.</strong> Όσο μένουν τα χρήματα «μέσα», ο ανατοκισμός δουλεύει για σένα.</li>
                <li><strong>Χρησιμοποίησε εργαλεία όπως αυτόν τον υπολογιστή.</strong> Δοκίμασε διαφορετικά σενάρια και δες πόση δύναμη έχει ο χρόνος και η συνέπεια.</li>
              </ol>

              <h3 className="mt-4">Συμπέρασμα</h3>
              <p>
                Ο ανατοκισμός είναι το μυστικό για να χτίσεις πλούτο σιγά-σιγά και μεθοδικά, χωρίς να χρειάζεται να έχεις
                πολλά χρήματα από την αρχή. Η βασική του δύναμη είναι ο χρόνος και η σταθερή αποταμίευση. Όσο πιο νωρίς
                ξεκινήσεις και όσο πιο συνεπής είσαι, τόσο πιο εντυπωσιακά θα δεις τα αποτελέσματα στο μέλλον.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4 pb-16 relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto h-64 md:h-80 w-full max-w-5xl rounded-full blur-3xl opacity-40 bg-gradient-to-r from-primary/20 to-accent/20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ρυθμίσεις Υπολογισμού</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Αρχικό κεφάλαιο (€)</Label>
                    <Input id="principal" type="number" step="0.01" {...form.register("principal", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contribution">Μηνιαία κατάθεση (€)</Label>
                    <Input id="contribution" type="number" step="0.01" {...form.register("contribution", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate">Ετήσιο επιτόκιο (%)</Label>
                    <Input id="rate" type="number" step="0.01" {...form.register("rate", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Διάρκεια (έτη)</Label>
                    <Input id="years" type="number" step="1" {...form.register("years", { valueAsNumber: true })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inflation">Πληθωρισμός (%)</Label>
                    <Input id="inflation" type="number" step="0.01" {...form.register("inflation", { valueAsNumber: true })} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Συχνότητα ανατοκισμού</Label>
                    <Select defaultValue={form.getValues("compounding")} onValueChange={(v) => form.setValue("compounding", v as FormValues["compounding"]) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Καθημερινά</SelectItem>
                        <SelectItem value="weekly">Εβδομαδιαία</SelectItem>
                        <SelectItem value="monthly">Μηνιαία</SelectItem>
                        <SelectItem value="quarterly">Τριμηνιαία</SelectItem>
                        <SelectItem value="semiannual">Εξαμηνιαία</SelectItem>
                        <SelectItem value="annual">Ετήσια</SelectItem>
                        <SelectItem value="continuous">Συνεχής</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Συχνότητα καταθέσεων</Label>
                    <Select defaultValue={String(form.getValues("contributionFrequency"))} onValueChange={(v) => form.setValue("contributionFrequency", parseInt(v)) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">Μηνιαία</SelectItem>
                        <SelectItem value="52">Εβδομαδιαία</SelectItem>
                        <SelectItem value="1">Ετήσια</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <Label className="font-medium">Καταθέσεις στην αρχή της περιόδου</Label>
                    <p className="text-sm text-muted-foreground">Αν ενεργό, οι καταθέσεις γίνονται στην αρχή κάθε περιόδου.</p>
                  </div>
                  <Switch checked={form.watch("due")} onCheckedChange={(c) => form.setValue("due", c)} />
                </div>

                <Button type="submit" className="w-full">Υπολογισμός</Button>
              </form>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Αποτελέσματα</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stat label="Τελικό υπόλοιπο" value={formatCurrency(results.balance)} colorClass="from-[hsl(var(--brand-orange))] to-[hsl(var(--brand-yellow))]" />
                    <Stat label="Σύνολο καταθέσεων" value={formatCurrency(results.totalDeposits)} colorClass="from-[hsl(var(--brand-pink))] to-[hsl(var(--brand-orange))]" />
                    <Stat label="Σύνολο τόκων" value={formatCurrency(results.totalInterest)} colorClass="from-[hsl(var(--brand-orange-dark))] to-[hsl(var(--brand-rust))]" />
                    <Stat label="Πραγματικό υπόλοιπο (με πληθωρισμό)" value={formatCurrency(results.realBalance)} colorClass="from-[hsl(var(--brand-yellow))] to-[hsl(var(--brand-pink))]" />
                  </div>
                ) : (
                  <p className="text-muted-foreground">Συμπληρώστε τα πεδία και πατήστε Υπολογισμός για να δείτε τα αποτελέσματα.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Γράφημα Ανάπτυξης</CardTitle>
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
                      <XAxis dataKey="year" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => new Intl.NumberFormat("el-GR", { notation: "compact" }).format(v)} />
                      <Tooltip formatter={(v: any) => formatCurrency(Number(v))} labelFormatter={(l) => `Έτος ${l}`} />
                      <Legend />
                      <Area type="monotone" dataKey="Τελικό Υπόλοιπο" stroke="hsl(var(--brand-orange))" fill="url(#balance)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Καταθέσεις" stroke="hsl(var(--brand-pink))" fill="url(#deposits)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Τόκοι" stroke="hsl(var(--brand-yellow))" fill="url(#interest)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ανάλυση ανά έτος</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Έτος</TableHead>
                          <TableHead>Καταθέσεις</TableHead>
                          <TableHead>Τόκοι</TableHead>
                          <TableHead>Τελικό υπόλοιπο</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.schedule.map((row) => (
                          <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{formatCurrency(row.deposits)}</TableCell>
                            <TableCell>{formatCurrency(row.interest)}</TableCell>
                            <TableCell>{formatCurrency(row.endBalance)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Δεν υπάρχουν δεδομένα ακόμη.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

const Stat = ({ label, value, colorClass }: { label: string; value: string; colorClass?: string }) => (
  <div className="rounded-lg border p-4">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-semibold text-foreground mt-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent" style={colorClass ? undefined : undefined}>
      <span className={colorClass ? `bg-clip-text text-transparent bg-gradient-to-r ${colorClass}` : ''}>{value}</span>
    </div>
  </div>
);

export default Index;
