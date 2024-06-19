import React from 'react';

interface User {
  name: string;
  email: string;
}

export const UserList = () => {
  const users: User[] = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { name: 'Bob Brown', email: 'bob.brown@example.com' },
  ];

  const itemStyle: React.CSSProperties = {
    width: '30%',
    flexDirection: 'column',
    padding: '10px',
  };

  const userItemStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    marginBottom: '10px',
    padding: '10px',
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul style={itemStyle}>
        {users.map((user, id) => (
          <li key={id} style={userItemStyle}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
