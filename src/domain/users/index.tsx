import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($data: PageInput) {
    users(data: $data) {
      nodes {
        id
        email
        name
      }
    }
  }
`;

export interface UserNode {
  id: string;
  name: string;
  email: string;
}

export interface UsersData {
  users: {
    nodes: UserNode[];
  };
}
