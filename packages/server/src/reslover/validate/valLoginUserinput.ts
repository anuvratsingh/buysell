import { LoginFieldError } from '../error/LoginFieldError';
import { LoginUserInput } from '../input/LoginUserInput';

export const valLoginUserInput = (
  input: LoginUserInput
): [LoginFieldError] | null => {
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
        message: 'Invalid Email',
      },
    ];
  }
  if (input.password.length > 75) {
    return [
      {
        field: 'password',
        message: 'Enter password',
      },
    ];
  }
  if (input.password.length > 75) {
    return [
      {
        field: 'password',
        message: 'Invalid Password',
      },
    ];
  }

  return null;
};
