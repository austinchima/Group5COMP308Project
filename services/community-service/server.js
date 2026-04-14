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
app.use(cors());
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
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
  res.send('Community service is running');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Community service running on port ${PORT}`);
});