import { User } from '../../entity/User';
import { Field, ObjectType } from 'type-graphql';
import { LoginFieldError } from '../error/LoginFieldError';

@ObjectType()
export class LoginUserResponse {
  @Field(() => [LoginFieldError], { nullable: true })
  errors?: LoginFieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
