import React from 'react';

interface UserProps {
  userName: string;
  userEmail: string;
  userId: string;
}

export const UserListPage = ({ userName, userEmail, userId }: UserProps) => {
  return (
    <div key={userId}>
      <h3>{userName}</h3>
      <label>{userEmail}</label>
    </div>
  );
};
