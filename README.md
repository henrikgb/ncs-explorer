# NCS Explorer

NCS Explorer is a web app for exploring oil and gas industry data from the Norwegian Continental Shelf. It fetches data from [Sodir](https://www.sodir.no/) (the Norwegian Offshore Directorate) — covering things like fields, wells, and licenses on the shelf — and presents it through a browsable frontend.

## Status

The project is under active development. The frontend/backend plumbing (API client, data fetching, layout, styling) is currently being built and verified against [DummyJSON](https://dummyjson.com/) as a stand-in data source, before being pointed at the real Sodir API.

## Architecture

The project is split into two independent apps:

- **`backend/`** — a Node.js/Express BFF (backend-for-frontend). It proxies external APIs (Sodir, and DummyJSON as a placeholder) and reshapes their responses into the domain models the frontend consumes, rather than exposing raw third-party payloads directly to the browser.
- **`frontend/`** — a React + TypeScript app (Vite, TanStack Query, Tailwind CSS) that calls the backend and renders the data.

See [`CLAUDE.md`](./CLAUDE.md) for a more detailed breakdown of the code layout and conventions.

## Getting started

Both apps run independently and need to be started separately.

### Backend

```bash
cd backend
npm install
npm run dev   # http://localhost:3000
```

Configuration is read from `backend/.env`:

| Variable             | Description                                  | Default                       |
| -------------------- | --------------------------------------------- | ------------------------------ |
| `PORT`                | Port the backend listens on                  | `3000`                        |
| `CORS_ORIGIN`         | Origin allowed to call the backend            | `http://localhost:5173`       |
| `DUMMYJSON_BASE_URL`  | Base URL for the placeholder DummyJSON API    | `https://dummyjson.com`       |
| `SODIR_BASE_URL`      | Base URL for the Sodir data API               | Sodir's FactMaps REST service |

### Frontend

```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

Configuration is read from `frontend/.env.development`:

| Variable              | Description                    | Default                 |
| --------------------- | ------------------------------- | ------------------------ |
| `VITE_API_BASE_URL`   | Base URL of the backend BFF     | `http://localhost:3000` |

The frontend expects the backend to be running to load any data.
