import { gCall } from '../../test-utils/gCall';
import { testConn } from '../../test-utils/testConn';
import { Connection } from 'typeorm';
// import { CreateUserDocument } from '@buysell/common';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  conn.close;
});

const createUserMutation = `
mutation createUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    errors {
      field
      message
    }
    user {
      id
      firstName
      email
      createdAt
    }
  }
}
`;

describe('UserResolver', () => {
  it('create user', async () => {
    console.log(
      await gCall({
        source: createUserMutation,
        variableValues: {
          input: {
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'test@Email.com',
            password: 'testPassword',
          },
        },
      })
    );
  });
});
