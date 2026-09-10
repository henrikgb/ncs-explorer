# NCS Explorer — backend

Node.js/Express BFF (backend-for-frontend) for NCS Explorer. See the [root README](../README.md) for what the project does, and [`CLAUDE.md`](../CLAUDE.md) for architecture/conventions.

## Scripts

- `npm run dev` — start with nodemon (auto-restart)
- `npm start` — start with plain node

## Configuration

Read from `backend/.env`:

| Variable             | Description                                | Default                       |
| --------------------- | ------------------------------------------- | ------------------------------ |
| `PORT`                | Port the backend listens on                 | `3000`                        |
| `CORS_ORIGIN`         | Origin allowed to call the backend          | `http://localhost:5173`       |
| `DUMMYJSON_BASE_URL`  | Base URL for the placeholder DummyJSON API  | `https://dummyjson.com`       |
| `SODIR_BASE_URL`      | Base URL for the Sodir data API             | Sodir's FactMaps REST service |
