# services/auth-service/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Cloud Run uses the PORT environment variable
ENV PORT 8080
EXPOSE 8080

CMD ["node", "server.js"]
