# Group 5 COMP308 Project Update Report

**Author:** Manus AI  
**Repository:** `Group5COMP308Project`  
**Branch:** `main`

## Executive Summary

I updated the project in a way that improves both the **frontend realism** and the **backend runnability**. The most important result is that the project now has a clearer end-to-end slice for demonstration: the authentication screen uses the live GraphQL backend, the community feed can load and submit real posts, comments are persisted through the backend, and the gateway now forwards authorization correctly to downstream services.

In parallel, I added an **in-memory MongoDB fallback** for the backend services that depend on MongoDB. This means the auth, community, and business-events services can now start even when a local MongoDB instance is not available, which makes the system much easier to demonstrate in development and in the sandbox.

## What I Changed

| Area | Files Updated | What Was Improved | Why It Matters |
|---|---|---|---|
| Authentication frontend | `frontend/mfe-auth/src/components/Auth.tsx` | Replaced mock-only auth flow with live GraphQL login and registration requests to the gateway | The login screen now demonstrates a real backend workflow instead of only local UI state |
| Profile frontend | `frontend/mfe-auth/src/components/Profile.tsx` | Replaced hardcoded mock user data with persisted authenticated user data from local storage, and kept profile edits locally persistent | The profile screen now reflects the signed-in user rather than a placeholder account |
| Community feed frontend | `frontend/mfe-community/src/components/Feed.tsx` | Reworked the feed to query real posts, create new posts, submit comments, and trigger AI summary updates | This creates a visible end-to-end feature path suitable for demo and grading |
| Post creation UI | `frontend/mfe-community/src/components/CreatePostModal.tsx` | Removed fake loading delay and connected submission to real asynchronous backend actions | Post publishing behavior now matches actual application state |
| Comment UI | `frontend/mfe-community/src/components/CommentSection.tsx` | Converted comments from local-only mock state into a controlled component backed by backend mutations | Comments now reflect saved backend data rather than temporary browser state |
| GraphQL gateway | `gateway/server.js` | Added request context plus authorization-header forwarding to downstream stitched services | Authenticated mutations such as `createPost` and `addComment` now work correctly through the gateway |
| Backend database startup | `services/auth-service/config/db.js`, `services/community-service/config/db.js`, `services/business-events-service/config/db.js` | Added automatic fallback from unavailable configured MongoDB URIs to in-memory MongoDB instances | The backend becomes much easier to run for demos and local validation |
| Backend dependencies | `services/*/package.json`, `services/*/package-lock.json` | Added `mongodb-memory-server` in the three Mongo-backed services | The in-memory fallback can now start without manual database installation |
| Validation artifacts | `scripts/graphql_smoke_test.py`, `validation/graphql_smoke_result.json`, `runtime_validation_notes.md` | Added a repeatable smoke test and saved its output | Future debugging and teammate verification become easier |

## Functional Outcome

The updated implementation now supports the following practical flow when the backend stack is running:

| User Flow | Status After Update | Notes |
|---|---|---|
| Register a new user | Working | Verified through the stitched gateway |
| Log in with backend credentials | Implemented in frontend | Uses live GraphQL auth endpoint |
| Load community posts | Working | Verified by query and used in updated feed component |
| Create a post | Working | Verified through authenticated mutation |
| Add a comment | Working | Verified through authenticated mutation |
| Update post summary via AI flow | Working with graceful fallback | In the sandbox run, the summary returned `Summary could not be generated.` when no usable AI response was available |
| Start backend without local MongoDB | Working | Services now fall back to in-memory MongoDB |

## Validation Performed

I validated the project in two layers.

First, I ran the **frontend production build** from the frontend workspace, and the full build completed successfully for the shell and all micro-frontends. This confirms that the updated TypeScript and bundling paths are compiling correctly.

Second, I started the backend services and the gateway, then executed a repeatable GraphQL smoke test through the gateway. That smoke test successfully registered a new user, created a post, updated the post summary field, added a comment, and queried the saved posts back from the system.

| Validation Step | Result | Evidence |
|---|---|---|
| Frontend workspace build | Passed | `npm run build` in `frontend/` completed successfully |
| Auth service startup | Passed | Started with in-memory MongoDB fallback |
| Community service startup | Passed | Started with in-memory MongoDB fallback |
| Business-events service startup | Passed | Started with in-memory MongoDB fallback |
| AI service startup | Passed | Service started normally |
| Gateway startup | Passed | Gateway started on port `4000` |
| End-to-end GraphQL smoke test | Passed | Saved in `validation/graphql_smoke_result.json` |

