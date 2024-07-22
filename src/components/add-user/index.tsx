import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';
import { Input } from '../input';
import { UseCreateUser } from '../../domain/creat-user/authentication-user';
import { isValidPassword, isValidEmail } from '../../utils/strings-utils';
import { ButtonContainer, LoginContainer } from '../login/style';
import { Caption } from '../../utils/typography/caption/style';

interface AddUserProps {
  onSuccess?: () => void;
}

interface Values {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  role: string;
  password: string;
}

interface Errors {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  role: string;
  password: string;
  invalidBirthDate: string;
}

export const AddCreateUser = ({ onSuccess }: AddUserProps) => {
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    birthDate: '',
    phone: '',
    role: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    birthDate: '',
    phone: '',
    role: '',
    password: '',
    invalidBirthDate: '',
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const { loading, createUser, error } = UseCreateUser({ token });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateFields = (values: Values) => {
    let isValid = true;
    const newErrors: Errors = {
      name: '',
      email: '',
      birthDate: '',
      phone: '',
      role: '',
      password: '',
      invalidBirthDate: '',
    };

    if (!values.name.trim()) {
      newErrors.name = 'Campo obrigatório.';
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = 'Campo obrigatório.';
      isValid = false;
    } else if (!isValidEmail(values.email)) {
      newErrors.email = 'O email informado é inválido.';
      isValid = false;
    }

    if (!values.phone.trim()) {
      newErrors.phone = 'Campo obrigatório.';
      isValid = false;
    }

    if (!values.role.trim()) {
      newErrors.role = 'Campo obrigatório.';
      isValid = false;
    }

    if (!values.password.trim()) {
      newErrors.password = 'Campo obrigatório.';
      isValid = false;
    } else if (values.password.length < 7) {
      newErrors.password = 'A senha deve ter pelo menos 7 caracteres.';
      isValid = false;
    } else if (!isValidPassword(values.password)) {
      newErrors.password = 'A senha deve ter pelo menos um dígito e uma letra.';
      isValid = false;
    }

    if (!values.birthDate.trim()) {
      newErrors.birthDate = 'Campo obrigatório.';
      isValid = false;
    } else {
      const birthDateObj = new Date(values.birthDate);
      const minDate = new Date('1900-01-01');
      const today = new Date();
      if (birthDateObj < minDate) {
        newErrors.invalidBirthDate = 'A data de nascimento não pode ser anterior a 01/01/1900.';
        isValid = false;
      } else if (birthDateObj > today) {
        newErrors.invalidBirthDate = 'A data de nascimento não pode estar no futuro.';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const isValid = validateFields(values);
    if (isValid) {
      const userData = { ...values };
      createUser({ variables: { data: userData } })
        .then((register) => {
          if (register?.data?.createUser) {
            if (onSuccess) onSuccess();
            navigate('/usersList');
          }
        })
        .catch((error) => {
          console.error('Erro durante a criação do usuário:', error);
        });
    }
  };

  return (
    <LoginContainer onSubmit={handleSubmit}>
      <h1>Adicionar Usuário</h1>
      <Input text="Nome" value={values.name} onChange={handleChange} error={errors.name} name="name" />
      <Input text="Email" value={values.email} onChange={handleChange} error={errors.email} name="email" />
      <Input
        text="Data de Nascimento"
        type="date"
        value={values.birthDate}
        onChange={handleChange}
        error={errors.birthDate || errors.invalidBirthDate}
        name="birthDate"
      />
      <Input
        text="Telefone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        name="phone"
      />
      <Input text="Tipo de Usuário" value={values.role} onChange={handleChange} error={errors.role} name="role" />
      <Input
        text="Senha"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        name="password"
      />
      <ButtonContainer>
        <Button disabled={loading} expand>
          Adicionar Usuário
        </Button>
        {error && <Caption>Erro: {error.message}</Caption>}
      </ButtonContainer>
    </LoginContainer>
  );
};
