import { buildSchema } from 'type-graphql';
import { MeResolver } from '../reslover/me';
import { UserResolver } from '../reslover/user';
import { GraphQLSchema } from 'graphql';
import { ItemResolver } from '../reslover/item';

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [MeResolver, UserResolver, ItemResolver],
    validate: false,
    dateScalarMode: 'timestamp',
  });
