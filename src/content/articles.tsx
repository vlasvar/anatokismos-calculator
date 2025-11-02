import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  content: React.ReactNode;
};

export const ARTICLES: Article[] = [
  {
    slug: "ti-einai-o-synthetos-tokos",
    title: "Τι είναι ο σύνθετος τόκος;",
    summary:
      "Βασική επεξήγηση του σύνθετου τόκου και γιατί είναι σημαντικός για αποταμίευση και επενδύσεις.",
    content: (
      <div className="prose prose-lg dark:prose-invert">
        <h2 className="font-bold">
          Η πιο δυνατή «μαγεία» στα οικονομικά – και γιατί σε αφορά
        </h2>

        <p className="lead">
          Αν έχεις ποτέ ακούσει τη φράση «άσε τα λεφτά σου να δουλεύουν για σένα», τότε έχεις ήδη μια μικρή ιδέα για το τι
          είναι ο σύνθετος τόκος. Πρόκειται για έναν απλό αλλά πανίσχυρο μηχανισμός που μπορεί να κάνει τις αποταμιεύσεις ή
          τις επενδύσεις σου να μεγαλώνουν σχεδόν… από μόνες τους.
        </p>

        <h3 className="font-semibold">Πώς λειτουργεί</h3>
        <p>
          Ας το πούμε όσο πιο απλά γίνεται. Όταν βάζεις κάποια χρήματα στην άκρη —ας πούμε 1.000 ευρώ— και παίρνεις τόκο,
          για παράδειγμα 5% τον χρόνο, τότε στο τέλος του χρόνου έχεις 1.050 ευρώ.
        </p>

        <p>
          Αν όμως δεν τα ξοδέψεις και αφήσεις αυτά τα 1.050 ευρώ για έναν ακόμη χρόνο με τον ίδιο τόκο, τότε ο τόκος θα
          υπολογιστεί όχι μόνο στα αρχικά 1.000, αλλά και στα 50 ευρώ που είχες κερδίσει. Έτσι, τον δεύτερο χρόνο θα πάρεις
          τόκο πάνω σε τόκο.
        </p>

        <div className="my-8 p-6 bg-muted rounded-lg">
          <p className="!mt-0 font-medium">
            Αυτό ακριβώς είναι ο σύνθετος τόκος: ο τόκος που «γεννάει» κι άλλους τόκους με τον χρόνο.
          </p>
        </div>

        <h3 className="font-semibold">Γιατί είναι τόσο σημαντικός</h3>
        <p>
          Ο σύνθετος τόκος έχει μια μαγική ιδιότητα — δυναμώνει με τον χρόνο. Όσο περισσότερο αφήνεις τα χρήματα να δουλεύουν,
          τόσο πιο γρήγορα αυξάνονται. Δεν πρόκειται για κάτι περίπλοκο· είναι απλή μαθηματική λογική.
        </p>

        <h3 className="font-semibold">Παράδειγμα</h3>
        <p>
          Αν αποταμιεύεις 100 ευρώ τον μήνα με μέση απόδοση 5% τον χρόνο, σε 20 χρόνια δεν θα έχεις μόνο τα 24.000 ευρώ που
          έβαλες. Θα έχεις σχεδόν 40.000 ευρώ. Αυτή η διαφορά των 16.000 ευρώ είναι το «δώρο» του σύνθετου τόκου.
        </p>

        <h3 className="font-semibold">Το μυστικό είναι η υπομονή</h3>
        <p>
          Ο σύνθετος τόκος δεν είναι «γρήγορος δρόμος προς τον πλούτο». Είναι ένα εργαλείο υπομονής. Όσο πιο νωρίς ξεκινήσεις,
          τόσο περισσότερο χρόνο έχει να δουλέψει για σένα.
        </p>

        <div className="my-8 p-6 bg-card rounded-lg border">
          <p className="!mt-0">
            <em>
              Σκέψου το σαν ένα δέντρο: στην αρχή φυτεύεις τον σπόρο (τα πρώτα σου χρήματα) και μετά απλώς τον ποτίζεις (με τακτική
              αποταμίευση). Με τα χρόνια, το δέντρο μεγαλώνει και βγάζει καρπούς όλο και πιο γρήγορα.
            </em>
          </p>
        </div>

        <h3 className="font-semibold">Πώς να τον αξιοποιήσεις</h3>
        <ul className="space-y-2">
          <li>✓ Ξεκίνα νωρίς – ακόμη και μικρά ποσά κάνουν τη διαφορά με τον χρόνο.</li>
          <li>✓ Απόφυγε να τραβάς συχνά χρήματα – ο σύνθετος τόκος δουλεύει μόνο όταν τον αφήνεις να «χτίζει».</li>
          <li>✓ Επένδυσε με συνέπεια – είτε πρόκειται για αποταμιευτικό πρόγραμμα είτε για επένδυση, η σταθερότητα φέρνει αποτέλεσμα.</li>
        </ul>

        <blockquote>
          <p>
            «Ο σύνθετος τόκος είναι το όγδοο θαύμα του κόσμου. Όποιος τον κατανοεί, τον εκμεταλλεύεται. Όποιος όχι, πληρώνει για αυτόν.»
          </p>
          <footer>
            — Albert Einstein
          </footer>
        </blockquote>

        <p>
          Με λίγα λόγια: όσο πιο νωρίς ξεκινήσεις, τόσο περισσότερο δουλεύει ο χρόνος για σένα — και όχι εσύ για τα λεφτά.
        </p>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/">Δοκιμάστε τον Υπολογιστή →</Link>
          </Button>
        </div>
      </div>
    ),
  },

  {
    slug: "paradeigma-ependysis",
    title: "Παράδειγμα: Πώς λειτουργεί σε μια επένδυση",
    summary:
      "Ένα αριθμητικό παράδειγμα που δείχνει πώς τακτικές καταθέσεις και ανατοκισμός αυξάνουν το κεφάλαιο με τα χρόνια.",
    content: (
      <div className="prose prose-lg dark:prose-invert">
        <p className="lead">
          Ας πούμε ότι αποφασίζεις να ξεκινήσεις να αποταμιεύεις 100 ευρώ τον μήνα σε ένα επενδυτικό πρόγραμμα που σου
          δίνει ετήσια απόδοση 5% (δηλαδή περίπου 0,4% τον μήνα).
        </p>

        <div className="my-8 p-6 bg-muted rounded-lg">
          <p className="!mt-0">
            Στην αρχή ίσως σου φαίνεται μικρό ποσό, αλλά δες πώς δουλεύει ο ανατοκισμός με το πέρασμα του χρόνου:
          </p>
        </div>

        <div className="not-prose my-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left font-semibold bg-muted border-b border-border-light">Έτος</th>
                <th className="px-4 py-3 text-left font-semibold bg-muted border-b border-border-light">Σύνολο καταθέσεων</th>
                <th className="px-4 py-3 text-left font-semibold bg-muted border-b border-border-light">Τόκοι/Κέρδη</th>
                <th className="px-4 py-3 text-left font-semibold bg-muted border-b border-border-light">Συνολικό κεφάλαιο</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-border-light">1ο</td>
                <td className="px-4 py-3 border-b border-border-light">1.200 €</td>
                <td className="px-4 py-3 border-b border-border-light">31 €</td>
                <td className="px-4 py-3 border-b border-border-light font-medium">1.231 €</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border-light">5ο</td>
                <td className="px-4 py-3 border-b border-border-light">6.000 €</td>
                <td className="px-4 py-3 border-b border-border-light">680 €</td>
                <td className="px-4 py-3 border-b border-border-light font-medium">6.680 €</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border-light">10ο</td>
                <td className="px-4 py-3 border-b border-border-light">12.000 €</td>
                <td className="px-4 py-3 border-b border-border-light">2.430 €</td>
                <td className="px-4 py-3 border-b border-border-light font-medium">14.430 €</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border-light">20ό</td>
                <td className="px-4 py-3 border-b border-border-light">24.000 €</td>
                <td className="px-4 py-3 border-b border-border-light">15.700 €</td>
                <td className="px-4 py-3 border-b border-border-light font-medium">39.700 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground italic">
          * Οι αριθμοί είναι ενδεικτικοί, με βάση μηνιαίο ανατοκισμό 5% ετησίως.
        </p>

        <p>
          Βλέπεις πώς με το πέρασμα του χρόνου οι τόκοι αυξάνονται ολοένα και πιο γρήγορα; Αυτό συμβαίνει γιατί κάθε χρόνο
          δεν παίρνεις τόκο μόνο πάνω στα χρήματα που κατέθεσες, αλλά και πάνω στους τόκους των προηγούμενων ετών.
        </p>

        <h3 className="font-semibold">Αν σταματήσεις μετά από 20 χρόνια</h3>
        <div className="my-8 p-6 bg-card rounded-lg border">
          <p className="!mt-0">
            Ας πούμε ότι μετά από 20 χρόνια σταματάς να βάζεις χρήματα, αλλά αφήνεις τα 39.700 € να «δουλεύουν» μόνα τους με το
            ίδιο 5%.
          </p>
          <p className="!mb-0">
            <strong>
              Μόλις σε 10 χρόνια χωρίς να βάλεις ούτε ένα ευρώ παραπάνω, το ποσό θα έχει φτάσει περίπου 65.000 €!
            </strong>
          </p>
        </div>

        <h3 className="font-semibold">Το συμπέρασμα</h3>
        <p>
          Ο ανατοκισμός είναι σαν ένα χιόνι που κυλά σε κατηφόρα — στην αρχή είναι μια μικρή μπάλα, αλλά όσο κυλά, μαζεύει
          κι άλλο χιόνι και γίνεται τεράστια.
        </p>

        <div className="my-8 p-6 bg-muted rounded-lg">
          <p className="!mt-0 !mb-0 text-lg font-medium">
            Όσο πιο νωρίς ξεκινήσεις και όσο πιο σταθερός είσαι, τόσο πιο εντυπωσιακά θα είναι τα αποτελέσματα.
          </p>
        </div>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/">Δοκιμάστε τον Υπολογιστή →</Link>
          </Button>
        </div>
      </div>
    ),
  },

  {
    slug: "what-is-compound-interest",
    title: "What is compound interest?",
    summary:
      "A basic explanation of compound interest and why it matters for saving and investing.",
    content: (
      <div className="prose prose-lg dark:prose-invert">
        <h2 className="font-bold">
          The most powerful “magic” in finance — and why it matters to you
        </h2>

        <p className="lead">
          If you’ve ever heard the phrase “let your money work for you,” you already have a small idea of what compound interest is. It’s a simple but extremely powerful mechanism that can make your savings or investments grow almost by themselves.
        </p>

        <h3 className="font-semibold">How it works</h3>
        <p>
          Let’s put it as simply as possible. When you set some money aside — say €1,000 — and earn interest, for example 5% per year, at the end of the year you have €1,050.
        </p>

        <p>
          But if you don’t spend that money and leave the €1,050 for another year at the same interest rate, the interest will be calculated not only on the original €1,000, but also on the €50 you earned. So in the second year you earn interest on the interest.
        </p>

        <div className="my-8 p-6 bg-muted rounded-lg">
          <p className="!mt-0 font-medium">
            That is exactly compound interest: interest that “generates” more interest over time.
          </p>
        </div>

        <h3 className="font-semibold">Why it’s so important</h3>
        <p>
          Compound interest has a kind of magic — it gets stronger with time. The longer you let your money work, the faster it grows. It’s not complicated; it’s just straightforward math.
        </p>

        <h3 className="font-semibold">Example</h3>
        <p>
          If you save €100 per month with an average return of 5% per year, in 20 years you won’t have only the €24,000 you contributed. You’ll have almost €40,000. That difference of €16,000 is the “gift” of compound interest.
        </p>

        <h3 className="font-semibold">The secret is patience</h3>
        <p>
          Compound interest is not a “quick road to riches.” It’s a tool of patience. The earlier you start, the more time it has to work for you.
        </p>

        <div className="my-8 p-6 bg-card rounded-lg border">
          <p className="!mt-0">
            <em>
              Think of it like a tree: at first you plant the seed (your initial money) and then you simply water it (with regular saving). Over the years the tree grows and bears fruit faster and faster.
            </em>
          </p>
        </div>

        <h3 className="font-semibold">How to take advantage of it</h3>
        <ul className="space-y-2">
          <li>✓ Start early — even small amounts make a big difference over time.</li>
          <li>✓ Avoid withdrawing frequently — compound interest works only when you let it “build.”</li>
          <li>✓ Invest consistently — whether a savings plan or other investment, consistency produces results.</li>
        </ul>

        <blockquote>
          <p>
            “Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn’t, pays it.”
          </p>
          <footer>
            — Albert Einstein
          </footer>
        </blockquote>

        <p>
          In short: the earlier you start, the more time works for you — rather than you always working for your money.
        </p>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/">Try the Calculator →</Link>
          </Button>
        </div>
      </div>
    ),
  },

  {
    slug: "example-how-it-works",
    title: "Example: How it works in an investment",
    summary:
      "A numeric example showing how regular deposits and compounding grow your capital over the years.",
    content: (
      <div className="prose prose-lg dark:prose-invert">
        <p className="lead">
          Suppose you decide to start saving €100 per month into an investment plan that gives an annual return of 5% (about 0.4% per month).
        </p>

        <div className="my-8 p-6 bg-muted rounded-lg">
          <p className="!mt-0">
            At first that may seem small, but see how compounding works over time:
          </p>
        </div>

        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Year</th>
              <th className="border border-gray-300 px-4 py-2">Total contributions</th>
              <th className="border border-gray-300 px-4 py-2">Interest/Gains</th>
              <th className="border border-gray-300 px-4 py-2">Total balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1st</td>
              <td className="border border-gray-300 px-4 py-2">€1,200</td>
              <td className="border border-gray-300 px-4 py-2">€31</td>
              <td className="border border-gray-300 px-4 py-2">€1,231</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">5th</td>
              <td className="border border-gray-300 px-4 py-2">€6,000</td>
              <td className="border border-gray-300 px-4 py-2">€680</td>
              <td className="border border-gray-300 px-4 py-2">€6,680</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">10th</td>
              <td className="border border-gray-300 px-4 py-2">€12,000</td>
              <td className="border border-gray-300 px-4 py-2">€2,430</td>
              <td className="border border-gray-300 px-4 py-2">€14,430</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">20th</td>
              <td className="border border-gray-300 px-4 py-2">€24,000</td>
              <td className="border border-gray-300 px-4 py-2">€15,700</td>
              <td className="border border-gray-300 px-4 py-2">€39,700</td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-muted-foreground">
          Numbers are illustrative, based on monthly compounding at 5% yearly.
        </p>

        <p>
          You can see how, as time passes, the interest grows faster and faster. That happens because each year you earn interest not only on the money you deposited but also on the interest from previous years.
        </p>

        <h3 className="font-semibold">If you stop after 20 years</h3>
        <p>
          Suppose after 20 years you stop making deposits, but you leave the €39,700 to “work” at the same 5%.
        </p>

        <p>
          In just 10 more years without adding another euro, the amount would reach roughly €65,000!
        </p>

        <h3 className="font-semibold">Conclusion</h3>
        <p>
          Compounding is like a snowball rolling downhill — at first it’s small, but as it rolls it gathers more snow and becomes huge.
        </p>

        <p>
          The earlier you start and the more consistent you are, the more impressive the results will be.
        </p>

        <div className="mt-12">
          <Button asChild size="lg">
            <Link to="/">Try the Calculator →</Link>
          </Button>
        </div>
      </div>
    ),
  },
];

export default ARTICLES;
