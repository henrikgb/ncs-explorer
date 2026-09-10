# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

NCS Explorer is a two-app project (separate `frontend` and `backend` directories, no shared root package.json/workspace config) for exploring oil and gas data from the Norwegian Continental Shelf. The backend is a BFF (backend-for-frontend) that proxies and reshapes data from external APIs; the frontend consumes it. The project currently wires up a DummyJSON integration as scaffolding/placeholder for the real data source: SODIR (Norwegian Offshore Directorate, `factmaps.sodir.no`), whose config key already exists in `backend/src/config/index.js` (`sodir.baseUrl`) and an empty `frontend/src/hooks/sodir/` directory is staged for its hooks.

## Commands

Run these from within `frontend/` or `backend/` respectively — there is no root-level script runner.

### Backend (`backend/`)
- `npm run dev` — start with nodemon (auto-restart)
- `npm start` — start with plain node
- No test suite is configured yet (`npm test` is a placeholder that exits non-zero)

### Frontend (`frontend/`)
- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — ESLint over the project
- `npm run format` / `npm run format:check` — Prettier write/check
- `npm run preview` — preview a production build
- No test suite is configured yet

Both apps must be run together for the app to function: the frontend calls the backend at `VITE_API_BASE_URL` (`frontend/.env.development`, default `http://localhost:3000`), and the backend only accepts requests from `CORS_ORIGIN` (`backend/.env`, default `http://localhost:5173`, the Vite dev port).

## Architecture

### Backend — layered Express BFF (CommonJS)
`backend/src/server.js` wires middleware and mounts routers. Each external integration follows the same layering, one folder per concern:
- `routes/` — Express routers, thin, map HTTP verbs+paths to controller functions
- `controllers/` — request/response handling only (status codes, calling services, `next(err)` on failure); no business logic
- `services/` — fetch external APIs and convert raw DTOs to the app's domain shape via a `*DtoToDomain` function (see `dummyjsonServices.js` for the pattern: `productDtoToDomain`, `userDtoToDomain`). This DTO→domain mapping boundary is what the frontend types are shaped around.
- `config/index.js` — the only place that reads `process.env`; all other modules must import config from here rather than reading `process.env` directly
- `middleware/errorHandler.js` — `notFoundHandler` (404 JSON) and `errorHandler` (final error handler; respects `err.status`, set by services when a proxied request fails, e.g. 4xx passed through, 502 otherwise)

When adding a new external data integration (e.g. SODIR), mirror the `dummyjson` slice: a `*Routes.js`, a `*Controller.js`, and a `*Services.js` with its own DTO mapping functions, plus a base URL under `config/index.js`.

### Frontend — React 19 + Vite + TypeScript, TanStack Query, Tailwind v4
- `api/<source>/` — one folder per external data source proxied by the backend (e.g. `api/dummyjson/`). Contains `types.ts` (domain types matching the backend's DTO→domain output) and one file per resource with thin functions that call `apiClient` (`api/client.ts`, an Axios instance pointed at `VITE_API_BASE_URL`) against the backend's `/api/<source>/...` routes — never call external APIs directly from the frontend.
- `hooks/<source>/` — one `useX` hook per resource, wrapping the `api/<source>/` functions in `useQuery`. Note `useProducts` is `enabled: false` by default (fetched on demand via the "Load Products" button, not on mount) — check a hook's `enabled` before assuming it fetches automatically. `useClearProducts` shows the pattern for manually seeding query cache via `queryClient.setQueryData` instead of a mutation.
- `components/` — shared UI primitives (e.g. `Button.tsx`), styled with Tailwind utility classes, no CSS modules
- `main.tsx` sets up the single global `QueryClient`/`QueryClientProvider`

When adding a new data source, mirror the `dummyjson` slice under both `api/` and `hooks/`.

### Code style
- Prettier config (`frontend/.prettierrc`): 2-space indent, single quotes, no semicolons, trailing commas everywhere. Run `npm run format` in `frontend/` before committing; backend has no Prettier config configured yet.
- Backend uses CommonJS (`require`/`module.exports`); frontend uses ES modules/TypeScript.

## Git workflow
Use the project skills `/create-commit` and `/pr-description` for Git commits and pull request descriptions.