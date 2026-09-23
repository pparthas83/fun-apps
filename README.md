# Fun Projects Monorepo

A multi-project monorepo hosting independent interactive web applications, educational tools, and microservice prototypes.

---

## Projects Catalog

| Project Directory | Description | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| [`edison-math-trainer/`](./edison-math-trainer/) | Edison Township 7th Grade Algebra 1 Quiz Trainer (Absolute Value, Chapter 2.5) | Node.js, HTML5, Vanilla JS, Docker, Cloud Run | Active / Deployed |

---

## Architectural & Repository Guidelines

Each project within this repository is designed as an independent, self-contained service:
- **Isolated Dependencies**: Each subproject maintains its own `package.json`, dependencies, and build configuration.
- **Independent Deployment**: Each subproject includes its own `Dockerfile` or runtime server, allowing autonomous deployment to services like Google Cloud Run.
- **Dedicated Automated Tests**: Subprojects maintain independent test suites (`tests/` or unit test harnesses).

### Global Standards Compliance
All projects within this repository strictly follow the Antigravity Global Architecture and Git standards:
- **Modular Directory Structure**: Separation of HTML, stylesheets, client JS modules, and server handlers.
- **Pure Functions**: Mathematical and core business logic decoupled from DOM manipulation.
- **Conventional Commits**: Commit messages follow standard Conventional Commits 1.0.0.
- **Confidential Deployment URLs**: Live Cloud Run URLs and deployment endpoints are strictly excluded from public repository documentation.
