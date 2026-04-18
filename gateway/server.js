import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { stitchSchemas } from '@graphql-tools/stitch';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

const serviceUrls = {
  auth: process.env.AUTH_SERVICE_URL,
  community: process.env.COMMUNITY_SERVICE_URL,
  businessEvents: process.env.BUSINESS_EVENTS_SERVICE_URL,
  ai: process.env.AI_SERVICE_URL,
};

async function makeSubschema(endpoint) {
  const rawExecutor = buildHTTPExecutor({
    endpoint,
  });

  return {
    schema: await schemaFromExecutor(rawExecutor),
    executor: (request) =>
      rawExecutor({
        ...request,
        extensions: {
          ...(request.extensions ?? {}),
          headers: {
            ...(request.extensions?.headers ?? {}),
            ...(request.context?.authorization
              ? { authorization: request.context.authorization }
              : {}),
          },
        },
      }),
  };
}

async function startGateway() {
  try {
    const authSubschema = await makeSubschema(serviceUrls.auth);
    const communitySubschema = await makeSubschema(serviceUrls.community);
    const businessSubschema = await makeSubschema(serviceUrls.businessEvents);
    const aiSubschema = await makeSubschema(serviceUrls.ai);

    const gatewaySchema = stitchSchemas({
      subschemas: [authSubschema, communitySubschema, businessSubschema, aiSubschema],
    });

    const server = new ApolloServer({
      schema: gatewaySchema,
    });

    await server.start();

    app.get('/', (req, res) => {
      res.json({
        message: 'Community AI Gateway is running',
        graphql: `http://localhost:${PORT}/graphql`,
        services: serviceUrls,
      });
    });

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => ({
          authorization: req.headers.authorization || '',
        }),
      }),
    );

    app.listen(PORT, () => {
      console.log(`Gateway running on port ${PORT}`);
      console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Gateway error:', error);
  }
}

startGateway();
