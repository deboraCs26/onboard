import React, { useState, useEffect } from 'react';
import { useGetUsers } from '../../domain/users/index-get-users';
import { UserList } from './index-user';
import { H1 } from '../typography.ts/h1';
import { UserNode } from '../../domain/users';

export const UsersPage = () => {
  const [users, setUsers] = useState<UserNode[]>([]);
  const token = localStorage.getItem('token') || undefined;
  const { loading, error, data } = useGetUsers({ token });

  useEffect(() => {
    if (data && data.users && data.users.nodes) {
      setUsers(data.users.nodes);
    }
  }, [data]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <H1>Lista de usuários</H1>
        {users.map((user) => (
          <UserList key={user.id} userName={user.name} userEmail={user.email} userId={user.id} />
        ))}
      </div>
    </>
  );
};
