import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Button = ({ children, onClick, disabled, style }: ButtonProps) => {
  const buttonConstatsStyle = {
    fontFamily: 'Source Sans 3',
    color: ' #FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  };

  const styleButton = {
    ...buttonConstatsStyle,
    width: '100%',
    backgroundColor: disabled ? '#cccccc' : '#2196F3',
    height: '48px',
    border: 'none',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  return (
    <button style={styleButton} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
