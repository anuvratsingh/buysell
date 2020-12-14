import { Query, Resolver } from 'type-graphql';

@Resolver()
export class MeResolver {
  @Query(() => String)
  me(): string {
    return 'graphql is running';
  }
}
