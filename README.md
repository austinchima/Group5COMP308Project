<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5a7f849c-a928-45c7-9709-91b0a963464b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Create a `.env` file under EACH Service:

1. auth-service .env:
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/auth_db
JWT_SECRET=your_super_long_jwt_secret_key_here_123456789
```

3. community service .env:
```
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/community_db
JWT_SECRET=your_super_long_jwt_secret_key_here_123456789
```

5. business-event-service .env:
```
PORT=5003
MONGO_URI=mongodb://127.0.0.1:27017/business_events_db
JWT_SECRET=your_super_long_jwt_secret_key_here_123456789
```

7. ai-service .env:
```
PORT=5004
GEMINI_API_KEY=your_gemini_api_key_here #Need to get a Real Gemini API Key
```


## A `.env` file under the gateway folder
```
PORT=4000
AUTH_SERVICE_URL=http://localhost:5001/graphql
COMMUNITY_SERVICE_URL=http://localhost:5002/graphql
BUSINESS_EVENTS_SERVICE_URL=http://localhost:5003/graphql
AI_SERVICE_URL=http://localhost:5004/graphql
```
