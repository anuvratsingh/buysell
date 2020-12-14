import { buildSchema } from 'type-graphql';
import { MeResolver } from '../reslover/me';
import { UserResolver } from '../reslover/user';
import { GraphQLSchema } from 'graphql';

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [MeResolver, UserResolver],
    validate: false,
    dateScalarMode: 'timestamp',
  });
