import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
  const buttonConstatsStyle = {
    fontFamily: 'Source Sans 3',
    color: ' #FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  };

  const styleButton = {
    ...buttonConstatsStyle,
    width: '100%',
    backgroundColor: '#2196F3',
    height: '48px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  };
  return (
    <button style={styleButton} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
