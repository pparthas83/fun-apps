# Source Code Architecture & Modern Modular Standards

This document establishes the architectural standards, directory hierarchy, and modular coding conventions for this repository. All subsequent refactoring, feature additions, and code contributions must adhere to these rules.

---

## 1. Directory Structure Standards

Source files must be cleanly separated by language, domain, and responsibility rather than placed flatly at the root.

```
/
├── .github/                     # CI/CD workflows and actions
├── config/                      # Build, server, and runtime environment configs
├── docs/                        # Project documentation and curriculum source files
│   ├── architecture/            # Architectural decision records (ADRs)
│   └── curriculum/              # Official school slides, worksheets, and syllabus
├── public/                      # Static web assets served to the browser
│   ├── index.html               # Main application entry HTML
│   ├── views/                   # Additional modular HTML templates or partials
│   │   ├── modal-summary.html
│   │   └── checklist-drawer.html
│   ├── css/                     # Stylesheets and visual styling rules
│   │   ├── main.css             # Base stylesheet and typography imports
│   │   └── components/          # Component-specific styles (cards, modals, svgs)
│   ├── js/                      # Modular JavaScript source files
│   │   ├── main.js              # Application entrypoint & DOM bootstrap
│   │   ├── config/              # Feature flags, constants, and settings
│   │   ├── core/                # State management, storage, and event bus
│   │   │   ├── state.js         # Reactive or encapsulated session state
│   │   │   └── storage.js       # localStorage persistence adapter
│   │   ├── data/                # Static data stores and curriculum banks
│   │   │   └── questions.js     # Canonical curriculum questions
│   │   ├── engines/             # Pure math and algorithmic engines
│   │   │   ├── generator.js     # Algorithmic problem synthesizer
│   │   │   ├── normalizer.js    # Solution set parser & answer validator
│   │   │   └── svg-renderer.js  # Coordinate number line vector generator
│   │   └── ui/                  # UI View controllers and component binders
│   │       ├── checklist.js     # Teacher's 5-Point Checklist controller
│   │       ├── toast.js         # Floating notification controller
│   │       └── quiz-modal.js    # Quiz sprint completion modal
│   └── assets/                  # Static media, icons, and fonts
│       └── icons/
├── server/                      # Backend server source code
│   └── server.js                # Lightweight HTTP server & SPA router
├── tests/                       # Automated test suites
│   ├── unit/                    # Fast mathematical & logic unit tests
│   │   └── math-engine.test.js
│   └── e2e/                     # Headless browser automation integration tests
│       └── browser.test.js
├── Dockerfile                   # Container specification
├── package.json                 # Project manifest & npm scripts
├── README.md                    # Project overview & onboarding guide
└── SOURCE_STRUCTURE.md          # Architectural & coding standards (this file)
```

---

## 2. Separation of Concerns Rules

### Rule A: HTML Isolation
* **HTML files must reside exclusively in the `public/` or `public/views/` directory.**
* Never inline large blocks of HTML directly inside JavaScript string literals when a reusable HTML template, `<template>` tag, or dedicated partial can be used.
* Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<dialog>`) instead of nested generic `<div>` wrappers.

### Rule B: Stylesheet Isolation
* **CSS rules must reside in `public/css/`.**
* **Zero inline styles**: Do not inject CSS attributes via `element.style` or inline `style="..."` attributes in HTML, except for dynamically calculated numerical dimensions (such as SVG coordinate positions and progress bar widths).
* Utilize CSS Custom Properties (CSS variables) for design system tokens (colors, border radii, shadows, spacing) to ensure theme consistency.

### Rule C: JavaScript Modularization (ES Modules)
* **JavaScript files must reside in `public/js/`**, partitioned strictly by domain:
  1. `data/`: Immutable question sets and curriculum data definitions.
  2. `engines/`: Pure, deterministic calculation functions with **zero DOM references**.
  3. `core/`: State management and persistent storage adapters.
  4. `ui/`: View-layer controllers that listen to DOM events and render updates.
* Use native ECMAScript Modules (`import` / `export`) instead of loading scripts into the global `window` scope.
* Scripts in `index.html` must be imported via `<script type="module" src="js/main.js"></script>`.

---

## 3. Modular Coding & Modern JS Standards

### 1. Pure Functions for Business & Math Logic
All mathematical operations, equation generation, answer normalization, and solution set validations must be implemented as **pure functions** in `engines/`:
* Given the same inputs, a pure function always returns the exact same output.
* Functions must produce **no side effects** (no modifying external variables, no calling `document.getElementById`).
* This enables 100% test coverage without mocking the DOM or browser environment.

```javascript
// ✅ GOOD (engines/normalizer.js): Pure, testable function
export function normalizeSolutionSet(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') return '';
  return rawInput
    .trim()
    .replace(/\s+/g, '')
    .toLowerCase();
}

// ❌ BAD: Mixing DOM mutation with calculation logic
function checkAnswer() {
  const val = document.getElementById('input').value; // Side effect / DOM dependency
  if (val === '2') {
    document.getElementById('feedback').innerText = 'Correct'; // Coupled
  }
}
```

### 2. Unidirectional State Flow & Encapsulation
State should never be mutated arbitrarily across random DOM click handlers.
* Encapsulate state inside a dedicated module (`core/state.js`).
* Provide explicit mutator functions or dispatchers (e.g., `setCurrentIndex()`, `recordAnswer()`, `resetProgress()`).
* Save state changes through an explicit adapter (`core/storage.js`) rather than sprinkling `localStorage.setItem()` throughout UI event listeners.

### 3. Defensive Programming & Validation
* Validate all function inputs and provide fallback defaults.
* Avoid magic numbers and strings; extract them into named constants (`config/constants.js`).
* Use strict equality (`===` and `!==`) exclusively.
* Use `const` by default, `let` only when re-assignment is required, and never use `var`.

### 4. DOM Security & Rendering Hygiene
* Never use `eval()` or `new Function()`.
* When rendering user-supplied strings or dynamic text into the DOM, use `.textContent` or `.innerText` instead of `.innerHTML` to prevent Cross-Site Scripting (XSS).
* For mathematical formulas, pass strings safely through the `katex.render()` API rather than concatenating unescaped HTML.

---

## 4. Testing & Verification Standards

To guarantee regression-free code and zero-defect deployments:

1. **Unit Testing (`tests/unit/`)**:
   * Every engine function in `engines/` must have a corresponding automated unit test verifying typical cases, edge cases (zero, negative numbers, fractions, empty sets), and boundary conditions.
   * Unit tests must execute in under 1 second without requiring a browser or network connection.

2. **End-to-End Browser Testing (`tests/e2e/`)**:
   * Browser automation tests must verify real DOM interactions, keyboard input, responsive layouts, and checklist interactions.
   * Tests must assert that the browser console produces **zero runtime errors or uncaught exceptions**.

---

## 5. Summary Checklist for Code Reviews

Before committing code or deploying to Cloud Run, verify:
* [ ] HTML files are located inside `public/`.
* [ ] CSS files are located inside `public/css/`.
* [ ] JavaScript is divided into modular files under `public/js/` using `export` / `import`.
* [ ] No math or generation logic contains DOM queries or mutations.
* [ ] All tests in `tests/` pass with 100% success rate.
* [ ] No temporary files, credentials, or node_modules are tracked in git.
