import React, { useState } from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { isValidPassword, isValidEmail } from '../../utils/strings-utils';

interface AddUserProps {
  onSuccess?: () => void;
}

const styleForm: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '20%',
};

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateFields(values);
    if (isValid) {
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styleForm}>
      <h1>Adicionar Usuário</h1>
      <Input text="Nome" name="name" value={values.name} onChange={handleChange} error={errors.name} />
      <Input text="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} />
      <Input
        text="Data de Nascimento"
        type="date"
        name="birthDate"
        value={values.birthDate}
        onChange={handleChange}
        error={errors.birthDate || errors.invalidBirthDate}
      />
      <Input
        text="Telefone"
        type="tel"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Input text="Tipo de Usuário" name="role" value={values.role} onChange={handleChange} error={errors.role} />
      <Input
        text="Senha"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <div style={{ width: '50%', margin: '12px' }}>
        <Button>Adicionar Usuário</Button>
      </div>
    </form>
  );
};
