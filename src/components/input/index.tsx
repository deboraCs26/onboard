import React from 'react';
import { Label } from '../../utils/typography/label/style';
import { InputContainer, StyledInput } from './style';
import { Caption } from '../../utils/typography/caption/style';

export interface InputProps {
  text?: string;
  type?: string;
  password?: boolean;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ text, type = 'text', value, onChange, error }: InputProps) => {
  return (
    <InputContainer>
      {text && <Label>{text}</Label>}
      <StyledInput value={value} onChange={onChange} type={type} />
      {!!error && <Caption> {error}</Caption>}
    </InputContainer>
  );
};
