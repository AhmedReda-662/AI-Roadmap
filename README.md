# AI Learning Roadmap

A self-taught AI learning platform and interactive roadmap built with React, Vite, and Tailwind CSS. It provides a structured curriculum from programming fundamentals through modern ML and generative AI, with lesson views, checkpoints, interactive visualizations, quizzes, and progress tracking.

## Features

- Structured roadmap and stage pages with progress tracking
- Lesson views with KaTeX-rendered math
- Checkpoints and quizzes for mastery checks
- Projects directory with example projects and detail pages
- Interactive visualizations (e.g., gradient descent, neural networks)
- Global search and modal results
- Lightweight Redux store for progress and UI state

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- React Router

## Quickstart

Prerequisites: Node.js 18+ and npm (or yarn/pnpm).

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Linting:

```bash
npm run lint
```

## Project Structure (high level)

- `src/` — application source
  - `components/` — UI components and feature groups (lesson, roadmap, project, search)
  - `pages/` — route pages such as `HomePage`, `LessonViewPage`, `RoadmapPage`
  - `store/` — Redux slices and persistence middleware
  - `utils/` — helpers (scoring, progress, unlock rules)
  - `visualizations/` — interactive learning visualizations

## Notes for Contributors

- Follow existing component patterns and Tailwind utility usage.
- Keep the roadmap data in `src/data/` and add new stages consistently.
- If adding visualizations, prefer small, focused React components under `visualizations/`.

If you want, I can also add a `CONTRIBUTING.md` or a license file.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
