import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import connectDB from './config/db.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { getUserFromToken } from './middleware/auth.js';

dotenv.config();
await connectDB();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5176', 'http://localhost:5173'],
    credentials: true
  })
);

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      const user = getUserFromToken(token);
      return { user };
    }
  })
);

app.get('/', (req, res) => {
  res.send('Business Events service is running');
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Business Events service running on port ${PORT}`);
});