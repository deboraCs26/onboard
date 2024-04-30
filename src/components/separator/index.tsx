import React from 'react';

interface SeparatorProps {
  size?: 'small' | 'medium' | 'XSmall' | 'large' | 'XLarge';
  horizontal?: boolean;
}

export const Separator = ({ size, horizontal }: SeparatorProps) => {
  const dimension = horizontal ? 'width' : 'height';

  let height;

  if (size === 'small') {
    height = '8px';
  } else if (size === 'large') {
    height = '24px';
  } else if (size === 'XSmall') {
    height = '4px';
  } else if (size === 'XLarge') {
    height = '32px';
  } else {
    height = '16px';
  }

  return <div style={{ [dimension]: height }} />;
};
