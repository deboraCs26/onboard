import React, { useState } from 'react';
import { H1 } from '../typography.ts/h1';
import { Input } from '../input/input';
import { Button } from '../button';
import { Separator } from '../separator';
import { isValidEmail, isValidPassword } from '../../utils/strings-utils';

interface LoginProps {
  onSuccess?: () => void;
}

export const Login = ({ onSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateFields = () => {
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Campo obrigatório.');
    } else if (!isValidEmail(email)) {
      setEmailError('O email informado é inválido.');
    }

    if (!password.trim()) {
      setPasswordError('Campo obrigatório.');
    } else if (password.length < 7) {
      setPasswordError('A senha deve ter pelo menos 7 caracteres.');
    } else if (!isValidPassword(password)) {
      setPasswordError('A senha deve ter pelo menos um dígito e uma letra.');
    }
  };
  const handleSubmit = () => {
    validateFields();
    if (!emailError && !passwordError && onSuccess) {
      onSuccess();
    }
  };

  const styleContainer = {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  return (
    <div style={styleContainer}>
      <H1>Bem-vindo(a) à TaqTile!</H1>
      <div>
        <Input text="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
        <Separator />
        <Input
          text="Senha"
          password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
      </div>
      <Separator />
      <div>
        <Button onClick={handleSubmit}>Entrar</Button>
      </div>
    </div>
  );
};
