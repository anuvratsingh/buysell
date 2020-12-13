import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { MeResolver } from './reslover/me';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Server started at http://localhost:4000/graphql`);
  });
};

main().catch((err) => {
  console.log(err);
});
