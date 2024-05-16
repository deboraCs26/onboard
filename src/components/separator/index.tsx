import React from 'react';

interface SeparatorProps {
  size?: 'small' | 'medium' | 'xSmall' | 'large' | 'xLarge';
  horizontal?: boolean;
}

export const Separator = ({ size, horizontal }: SeparatorProps) => {
  const dimension = horizontal ? 'width' : 'height';

  let height;

  switch (size) {
    case 'small':
      height = '8px';
      break;
    case 'medium':
      height = '16px';
      break;
    case 'xSmall':
      height = '4px';
      break;
    case 'large':
      height = '24px';
      break;
    case 'xLarge':
      height = '32px';
      break;
    default:
      height = '16px';
      break;
  }

  return <div style={{ [dimension]: height }} />;
};
