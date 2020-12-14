import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UserFieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
