import React from 'react';

interface LoadingBarPropsType extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function LoadingBar(props: LoadingBarPropsType) {
  const { className, ...rest } = props;
  return (
    <div {...rest} className={`loading__bar ${className}`}>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
      <span className='loading__bar--item'></span>
    </div>
  );
}
