import { useQuery } from '@apollo/client';
import { GET_USERS, UsersData } from '../../domain/users';

interface UserQueryOptions {
  token?: string;
}

export const useGetUsers = ({ token }: UserQueryOptions) => {
  const { loading, error, data, refetch } = useQuery<UsersData>(GET_USERS, {
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  return { loading, error, data, refetch };
};
