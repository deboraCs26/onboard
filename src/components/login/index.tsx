import React, { useState } from 'react';
import { Input } from '../input';
import { Button } from '../button';
import { Separator } from '../separator';
import { isValidEmail, isValidPassword } from '../../utils/strings-utils';
import { LOGIN_MUTATION, LoginData } from '../../domain/login';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LoginContainer, StyledButton } from './style';
import { H1 } from '../../utils/typography/Heading1/style';

interface LoginProps {
  onSuccess?: () => void;
}

export const Login = ({ onSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const [loginMutation, { loading }] = useMutation<LoginData>(LOGIN_MUTATION);

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
    if (!emailError && !passwordError) {
      loginMutation({ variables: { data: { email, password } } })
        .then((register) => {
          if (register.data && register.data.login && register.data.login.token) {
            localStorage.setItem('token', register.data.login.token);
            if (onSuccess) onSuccess();
            navigate('/usersList');
          }
        })
        .catch((error) => {
          console.error('Erro na mutação de login:', error);
        });
    }
  };

  return (
    <LoginContainer>
      <H1>Bem-vindo(a) à TaqTile!</H1>
      <Input text="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} />
      <Separator />
      <Input
        text="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />
      <Separator />
      <StyledButton>
        <Button onClick={handleSubmit} disabled={loading} expand>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
      </StyledButton>
    </LoginContainer>
  );
};
