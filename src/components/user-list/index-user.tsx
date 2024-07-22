import React, { useState, useEffect } from 'react';
import { useGetUsers } from '../../domain/users/index-get-users';
import { UserListPage } from '.';
import { Button } from '../button';
import { H1 } from '../../utils/typography/Heading1/style';

const styleButtonPagination = {
  width: '30%',
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '20px',
};
const stylePage: React.CSSProperties = {
  padding: '12px',
  textAlign: 'center',
};

export const UsersPage = () => {
  const perPage = 5;
  const [page, setPage] = useState<number>(1);
  const token = localStorage.getItem('token') || undefined;
  const { loading, error, data, loadMore } = useGetUsers({ token, perPage });

  useEffect(() => {
    const offset = (page - 1) * perPage;
    loadMore(offset);
  }, [page, perPage, loadMore]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && data.users.pageInfo.hasNextPage) {
      setPage(page + 1);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <H1>Lista de usuários</H1>
      {data &&
        data.users.nodes.map((user) => (
          <UserListPage key={user.id} userName={user.name} userEmail={user.email} userId={user.id} />
        ))}
      <div style={styleButtonPagination}>
        <Button onClick={handlePreviousPage} disabled={page <= 1}>
          Anterior
        </Button>
        <div style={stylePage}>Página {page}</div>
        <Button onClick={handleNextPage} disabled={!data?.users.pageInfo.hasNextPage}>
          Próximo
        </Button>
      </div>
    </div>
  );
};
