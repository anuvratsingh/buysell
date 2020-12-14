import { User } from '../../entity/User';
import { Field, ObjectType } from 'type-graphql';
import { UserFieldError } from '../error/UserFieldError';

@ObjectType()
export class CreateUserResponse {
  @Field(() => [UserFieldError], { nullable: true })
  errors?: UserFieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
