# React Micro Frontend Music Library (Assignment)

This repository contains **two apps**:

- `music-lib/` — Micro frontend that exposes a `MusicLibrary` React component via **Vite Module Federation**.
- `main-app/` — Container app that **dynamically loads** the remote Music Library and adds **mock JWT-based role management** (admin/user).

## Features Implemented
- Music Library with **list, filter, sort, and group-by** (Album / Artist / Title). Uses **map / filter / reduce** explicitly.
- **Micro Frontend Architecture** using Vite + `@originjs/vite-plugin-federation`.
- **Authentication & Role Management** (mock JWT in `localStorage`):
  - `admin`: can add and delete songs.
  - `user`: can only view & filter.
- **State Management** using `useReducer` + Context. No Redux.
- **Lazy loading** of the micro frontend in the container.
- Simple, clean UI with basic CSS.

> Deployment intentionally omitted as requested. This is ready for **local development**.

---

## How to Run Locally

### 1) Install dependencies
Open **two terminals**, one for each app.

**Terminal A (music-lib)**
```bash
cd music-lib
npm install
npm run dev
```
This starts the micro frontend at **http://localhost:5174**.

**Terminal B (main-app)**
```bash
cd main-app
npm install
npm run dev
```
This starts the container at **http://localhost:5173** and will **load the remote** from 5174.

> If ports are busy, you can change them in the `package.json` scripts or run `vite --port <PORT>`.

### 2) Use the App
Open **http://localhost:5173** in your browser.

Login Credentials (Demo)

These are mock credentials.

Admin

Email: admin@demo.com

Password: admin123

User

Email: user@demo.com

Password: user123

---

## Notes
- For TypeScript, we included a declaration file to type the federated import: `src/types/federation.d.ts` in `main-app`.
- The `music-lib` can also be viewed standalone at `http://localhost:5174` for local development convenience.
