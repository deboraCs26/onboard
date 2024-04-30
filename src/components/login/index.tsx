import React from 'react';
import { H1 } from '../typography.ts/h1';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { Separator } from '../separator';

export const Login = () => {
  const styleContainer = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  return (
    <div style={styleContainer}>
      <H1>Bem-vindo(a) à TaqTile!</H1>
      <div>
        <Input text="E-mail" />
        <Separator />
        <Input text="Senha" password />
      </div>
      <Separator />
      <div>
        <Button>Entrar</Button>
      </div>
    </div>
  );
};
