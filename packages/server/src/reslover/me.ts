import { Query, Resolver } from 'type-graphql';

@Resolver()
export class MeResolver {
  @Query(() => String)
  me() {
    return 'graphql is running';
  }
}
