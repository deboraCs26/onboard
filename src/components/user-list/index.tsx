import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  userName?: string;
  userEmail?: string;
  userId?: string;
}

export const UserListPage = ({ userName, userEmail, userId }: UserProps) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (userId) {
      navigate(`/usersList/${userId}`);
    }
  };

  return (
    <div key={userId} onClick={handleUserClick} style={{ cursor: 'pointer' }}>
      <h3>{userName}</h3>
      <label>{userEmail}</label>
    </div>
  );
};
