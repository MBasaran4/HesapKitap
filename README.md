[🇬🇧 English](README.md) | [🇹🇷 Türkçe](README-tr.md)

# 🧮 HesapKitap

**HesapKitap** is a modern React-based calculation platform that brings together practical calculators for everyday life, health, mathematics, time, and education in a single web application.

The project focuses on providing a **simple, fast, responsive, and accessible** experience with client-side calculations and a clean modular architecture.

<p align="center">
  <a href="https://hesap-kitap.vercel.app">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

---

## ✨ Features

* 📱 **Responsive UI** — Designed for mobile, tablet, laptop, and large screens.
* 🌙 **Dark & Light Theme** — Persistent theme preference using `localStorage`.
* ⚡ **Client-Side Calculations** — Instant results without server requests.
* ✅ **Input Validation** — Handles empty, invalid, negative, and out-of-range inputs.
* ♿ **Accessibility** — Semantic HTML, accessible form controls, keyboard navigation, and screen-reader support.
* 🧭 **SPA Navigation** — Smooth client-side routing with React Router.
* 🧩 **Modular Architecture** — Reusable components and organized calculator modules.
* 🛡️ **Error Handling** — Protection against invalid mathematical results such as `NaN` and `Infinity`.

---

## 🧮 Calculators

HesapKitap currently includes **6 calculators across 4 categories**:

| Category       | Calculator            | Description                                                                             |
| -------------- | --------------------- | --------------------------------------------------------------------------------------- |
| 🩺 Health      | **BMI Calculator**    | Calculates Body Mass Index and provides an ideal weight range.                          |
| 🩺 Health      | **BMR Calculator**    | Estimates Basal Metabolic Rate and daily calorie needs based on activity level.         |
| 📐 Mathematics | **Area Calculator**   | Calculates the area of rectangles, triangles, and circles.                              |
| 📦 Mathematics | **Volume Calculator** | Calculates the volume of cubes, prisms, cylinders, cones, spheres, and square pyramids. |
| ⏱️ Time        | **Age Calculator**    | Calculates age differences, total days lived, and upcoming birthday countdowns.         |
| 🎓 Education   | **Grade Calculator**  | Calculates exam averages, required final scores, and target grades.                     |

---

## 🛠️ Tech Stack

* **React** — UI and component architecture
* **Vite** — Development environment and build tool
* **React Router DOM** — Client-side routing
* **React Icons** — Interface icons
* **Vanilla CSS** — Responsive layouts, design tokens, and reusable styles
* **Vercel** — Deployment, analytics, and performance monitoring

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/MBasaran4/HesapKitap.git
```

Navigate to the project directory:

```bash
cd HesapKitap
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
HesapKitap/
├── public/
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   ├── common/
│   │   └── layout/
│   ├── context/
│   ├── pages/
│   │   ├── education/
│   │   ├── health/
│   │   ├── mathematics/
│   │   └── time/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .github/
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── package.json
```

The project is structured around **reusable components, independent calculator pages, shared styling, and centralized application state**, making it easier to add new calculators in the future.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

If you discover a security issue, please review [SECURITY.md](SECURITY.md).

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  Built with React ⚛️
</p>

<p align="center">
  <a href="https://hesap-kitap.vercel.app">Live Demo</a>
  ·
  <a href="https://github.com/MBasaran4/HesapKitap">Repository</a>
</p>
