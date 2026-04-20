import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use('/graphql', expressMiddleware(server));

app.get('/', (req, res) => {
  res.send('AI service is running');
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI service running on port ${PORT}`);
});