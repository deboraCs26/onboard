import React from 'react';
import { UsersPage } from '../../../components/user-list/index-user';
import { UserList } from '../../../components/add-user/button-add-user';

export function HomePage() {
  return (
    <div>
      <div>
        <UsersPage />
      </div>
      <div>
        <UserList />
      </div>
    </div>
  );
}
