import React from 'react';

interface TextFieldPropsType extends React.AllHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: 'inline' | 'outline';
  error?: boolean;
  helperText?: string;
  variant?: 'small' | 'medium';
}

function TextField(props: TextFieldPropsType) {
  const {
    label,
    error,
    helperText,
    variant = 'medium',
    labelPosition,
    className = '',
    required,
    ...rest
  } = props;

  return (
    <div
      className={`textfield ${'textfield--' + variant} ${className} ${
        labelPosition === 'inline' ? 'inline' : ''
      }`}
      style={rest.style}
    >
      {label && labelPosition !== 'inline' ? (
        <label className='textfield__label ' htmlFor={props.id}>
          {label} {required ? <span className='textfield__required'>*</span> : null}
        </label>
      ) : null}
      <div className='textfield__input'>
        <input
          {...rest}
          placeholder={`${labelPosition === 'inline' ? label : props.placeholder || ''}`}
        />
        {label && labelPosition === 'inline' ? (
          <span className='textfield__inline-label'>{label}</span>
        ) : null}
      </div>
      {error ? <p className='textfield__error'>{helperText}</p> : null}
    </div>
  );
}

export default React.memo(TextField);
