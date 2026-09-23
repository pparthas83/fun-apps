# Edison Math Trainer: 7th Grade Algebra 1 (Section 2.5)

An ultra-lightweight, zero-cost, interactive web application tailored for Edison Township Public Schools 7th Grade Accelerated Algebra 1 students practicing **Section 2.5: Absolute Value Equations**.

🌐 **Live Cloud Run URL**: [https://edison-math-trainer-lgemkmicia-ue.a.run.app](https://edison-math-trainer-lgemkmicia-ue.a.run.app)  
*(Alternative URL: [https://edison-math-trainer-832497031659.us-east1.run.app](https://edison-math-trainer-832497031659.us-east1.run.app))*

---

## Features

* **52 Canonical Curriculum Questions**:
  * Direct one-to-one mapping from Edison Township teacher slides, 2.5 Practice worksheets, 2.5 Skills Practice, and Writing Equations assignments.
* **Algorithmic Infinite Practice Generator**:
  * Unlimited practice questions synthesized on the fly across 6 distinct problem archetypes.
  * Extraneous solution traps and absolute values on both sides ($|ax+b| = |cx+d|$).
* **Teacher's 5-Point Checklist**:
  * Persistent interactive checklist based on the exact 5-step quiz rubric (Isolate, 2-Case Split, Solve, Solution Set Braces, Check & Graph).
* **Fill-in-the-Blank Answer Validator**:
  * Accepts standard solution set notation (e.g., `{-6, 2}`, `{2, -6}`, `No solution`, `\emptyset`).
* **Interactive SVG Number Line Visualizer**:
  * Dynamic vector graphics rendering closed/open points, midpoints, and distance spans.
* **10-Question Quiz Sprint Mode**:
  * Timed/focused sprint with score celebration modal and grade readiness feedback.
* **Zero Server-Side Session State**:
  * 100% private per-device tracking via browser `localStorage` (mastery, streaks, score).

---

## Tech Stack

* **Frontend**: Vanilla HTML5, ES6+ JavaScript, Tailwind CSS (CDN), KaTeX (LaTeX math rendering), Canvas-Confetti.
* **Backend**: Node.js 20 LTS native standard library (`http`, `fs`, `path`) — **0 external npm dependencies**.
* **Container**: Docker with `node:20-alpine` (~50MB image).
* **Cloud Infrastructure**: Google Cloud Run (`us-east1`), auto-scaling with zero idle cost.

---

## Local Development

### Prerequisites
* Node.js 18+ installed.

### Run Locally
```bash
# Start local server
npm start
# or: node server.js
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Automated Test Suites

```bash
# 1. Run Mathematical Integrity & Formula Validator (1,300+ assertions)
node test-math-data.js

# 2. Run Headless Chrome DevTools Protocol E2E Browser Test Suite
node test-browser-e2e.js
```

---

## Curriculum Reference Documents

Original district curriculum materials and teacher slide decks are archived in `docs/curriculum/`:
* `Day 1- 2.5 Absolute Value Equations .pdf`
* `2.5 Practice .pdf`
* `2.5 Skills Practice .pdf`
* `2.5 Writing Equations .pdf`
* `Grade_7___8_Algebra_1.pdf`
