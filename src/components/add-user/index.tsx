import React, { useState, useEffect } from 'react';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';
import { Input } from '../input';
import { UseCreateUser } from '../../domain/creat-user/authentication-user';
import { isValidPassword, isValidEmail } from '../../utils/strings-utils';

interface AddUserProps {
  onSuccess?: () => void;
}

const styleForm: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '20%',
};

export const AddCreateUser = ({ onSuccess }: AddUserProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
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
      navigate('/login');
    }
  }, [token, navigate]);

  const { loading, createUser, error } = UseCreateUser({ token });

  const validateFields = (
    name: string,
    email: string,
    birthDate: string,
    phone: string,
    role: string,
    password: string,
  ) => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      birthDate: '',
      phone: '',
      role: '',
      password: '',
      invalidBirthDate: '',
    };

    if (!name.trim()) {
      newErrors.name = 'Campo obrigatório.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Campo obrigatório.';
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'O email informado é inválido.';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Campo obrigatório.';
      isValid = false;
    }

    if (!role.trim()) {
      newErrors.role = 'Campo obrigatório.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Campo obrigatório.';
      isValid = false;
    } else if (password.length < 7) {
      newErrors.password = 'A senha deve ter pelo menos 7 caracteres.';
      isValid = false;
    } else if (!isValidPassword(password)) {
      newErrors.password = 'A senha deve ter pelo menos um dígito e uma letra.';
      isValid = false;
    }

    if (!birthDate.trim()) {
      newErrors.birthDate = 'Campo obrigatório.';
      isValid = false;
    } else {
      const birthDateObj = new Date(birthDate);
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
    const isValid = validateFields(name, email, birthDate, phone, role, password);
    if (isValid) {
      const userData = { email, name, birthDate, phone, role, password };
      createUser({ variables: { data: userData } })
        .then((register) => {
          console.log('Resposta do registro:', register);
          if (register?.data?.createUser) {
            if (onSuccess) onSuccess();
            navigate('/users');
          }
        })
        .catch((error) => {
          console.error('Erro durante a criação do usuário:', error);
        });
    }
  };

  return (
    <form style={styleForm} onSubmit={handleSubmit}>
      <h1>Adicionar Usuário</h1>
      <Input text="Nome" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Input text="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
      <Input
        text="Data de Nascimento"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        error={errors.birthDate || errors.invalidBirthDate}
      />
      <Input text="Telefone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
      <Input text="Tipo de Usuário" value={role} onChange={(e) => setRole(e.target.value)} error={errors.role} />
      <Input
        text="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <div style={{ width: '50%', margin: '12px' }}>
        <Button disabled={loading}>Adicionar Usuário</Button>
        {error && <p style={{ color: 'red' }}>Erro: {error.message}</p>}
      </div>
    </form>
  );
};
