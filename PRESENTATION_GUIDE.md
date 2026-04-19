# 🏙️ The Commons — Presentation Guide

> **Vibrant Community Engagement through AI & Micro-Frontends**
> Built by Group 5 | COMP 308 — Strategic Emerging Web Technologies

---

## 🎯 Project Vision

**The Commons** is a decentralized community platform designed to bridge the gap between neighbors, local organizers, and small businesses. Unlike traditional social media, it focuses on **actionable engagement**: volunteering for events, supporting local shops, and neighborhood mutual aid.

---

## 🏗️ Architecture: Micro-Frontends (MFE)

We utilized a **Module Federation** architecture to ensure the application is scalable and team-resilient.

- **Host (Shell):** Orchestrates routing, navigation, and Auth-Guards.
- **MFE-Auth:** Handles secure JWT-based identity across the entire ecosystem.
- **MFE-Community:** Manages the social fabric (Feed, Help Requests, Business Support).
- **MFE-Events:** Dedicated hub for organizers with AI-driven scheduling.
- **Benefits:** Independent deployments, technology flexibility, and isolation of runtime errors.

---

## 🧠 AI Features (Google Gemini Integration)

AI isn't just a gimmick here; it drives efficiency:

- **Feed Summaries:** Gemini analyzes long community discussions to provide 1-sentence "TL;DR" summaries, keeping busy residents informed.
- **Sentiment Analysis:** Automatically detects the "vibe" of local business reviews to help owners respond effectively.
- **Smart Timing:** Suggests the best times for community events based on category and description.
- **Volunteer Matching:** (Planned) High-precision matching of residents to help requests based on stated interests.

---

## 🔒 Security & Role-Based Access (RBAC)

The platform transforms based on who is logged in:

- **Residents:** Access the "Community Events Hub" to browse and **Volunteer** for local initiatives.
- **Community Organizers:** Access the "Organizer Hub" to create events, manage volunteers, and **Edit** their published events.
- **Backend Verification:** Every mutation (Edit/Delete) is verified at the database level—only the original author can modify content.

---

## 🚀 Key Technical Achievements

1. **Dynamic state management:** Instant UI updates (Edit Post, Volunteering) without page reloads.
2. **Context-Free MFE Communication:** Solved complex Module Federation context crashes by implementing a native `fetch`-based GraphQL bridge that remains stable regardless of host configuration.
3. **Responsive Glassmorphism:** A premium Material 3 design system using Tailwind CSS v4, built for both mobile and desktop.
4. **JWT Security:** Automatic token cleanup on logout and failsafe mount-clearing to prevent session hijacking.

---

## 📺 Presentation Demo Flow

1. **Landing:** Show the premium entrance and mission statement.
2. **Authentication:** Log in as a **Resident**. Show the "Feed" with AI summaries.
3. **Volunteering:** Navigate to "Events". Note the "Community Events Hub" title. Click **Volunteer** for an event.
4. **Organizer View:** Log out and log in as an **Organizer**. Show the same Events page now billed as "Organizer Hub" with **Create Event** and **Edit** buttons visible.
5. **Real-time Edit:** Edit an event title and show it updating live for all users.

---

## 🔮 Future Roadmap

- **Real-time Chat:** P2P neighborhood messaging via WebSockets.
- **Geofenced Alerts:** Extreme urgency notifications based on resident GPS coordinates.
- **Business Vouchers:** Blockchain-verified local business coupons.

---

**© 2026 Group 5 — Advanced Web Development Team**
