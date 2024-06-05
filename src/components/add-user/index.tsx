import React, { useState, FormEvent } from 'react';
import { Button } from '../button';

const styleForm: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

export const AddCreatUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !birthDate || !phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    if (birthDateObj > today) {
      return;
    }

    setName('');
    setEmail('');
    setBirthDate('');
    setPhone('');

    alert('Usuário adicionado com sucesso!');
  };

  return (
    <form style={styleForm} onSubmit={handleSubmit}>
      <h1>Adicionar Usuário</h1>
      <label style={{ margin: '12px' }}>
        Nome:
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label style={{ margin: '12px' }}>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label style={{ margin: '12px' }}>
        Data de Nascimento:
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </label>
      <label style={{ margin: '12px' }}>
        Telefone:
        <input type="telephone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <div style={{ width: '10%', margin: '12px' }}>
        <Button>Adicionar Usuário</Button>
      </div>
    </form>
  );
};
