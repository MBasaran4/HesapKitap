# Contributing Guide

Thank you for your interest in contributing to **HesapKitap**!

This guide is intended to make the contribution process **simple, transparent, and efficient**.

---

## Getting Started

### 1. Fork the Repository

Fork this repository to your own GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/HesapKitap.git
cd HesapKitap
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173/
```

---

## Branch Naming

Please use clear and descriptive branch names when working on changes.

| Prefix      | Purpose                            | Example                     |
| ----------- | ---------------------------------- | --------------------------- |
| `feature/`  | Adding a new feature or calculator | `feature/loan-calculator`   |
| `fix/`      | Fixing a bug                       | `fix/bmr-validation-bug`    |
| `docs/`     | Documentation changes              | `docs/update-readme`        |
| `refactor/` | Refactoring existing code          | `refactor/input-components` |

---

## Development Guidelines

When making changes, please follow these guidelines:

### 1. Follow the Calculator Structure

When adding a new calculator, use the existing `CalculatorLayout`, `InputField`, and `ResultCard` components whenever applicable.

This helps maintain a consistent structure and user experience across the application.

### 2. Validate Inputs and Edge Cases

Always validate user inputs, including:

* Empty values
* Negative numbers
* Zero values
* Invalid or unrealistic ranges
* Other calculator-specific edge cases

The application should never produce invalid results such as `NaN` or `Infinity`.

### 3. Maintain Accessibility

Follow basic accessibility practices:

* Use semantic HTML elements.
* Properly associate form labels with their inputs using `htmlFor` and `id`.
* Ensure interactive elements are keyboard accessible.
* Maintain sufficient readability in both light and dark themes.

### 4. Support Both Themes

Avoid hardcoded colors that may cause readability issues between light and dark modes.

Prefer the CSS variables defined in `index.css` whenever possible.

### 5. Avoid Unnecessary Dependencies

Do not add large or external UI libraries unless they are genuinely necessary for the feature.

Prefer existing project components and utilities when possible.

---

## Code Quality & Build Checks

Before opening a Pull Request, run the following commands locally and make sure they complete without errors.

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

Both checks should pass before submitting your Pull Request.

---

## Commits & Pull Requests

### Commit Messages

Use clear and concise commit messages that describe the change.

Examples:

```text
feat: add volume calculation formula
fix: correct leap year validation
docs: update contributing guide
refactor: improve calculator input components
```

### Push Your Changes

Push your branch to your fork:

```bash
git push origin feature/<feature-name>
```

### Open a Pull Request

Create a Pull Request from your branch to the main HesapKitap repository.

When opening a Pull Request:

1. Clearly describe what you changed.
2. Explain why the change was necessary.
3. Complete the Pull Request checklist.
4. Include screenshots for UI-related changes when applicable.
5. Make sure all relevant checks pass.

---

## Adding a New Calculator

If you are adding a new calculator, please make sure it:

* Has a clear and understandable purpose.
* Follows the existing calculator architecture.
* Validates user input.
* Handles edge cases correctly.
* Works in both light and dark themes.
* Is responsive across different screen sizes.
* Maintains accessibility standards.
* Does not introduce unnecessary dependencies.

---

## Questions & Suggestions

If you have an idea, suggestion, or improvement for HesapKitap, feel free to open an **Issue** or start a discussion.

Thank you for helping improve HesapKitap! 🚀
