import React from 'react';

interface BadgePropsType extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  size?: 'sm' | 'md';
}

function Badge(props: BadgePropsType) {
  const { size = 'md', className = '', ...rest } = props;
  return (
    <span className={`badges ${size} ${className} `} {...rest}>
      {' '}
      {props.value}
    </span>
  );
}

export default React.memo(Badge);
