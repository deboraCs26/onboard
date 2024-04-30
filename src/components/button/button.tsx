import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
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
  return <button style={styleButton}>{children}</button>;
};
