# Quick Start Checklist

This short checklist is intended to help teammates launch the updated project quickly after pulling the latest code.

| Component | What to Do |
|---|---|
| Frontend | Run `npm install` in `frontend`, then use `npm run start` |
| Auth service | Run `npm install` in `services/auth-service`, then start the service with `JWT_SECRET=dev-secret node server.js` |
| Community service | Run `npm install` in `services/community-service`, then start the service with `JWT_SECRET=dev-secret node server.js` |
| Business-events service | Run `npm install` in `services/business-events-service`, then start the service with `JWT_SECRET=dev-secret node server.js` |
| AI service | Start `services/ai-service` with `node server.js` |
| Gateway | Start `gateway` with the four service URLs configured in the environment |

The updated backend services can now fall back to in-memory MongoDB when a local MongoDB instance is unavailable, which should make development startup easier.
