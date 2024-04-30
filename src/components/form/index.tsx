import React from 'react';

interface FormProps {
  text?: string;
  label?: string;
  password?: boolean;
  expand?: boolean;
  value?: string;
}

export const Form = ({ text, label, password, value }: FormProps) => {
  const inputId = `custom-input-${label ?? 'default'}`;
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
      <label htmlFor={inputId}>{text}</label>
      <input type={password ? 'password' : 'text'} value={value} style={styleForm} />
    </div>
  );
};
