import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
