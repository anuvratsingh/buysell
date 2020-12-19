import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Query = {
  __typename?: 'Query';
  me: Scalars['String'];
  allUser: Array<User>;
  helloItem: Scalars['String'];
  allItems: Array<Item>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};


export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  name: Scalars['String'];
  category: Scalars['String'];
  subCategory: Scalars['String'];
  price: Scalars['Float'];
  negotiable: Scalars['Boolean'];
  email: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserResponse;
  login: LoginUserResponse;
  logout: Scalars['Boolean'];
  confirmUser: Scalars['Boolean'];
  forgetPassword: Scalars['Boolean'];
  changePassword?: Maybe<User>;
  addItem: Item;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationAddItemArgs = {
  price: Scalars['Float'];
  category: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  errors?: Maybe<Array<UserFieldError>>;
  user?: Maybe<User>;
};

export type UserFieldError = {
  __typename?: 'UserFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  errors?: Maybe<Array<LoginFieldError>>;
  user?: Maybe<User>;
};

export type LoginFieldError = {
  __typename?: 'LoginFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'CreateUserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'UserFieldError' }
      & Pick<UserFieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'email' | 'createdAt'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginUserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'LoginFieldError' }
      & Pick<LoginFieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'createdAt' | 'firstName'>
    )> }
  ) }
);


export const CreateUserDocument = gql`
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

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const LoginDocument = gql`
    mutation login($input: LoginUserInput!) {
  login(loginUserInput: $input) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      firstName
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};