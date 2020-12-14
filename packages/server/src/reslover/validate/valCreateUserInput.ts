import { UserFieldError } from '../error/UserFieldError';
import { CreateUserInput } from '../input/CreateUserinput';

export const valCreateUserInput = (
  input: CreateUserInput
): [UserFieldError] | null => {
  if (input.email.length <= 0) {
    return [
      {
        field: 'email',
        message: 'Enter email',
      },
    ];
  }

  if (input.email.length > 75) {
    return [
      {
        field: 'email',
        message: "Ain't the email too long?",
      },
    ];
  }

  if (input.password.length <= 5) {
    return [
      {
        field: 'password',
        message: 'Stronger password is recommended',
      },
    ];
  }

  if (input.password.length >= 100) {
    return [
      {
        field: 'password',
        message: 'TOO STRONG',
      },
    ];
  }

  if (input.firstName.length <= 2) {
    return [
      {
        field: 'firstName',
        message: 'First name should be greater than 2',
      },
    ];
  }

  if (input.firstName.length >= 50) {
    return [
      {
        field: 'firstName',
        message: 'First name should be greater than 2',
      },
    ];
  }

  if (input.lastName.length <= 2) {
    return [
      {
        field: 'lastName',
        message: 'Last name should be greater than 2',
      },
    ];
  }

  if (input.lastName.length >= 50) {
    return [
      {
        field: 'lastName',
        message: 'Last name should be smaller than 50',
      },
    ];
  }

  return null;
};
