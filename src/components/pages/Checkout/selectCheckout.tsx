import React from 'react';

interface SelectCheckoutType extends React.AllHTMLAttributes<HTMLSelectElement> {
  name: 'province' | 'district' | 'ward' | 'service_type_id';
  error?: boolean;
  helperText?: string;
  children: React.ReactNode;
  placeholder: string;
}
export default function SelectCheckout(props: SelectCheckoutType) {
  const { name, error, helperText, children, placeholder, ...rest } = props;

  return (
    <div className='selectCheckout'>
      <select name={name} {...rest}>
        <option value=''> {placeholder}</option>
        {children}
      </select>
      {error ? <p className='textfield__error'>{helperText}</p> : null}
    </div>
  );
}
