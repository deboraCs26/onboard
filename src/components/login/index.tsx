import React from 'react';
import { H1 } from '../typography.ts/h1';
import { Form } from '../form';
import { Button } from '../button/button';
import { Separator } from '../separator';

export const Login = () => {
  const styleContainer = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };
  const styleButton = {
    margin: '16px 0',
  };

  return (
    <div style={styleContainer}>
      <H1>Bem-vindo(a) à TaqTile!</H1>
      <div>
        <Form text="E-mail" />
        <Separator />
        <Form text="Senha" password />
      </div>

      <div style={styleButton}>
        <Button>Entrar</Button>
      </div>
    </div>
  );
};
