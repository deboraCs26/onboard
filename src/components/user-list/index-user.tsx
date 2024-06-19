import React from 'react';
import { useGetUsers } from '../../domain/users/index-get-users';
import { UserListPage } from '.';
import { H1 } from '../typography.ts/h1';

export const UsersPage = () => {
  const token = localStorage.getItem('token') || undefined;
  const { loading, error, data } = useGetUsers({ token });

  const userData = data ?? { users: { nodes: [] } };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <H1>Lista de usuários</H1>
      {userData?.users?.nodes?.length > 0 &&
        userData.users.nodes.map((user) => (
          <UserListPage key={user.id} userName={user.name} userEmail={user.email} userId={user.id} />
        ))}
    </div>
  );
};
