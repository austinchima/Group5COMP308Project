# Link to Live Website — https://the-commons-shell.vercel.app/

# The Commons — Community Engagement Platform

> AI-driven micro-frontend web app connecting neighborhoods through local news, events, mutual help, and business support.

Built for **COMP 308 — Emerging Web Technologies** (Group 5).

---

## Architecture

This project uses a **Micro-Frontend (MFE)** and **Microservices** architecture. The UI is composed at runtime using [Vite Module Federation](https://github.com/nicolo-ribaudo/vite-plugin-federation), while the backend consists of independent GraphQL services orchestrated by a Gateway.

### Frontend MFEs
| Package          | Port | Role                                   | Exposes                    |
| ---------------- | ---- | -------------------------------------- | -------------------------- |
| `shell/`         | 5173 | **Host** — Layout, routing, auth guard | —                          |
| `mfe-auth/`      | 5174 | Authentication & User Management       | `Auth`, `Profile`          |
| `mfe-community/` | 5175 | Community & Business Engagement        | `Feed`, `Help`, `Business` |
| `mfe-events/`    | 5176 | Events & Administration                | `Events`                   |

### Backend Services
| Service           | Role                                           | Database        |
| ----------------- | ---------------------------------------------- | --------------- |
| `gateway/`        | **Unified API** — GraphQL Schema Stitching     | —               |
| `auth-service/`   | JWT generation, user registration, role RBAC   | MongoDB (Auth)  |
| `community-srv/`  | Social Feed, Help Hub, Notifications, Likes    | MongoDB (Comm)  |
| `business-srv/`   | Business listings, Events, Volunteering        | MongoDB (Biz)   |
| `ai-service/`     | Google Gemini integration (Summaries, Timing)  | —               |

---

## Tech Stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| **Framework**     | React 19                                    |
| **Bundler**       | Vite 6                                      |
| **Module Fed.**   | `@originjs/vite-plugin-federation`          |
| **Styling**       | Tailwind CSS v4 (Material 3 tokens)         |
| **Animation**     | Motion (Framer Motion)                      |
| **Icons/Fonts**   | Material Symbols + Manrope                  |
| **GraphQL**       | Apollo Client & Apollo Server (v5)          |
| **Database**      | MongoDB (Mongoose ODM)                      |
| **AI**            | Google Gemini 3 Flash Preview                     |
| **DevOps**        | GitHub Actions (CI/CD) + Google Cloud Run   |

---

## Features

### ✅ Fully Implemented (Full Stack)

| Feature               | Details                                                                    |
| --------------------- | -------------------------------------------------------------------------- |
| **Unified Auth**      | JWT-based login/register across all MFEs with Role-Based Access (RBAC)     |
| **Social Feed**       | Community posts with **AI-generated summaries**, likes, and comments       |
| **Neighborhood Help** | Help requests with persistence, urgency levels, and **Offer Help** actions |
| **Notification Hub**  | Global news/alert system; notifications for likes, comments, and volunteers |
| **Event Hub**         | Event creation with **AI Timing suggestions** and volunteer rosters        |
| **Emergency Alerts**  | High-priority safety broadcasts with location-based triggers               |
| **Local Hero AI**     | Automated matching between resident skills and community help requests     |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (npm workspaces required)
- **MongoDB** (Atlas or Local)

### Install

```bash
cd frontend
npm install
```

### Run (Full Stack Local)

To run the entire ecosystem locally:
1. Ensure all `.env` files are configured (see below).
2. Start the backend services (Gateway + Microservices).
3. Start the frontend:
   ```bash
   cd frontend
   npm run start
   ```

Open **http://localhost:5173** in your browser.

---

## Environment Variables

### Frontend (`frontend/shell/.env`)
```env
VITE_GATEWAY_URL=http://localhost:4000/graphql
VITE_MFE_AUTH_URL=http://localhost:5174/assets/remoteEntry.js
VITE_MFE_COMMUNITY_URL=http://localhost:5175/assets/remoteEntry.js
VITE_MFE_EVENTS_URL=http://localhost:5176/assets/remoteEntry.js
```

### Backend Services
| Service | File | Required Keys |
| :--- | :--- | :--- |
| **Gateway** | `gateway/.env` | `AUTH_SERVICE_URL`, `COMMUNITY_SERVICE_URL`, etc. |
| **AI Service** | `services/ai-service/.env` | `GEMINI_API_KEY` |
| **Microservices** | `services/.../.env` | `MONGO_URI`, `JWT_SECRET` |

---

## Production Setup

### 1. Backend (Google Cloud Run)
The included GitHub Action (`.github/workflows/deploy-backend.yml`) automatically builds and deploys all 5 services to Google Cloud Run on every push to `main`.

### 2. Frontend (Vercel)
Deploy the `shell` and remotes individually to Vercel. Ensure the `shell` environment variables point to the production Vercel URLs of the remotes.

---

## Team

**Group 5** — COMP 308 W25, Centennial College
