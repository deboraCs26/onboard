import React from 'react';

interface H1Props {
  children: React.ReactNode;
}

export const H1 = ({ children }: H1Props) => {
  const styleH1 = {
    fontFamily: 'Source Sans 3',
    fontSize: '40px',
    fontWeight: '600',
  };

  return <h1 style={styleH1}>{children}</h1>;
};
