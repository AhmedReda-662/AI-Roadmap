# AI Learning Roadmap

A self-taught AI learning platform and interactive roadmap built with React, Vite, and Tailwind CSS. It provides a structured curriculum from programming fundamentals through modern ML and generative AI, with lesson views, checkpoints, interactive visualizations, quizzes, and progress tracking.

## Features

- Structured roadmap and stage pages with progress tracking
- Lesson views with KaTeX-rendered math
- Checkpoints and quizzes for mastery checks
- Projects directory with example projects and detail pages
- Interactive visualizations (e.g., gradient sdescent, neural networks)
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
