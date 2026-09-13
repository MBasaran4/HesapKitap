# Changelog

All notable changes to this project are documented in this file in accordance with the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) principles and [Semantic Versioning](https://semver.org/) standards.

---

## [0.1.0] - 2026-09-13

### Added

* **Calculator Consolidation:** Merged six independent calculator repositories (`BoyKiloEndeks`, `MetabolizmaHesap`, `AlanHesaplama`, `HacimHesap`, `YasHesaplama`, `vizeFinalHesap`) into a single modern React + Vite Single Page Application (SPA).
* **Categorized Homepage:** Organized calculators into four categories: Health, Mathematics, Time, and Education.
* **Shared Component System:**

  * `CalculatorLayout`: Standardized card, heading, and information box layout for all calculators.
  * `InputField`: Unit support, dynamic error messages, and accessible label-input associations.
  * `RadioGroup`: Semantic `fieldset`/`legend` structure with a modern radio selection interface.
  * `ResultCard`: Real-time result card with `aria-live="polite"` support for screen readers.
  * `SubmitButton`: Consistent calculation and reset action button.
* **Responsive Navigation:** Desktop horizontal navigation and a right-side hamburger drawer for mobile devices.
* **Theme System (Dark / Light):** Instant theme switching using CSS variables with persistent preferences stored in `localStorage`.
* **Comprehensive Input Validation:**

  * Prevents out-of-range, empty, and negative values.
  * Calendar validation for invalid dates, including the 31st day of months with only 30 days, February 29th outside leap years, and future dates.
  * Protection against displaying `NaN` or `Infinity` in the user interface.
* **Open Source Documentation & Templates:**

  * `README.md`, `LICENSE` (MIT), `CONTRIBUTING.md`, and `SECURITY.md`.
  * GitHub Issue templates (`bug_report.md`, `feature_request.md`, `config.yml`).
  * GitHub Pull Request template (`pull_request_template.md`).
  * GitHub Actions CI workflow (`ci.yml`) running `npm ci`, `npm run lint`, and `npm run build`.

### Changed

* Cleaned up project dependencies by removing the unnecessary Next.js dependency and integrating `@vercel/speed-insights/react` and `react-router-dom`.
* Verified the square pyramid volume formula (`a² × h / 3`) and corrected the result label.
* Replaced approximately 50 KB of static calendar array data on the age calculation page with a dynamic and precise date difference algorithm.

### Removed

* Removed scattered and duplicated CSS files and restructured styling around centralized `index.css` design tokens.
* Removed unused components and legacy template files.
