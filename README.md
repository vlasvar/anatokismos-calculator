# Υπολογιστής Ανατοκισμού (Vite + React + TypeScript)

Απλή εφαρμογή React για υπολογισμό σύνθετου τόκου με γραφήματα, φτιαγμένη με Vite, TypeScript, Tailwind CSS και shadcn-ui.

## Προαπαιτούμενα
- Node.js 18+
- npm 9+ (ή pnpm/yarn αν προτιμάτε)

## Τοπική ανάπτυξη
```sh
npm install
npm run dev
```
Η εφαρμογή θα τρέξει στο `http://localhost:8080`.

## Build παραγωγής
```sh
npm run build
npm run preview
```
Το preview σερβίρει το build από το `dist/`.

## Δομή έργου
- `src/` κώδικας εφαρμογής
- `public/` στατικά αρχεία (εικόνες, favicon, κτλ.)
- `index.html` entry point
- `vite.config.ts` ρυθμίσεις Vite

## Παραμετροποίηση SEO/κοινωνικών δικτύων
Επεξεργαστείτε τα meta tags στο `index.html` (τίτλος, περιγραφή, Open Graph / Twitter). Για εικόνες προεπισκόπησης, τοποθετήστε ένα `public/og-image.png`.

## Άδεια
Ελεύθερη χρήση για προσωπικά ή επαγγελματικά projects. Προσθέστε δική σας άδεια αν απαιτείται.
