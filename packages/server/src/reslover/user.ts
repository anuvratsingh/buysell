import argon2 from 'argon2';
import { redis } from '../utils/redis';
import {
  confirmUserPrefix,
  forgotPasswordPrefix,
} from '../utils/redisPrefixes';
import { Context } from '../utils/types';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { CreateUserInput } from './input/CreateUserinput';
import { LoginUserInput } from './input/LoginUserInput';
import { CreateUserResponse } from './response/CreateUserResponse';
import { LoginUserResponse } from './response/LoginUserResponse';
import { valCreateUserInput } from './validate/valCreateUserInput';
import { valLoginUserInput } from './validate/valLoginUserinput';
import { sendEmail } from '../utils/sendEmail';
import { createValUserUrl } from '../utils/createValUserUrl';
import { v4 } from 'uuid';

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

    await sendEmail(
      user.email,
      await createValUserUrl(user.id),
      'User Confirmation'
    );

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

    const valid = await argon2.verify(user.password, loginUserInput.password);
    console.log(valid);
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

  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { verified: true });

    await redis.del(token);

    return true;
  }

  @Mutation(() => Boolean)
  async forgetPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24);

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`,
      'Forget Password'
    );

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Ctx() { req }: Context
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await argon2.hash(password);

    await user.save();

    req.session.userId = user.id;

    return user;
  }
}
