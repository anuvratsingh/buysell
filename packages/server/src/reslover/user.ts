import { User } from '../entity/User';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateUserInput } from './input/CreateUserinput';
import { CreateUserResponse } from './response/CreateUserResponse';
import { valCreateUserInput } from './validate/valCreateUserInput';
import argon2 from 'argon2';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async allUser(): Promise<User[]> {
    return User.find({});
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Arg('createUserInput') createUserInput: CreateUserInput
  ): Promise<CreateUserResponse> {
    const errors = valCreateUserInput(createUserInput);
    if (errors) {
      return { errors };
    }

    console.log(User.find({ where: { email: createUserInput.email } }));
    if (User.find({ where: { email: createUserInput.email } })) {
      return {
        errors: [{ field: 'email', message: 'Account already exists' }],
      };
    }

    const hash = await argon2.hash(createUserInput.password);

    const user = await User.create({
      password: hash,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
      email: createUserInput.email,
    }).save();

    console.log(user);
    return { user };
  }
}
