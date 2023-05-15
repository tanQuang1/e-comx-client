import React, { ButtonHTMLAttributes } from 'react';
interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined'; //default contained
  size?: 'lg' | 'md' | 'sm' | 'icon'; //default sm
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary'; //default primary
}

const Button: React.FC<ButtonPropsType> = (props: ButtonPropsType) => {
  const { children, className = '', variant = '', size = 'sm', color, ...rest } = props;
  return (
    <button
      {...rest}
      className={`btn ${className} ${variant ? `btn--${variant}` : ''} ${`btn--${size}`} ${
        color ? `btn--${color}` : ''
      }`}
    >
      {children}
    </button>
  );
};
export default React.memo(Button);