## Important Limitation Observed

I also attempted a browser-level runtime check of the shell application through the sandbox proxy. The proxy session did not successfully render the live Vite shell UI in the browser during this run. I documented that limitation in `runtime_validation_notes.md`.

This means the **code-level validation is strong**, but the **final visual demo should still be tested once on a normal local machine** or in your team’s own environment before presentation day.

## How Your Team Can Run the Updated Project

Because the backend now supports in-memory MongoDB fallback, the updated stack is easier to boot even if no local MongoDB server is running. The most important requirement is that the three backend services with Mongo support install the new dependency first.

| Step | Command |
|---|---|
| Install frontend dependencies | `cd frontend && npm install` |
| Install auth-service dependencies | `cd services/auth-service && npm install` |
| Install community-service dependencies | `cd services/community-service && npm install` |
| Install business-events-service dependencies | `cd services/business-events-service && npm install` |
| Start auth service | `cd services/auth-service && JWT_SECRET=dev-secret node server.js` |
| Start community service | `cd services/community-service && JWT_SECRET=dev-secret node server.js` |
| Start business-events service | `cd services/business-events-service && JWT_SECRET=dev-secret node server.js` |
| Start AI service | `cd services/ai-service && node server.js` |
| Start gateway | `cd gateway && AUTH_SERVICE_URL=http://127.0.0.1:5001/graphql COMMUNITY_SERVICE_URL=http://127.0.0.1:5002/graphql BUSINESS_EVENTS_SERVICE_URL=http://127.0.0.1:5003/graphql AI_SERVICE_URL=http://127.0.0.1:5004/graphql node server.js` |
| Start frontend | `cd frontend && npm run start` |

## Best Talking Points for the Presentation

For presentation purposes, the strongest story is no longer just that the UI looks polished. The stronger message is that at least one cross-service slice now behaves like a real product.

> The authentication flow is connected to the backend, the community feed reads real GraphQL data, authenticated users can publish posts and comments, and the gateway correctly forwards credentials to the downstream services.

That is a much better engineering narrative than presenting only mock cards and local component state.

## Recommended Next Steps for Teammates

| Priority | Recommended Follow-up | Reason |
|---|---|---|
| High | Pull the latest code and run `npm install` in the three updated backend services | Needed because of the new in-memory MongoDB dependency |
| High | Do one local visual QA pass of login, feed loading, post creation, and comments | Confirms the UI behaves correctly outside the sandbox proxy |
| Medium | Add a proper backend profile update mutation | The profile page now uses real session data, but profile editing is still local-only |
| Medium | Replace AI fallback behavior with a confirmed working API key path for the final demo | This would improve the summary experience during presentation |
| Medium | Extend the same backend integration style into Help, Events, or Business modules | That would make the overall platform feel more complete |

## Suggested Message to Teammates

You can paste the following into your group chat after the changes are pushed:

> I updated the repo so the project is closer to a real end-to-end demo. Auth is now connected to the GraphQL backend, the community feed loads real posts, post creation and comments go through the backend, and the gateway now forwards auth correctly. I also added an in-memory MongoDB fallback so auth, community, and business-events services can start without a local MongoDB server. Before running, please do `npm install` inside `services/auth-service`, `services/community-service`, and `services/business-events-service`, then start the services and the frontend as usual. I also added a smoke test and validation notes in the repo.

## Files Added for Handoff

| File | Purpose |
|---|---|
| `MANUS_UPDATE_REPORT.md` | Main report of changes and handoff summary |
| `scripts/graphql_smoke_test.py` | Repeatable gateway smoke test |
| `validation/graphql_smoke_result.json` | Saved successful smoke test output |
| `runtime_validation_notes.md` | Notes about the sandbox browser verification limitation |

## Conclusion

This update makes the project materially stronger for grading because it reduces reliance on mock data and improves the reliability of local startup. The most valuable improvement is that the team now has a demonstrable live path from **authentication** to **authorized community interaction** through the **stitched GraphQL gateway**.
