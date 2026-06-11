# MySoulTrip 🏔️

Travel website for **MySoulTrip** — *Travel. Explore. Remember.*
A React (Vite + Tailwind CSS v4) frontend with a Node.js / Express backend, featuring a
home page built around real Himalayan / Uttarakhand travel photos.

## Stack

| Layer    | Tech                                      |
| -------- | ----------------------------------------- |
| Frontend | React 18, Vite 6, Tailwind CSS v4         |
| Backend  | Node.js, Express 4                        |
| Images   | Your real photos in `client/public/images`|

## Project structure

```
MySoulTrip/
├── client/                 # React + Vite + Tailwind frontend
│   ├── public/images/      # Your real travel photos & videos
│   └── src/
│       ├── components/      # Navbar, Hero, SearchBar, Packages, …
│       ├── data/fallback.js # Used when the API is offline
│       └── App.jsx
├── server/                 # Express API (destinations, packages, leads)
│   ├── data.js
│   └── index.js
├── ImgVideo/               # Original source media (kept as-is)
└── package.json            # Root scripts to run both apps
```

## Getting started

Install everything (root + client + server):

```bash
npm run install:all
```

Run frontend **and** backend together:

```bash
npm run dev
```

- Frontend → http://localhost:5173
- Backend  → http://localhost:5000

Or run them separately:

```bash
npm run client   # Vite dev server
npm run server   # Express API
```

The Vite dev server proxies `/api/*` to the Express backend, so the page works
out of the box. If the backend is down, the UI still renders using
`client/src/data/fallback.js`.

## API endpoints

| Method | Path                | Purpose                          |
| ------ | ------------------- | -------------------------------- |
| GET    | `/api/home`         | All home-page data in one call   |
| GET    | `/api/destinations` | Top destinations                 |
| GET    | `/api/packages`     | Tour packages                    |
| GET    | `/api/testimonials` | Traveler reviews                 |
| POST   | `/api/search`       | Package search query             |
| POST   | `/api/plan-trip`    | "Plan Your Trip" enquiry/lead    |
| POST   | `/api/subscribe`    | Newsletter signup                |

## Using your own images

Drop new photos into `client/public/images/` and update the `image` paths in
`server/data.js` (and `client/src/data/fallback.js` for the offline fallback).

## Production build

```bash
npm run build       # outputs client/dist
```
