# Uzence Front-End Assignment

React + TypeScript + TailwindCSS + Storybook implementation of two reusable UI components: **InputField** and **DataTable**, with a small demo app, stories, and basic tests.

## 📦 Tech Stack
- React 18 + TypeScript (Vite)
- TailwindCSS
- Storybook 8 (React Vite)
- Vitest + Testing Library
- Strict TypeScript and A11y-minded props

## ▶️ Quick Start
```bash
# install
pnpm i     # or: npm i / yarn

# run demo
pnpm dev

# run storybook
pnpm storybook

# run tests
pnpm test
```

## 📁 Structure
```
src/
  components/
    InputField/
      InputField.tsx
      InputField.stories.tsx
      InputField.test.tsx
    DataTable/
      DataTable.tsx
      DataTable.stories.tsx
      DataTable.test.tsx
  App.tsx
  main.tsx
  styles.css
.storybook/
  main.ts
  preview.ts
```

## 🧩 Components

### InputField
- Props: label, placeholder, helperText, errorMessage, disabled, invalid, variant (`filled|outlined|ghost`), size (`sm|md|lg`), loading, clearable, passwordToggle
- A11y: `aria-label`, `aria-invalid`, `aria-busy`
- Optional extras: clear button, password visibility toggle

### DataTable
- Generic `DataTable<T>` with `Column<T>`
- Sorting by column (asc/desc)
- Row selection (multi) + callback
- Loading and empty states
- Responsive + accessible table headers

## 🧪 Tests
- Input change, error state, clear button
- Table render, sorting trigger, selection callback

## 🌐 Deployment
- Storybook: `pnpm build-storybook` (deploy via Vercel or Chromatic)
- App: `pnpm build && pnpm preview` (or deploy `dist/` on Vercel/Netlify)

## ✨ Notes
- Tailwind tokens defined in `styles.css` for quick theming
- Dark mode friendly (uses `dark:` variants)
- Minimal external deps; ready to extend

---


