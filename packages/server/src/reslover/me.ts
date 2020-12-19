import { Query, Resolver } from 'type-graphql';
import 'reflect-metadata'
@Resolver()
export class MeResolver {
  @Query(() => String)
  me(): string {
    return 'graphql is running';
  }
}
