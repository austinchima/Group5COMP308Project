# Team Update Message

I updated the repo so the project is closer to a real end-to-end demo.

Auth is now connected to the GraphQL backend, the community feed loads real posts, post creation and comments go through the backend, and the gateway now forwards auth correctly to downstream services.

I also added an in-memory MongoDB fallback so the auth, community, and business-events services can start even if a local MongoDB server is not running.

Before testing, please run `npm install` inside these three folders:

- `services/auth-service`
- `services/community-service`
- `services/business-events-service`

Then start the backend services, gateway, and frontend as usual. I also added a smoke test plus validation notes in the repo:

- `scripts/graphql_smoke_test.py`
- `validation/graphql_smoke_result.json`
- `MANUS_UPDATE_REPORT.md`
- `runtime_validation_notes.md`
