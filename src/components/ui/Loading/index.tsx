import React from 'react';

interface LoadingPropsType extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'absolute' | 'fixed' | 'none';
  size?: 'sm' | 'md' | 'lg';
}
function Loading(props: LoadingPropsType) {
  const { position = 'fixed', className = '', size, ...rest } = props;
  return (
    <div {...rest} className={`loading ${className} ${position}`}>
      <div className={`loading__circle ${size != 'md' ? size : ''}`}>
        <span className='loading__circle--container'></span>
      </div>
    </div>
  );
}

export default React.memo(Loading);
