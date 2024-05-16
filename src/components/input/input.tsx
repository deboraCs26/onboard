import React from 'react';

interface InputProps {
  text?: string;
  password?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ text, password, value }: InputProps) => {
  const styleForm = {
    display: 'flex',
    border: '1px solid #C5C5C5',
    borderLeft: '3px solid #C5C5C5',
    borderRight: '3px solid #C5C5C5',
    outline: 'none',
    padding: '12px 20px',
    width: '90%',
    borderRadius: '10px',
    margin: '12px 0',
  };
  return (
    <div>
      {text && <label>{text}</label>}
      <input type={password ? 'password' : 'text'} value={value} style={styleForm} />
    </div>
  );
};
