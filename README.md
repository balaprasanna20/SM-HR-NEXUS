# SM Group - Corporate Website

A premium, production-quality corporate landing portal built for **SM Group Private Limited** using React, Vite, Tailwind CSS, Framer Motion, and React Icons.

This project represents a modern, frontend-only corporate solution tailored for professional services firms (covering accounting, HR, IT systems, and advisory clusters).

## Features

- **Dynamic SEO Optimization:** Dedicated route titles and meta updates on page navigation.
- **Glassmorphic Navigation:** Responsive header with adaptive scroll states and mobile drawer.
- **Vibrant Color Palette:** Premium dark charcoal and navy base highlighted with electric cyan and warm gold accents.
- **Case Studies Portfolio:** Interactive projects list with category-based filtering and detail modal overlays.
- **Form Validation & Action Routing:** Contacts form validated on client-side, redirecting queries straight to corporate WhatsApp channels on submission.
- **Entrance Loading Animation:** Smooth custom-built page entrance spinner to match premium standards.
- **WhatsApp Support:** Constant floating button with animated helper messages.

---

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS + PostCSS
- **Iconography:** React Icons (`fi`, `fa` suites)
- **Animations:** Framer Motion
- **Routing:** React Router (version 6+)

---

## Setup & Local Run

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v16.x or newer) installed.

### 1. Install dependencies

Clone the project, change directory to the folder, and run:

```bash
npm install
```

### 2. Run local dev server

To spin up the local development preview:

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

### 3. Compile for production

To build static deploy-ready bundles under the `dist/` directory:

```bash
npm run build
```

You can preview the production bundle locally:

```bash
npm run preview
```

---

## Vercel Deployment

This project is configured as a standard React Vite app, fully compatible with Vercel single-click deployments.

### Option A: Via Vercel CLI

Install the CLI and push directly:

```bash
npm install -g vercel
vercel
```

### Option B: Via Vercel Dashboard

1. Push this codebase to a git repository (GitHub, GitLab, or Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New Project**.
3. Import your repository.
4. Select the default **Vite** framework preset.
5. Click **Deploy**. Vercel will automatically run `npm run build` and serve the static files.
