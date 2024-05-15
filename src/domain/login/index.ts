import { gql } from '@apollo/client';

export interface LoginInput {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`;

export interface LoginData {
  login: {
    token: string;
  };
}
