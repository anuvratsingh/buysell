import argon2 from 'argon2';
import { Context } from 'src/utils/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { CreateUserInput } from './input/CreateUserinput';
import { LoginUserInput } from './input/LoginUserInput';
import { CreateUserResponse } from './response/CreateUserResponse';
import { LoginUserResponse } from './response/LoginUserResponse';
import { valCreateUserInput } from './validate/valCreateUserInput';
import { valLoginUserInput } from './validate/valLoginUserinput';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async allUser(): Promise<User[]> {
    return User.find({});
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
    @Arg('createUserInput') createUserInput: CreateUserInput,
    @Ctx() { req }: Context
  ): Promise<CreateUserResponse> {
    const errors = valCreateUserInput(createUserInput);
    if (errors) {
      return { errors };
    }

    if (await User.findOne({ where: { email: createUserInput.email } })) {
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

    // console.log(`User: ${user}`);
    // console.log(`Req: ${req}`);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => LoginUserResponse)
  async login(
    @Arg('loginUserInput') loginUserInput: LoginUserInput,
    @Ctx() { req }: Context
  ): Promise<LoginUserResponse> {
    const errors = valLoginUserInput(loginUserInput);
    if (errors) {
      return { errors };
    }

    const user = await User.findOne({ where: { email: loginUserInput.email } });
    
    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Invalid credentials',
          },
        ],
      };
    }

    const valid = argon2.verify(user.password, loginUserInput.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid credentials',
          },
        ],
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((randomName) =>
      req.session.destroy((err) => {
        res.clearCookie('cookie');
        if (err) {
          console.log(err);
          randomName(false);
          return;
        }
        randomName(true);
      })
    );
  }
}
