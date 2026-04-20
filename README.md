# The Commons — Community Engagement Platform

> AI-driven micro-frontend web app connecting neighborhoods through local news, events, mutual help, and business support.

Built for **COMP 308 — Emerging Web Technologies** (Group 5).

---

## Architecture

This project uses a **Micro-Frontend (MFE)** architecture powered by [Vite Module Federation](https://github.com/nicolo-ribaudo/vite-plugin-federation). Four independently deployable apps compose the UI at **runtime**:

| Package          | Port | Role                                   | Exposes                    |
| ---------------- | ---- | -------------------------------------- | -------------------------- |
| `shell/`         | 5173 | **Host** — Layout, routing, auth guard | —                          |
| `mfe-auth/`      | 5174 | Authentication & User Management       | `Auth`, `Profile`          |
| `mfe-community/` | 5175 | Community & Business Engagement        | `Feed`, `Help`, `Business` |
| `mfe-events/`    | 5176 | Events & Administration                | `Events`                   |

```
frontend/
├── package.json             # npm workspaces root
├── shell/                   # 🏠 Host app
│   └── src/
│       ├── App.tsx          # React.lazy() imports from remotes
│       ├── components/
│       │   └── Layout.tsx   # Sidebar + TopBar + Mobile Nav
│       └── pages/
│           └── Landing.tsx  # Public landing page
├── mfe-auth/                # 🔐 Auth MFE
│   └── src/components/
│       ├── Auth.tsx         # Login / Register
│       └── Profile.tsx      # Profile view & edit
├── mfe-community/           # 💬 Community MFE
│   └── src/components/
│       ├── Feed.tsx         # News & Discussions + Comments
│       ├── Help.tsx         # Help Requests + Emergency Alerts
│       └── Business.tsx     # Business Listings + Deals + Reviews
└── mfe-events/              # 📅 Events MFE
    └── src/components/
        └── Events.tsx       # Organizer Hub + AI Timing + Volunteers
```

---

## Tech Stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| Framework         | React 19                                    |
| Bundler           | Vite 6                                      |
| Module Federation | `@originjs/vite-plugin-federation`          |
| Styling           | Tailwind CSS v4 (Material 3 design tokens)  |
| Animation         | Motion (Framer Motion)                      |
| Typography        | Manrope + Be Vietnam Pro (Google Fonts)     |
| Icons             | Material Symbols (variable font)            |
| GraphQL Client    | Apollo Client (configured, pending backend) |
| AI                | Google Gemini (pending backend integration) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (npm workspaces required)

### Install

```bash
cd frontend
npm install
```

### Run (one command)

```bash
npm run start
```

This will:

1. **Build** all 3 remote MFEs (`mfe-auth`, `mfe-community`, `mfe-events`)
2. **Serve** each MFE's built assets via `vite preview` on ports 5174–5176
3. **Start** the shell dev server with HMR on port 5173

Open **http://localhost:5173** in your browser.

### Run (step by step)

```bash
# Build remote MFEs
npm run build:remotes

# In separate terminals:
npm run preview -w mfe-auth        # → localhost:5174
npm run preview -w mfe-community   # → localhost:5175
npm run preview -w mfe-events      # → localhost:5176
npm run dev -w shell               # → localhost:5173
```

### Production Build

```bash
npm run build    # Builds all 4 packages
```

---

## Features

### ✅ Implemented (Frontend)

| Feature               | Components                                                                 |
| --------------------- | -------------------------------------------------------------------------- |
| **Auth**              | Login / Register with validation, role selection                           |
| **Community Feed**    | Post creation (News/Discussion), AI summaries, threaded comments           |
| **Neighborhood Help** | Help request creation, category & urgency selectors, AI volunteer matching |
| **Emergency Alerts**  | Alert broadcasting with type, location, and urgency display                |
| **Local Businesses**  | Business listing, deal/promotion creation, review sentiment, owner reply   |
| **Events**            | Event creation, AI timing suggestions, volunteer matching & invite         |
| **Profile**           | View & edit profile, interests, location                                   |

### 🔜 Pending (Backend)

- GraphQL API (Express + Apollo Server)
- MongoDB data persistence
- JWT Authentication
- Google Gemini AI integration (summaries, sentiment, matching)

---

## Scripts Reference

| Script                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm run start`         | Build remotes + launch all 4 servers              |
| `npm run dev`           | Shell dev server only (remotes must be pre-built) |
| `npm run build:remotes` | Build all 3 MFEs                                  |
| `npm run build`         | Full production build (all 4 packages)            |

---

## Environment Variables

Each backend service and the gateway requires a `.env` file for configuration. Templates are provided as `.env.example` in each directory.

### Quick Setup

For each directory containing a `.env.example`, copy it to `.env`:

```bash
# Example for AI Service
cp services/ai-service/.env.example services/ai-service/.env
```

### Required Keys

| Service | File | Key Variables |
| :--- | :--- | :--- |
| **Gateway** | `gateway/.env` | Service URLs, Port (4000) |
| **AI Service** | `services/ai-service/.env` | `GEMINI_API_KEY` |
| **Auth Service** | `services/auth-service/.env` | `MONGO_URI`, `JWT_SECRET` |
| **Business/Events** | `services/business-.../.env` | `MONGO_URI`, `JWT_SECRET` |
| **Community** | `services/community-.../.env` | `MONGO_URI`, `JWT_SECRET` |

> [!TIP]
> Make sure to update the `JWT_SECRET` with a secure random string and provide your own `GEMINI_API_KEY` in the AI service.

---

## Team

**Group 5** — COMP 308 W25, Centennial College
