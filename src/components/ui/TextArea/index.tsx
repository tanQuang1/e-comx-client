import React from 'react';

interface TextAreaPropsType extends React.AllHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

function TextArea(props: TextAreaPropsType) {
  const { label, error, helperText, required, ...rest } = props;
  console.log(error);
  return (
    <div className='textarea'>
      {label ? (
        <label className='textarea__label'>
          {label} {required ? <span className='textarea__required'>*</span> : null}
        </label>
      ) : null}
      <textarea {...rest} />
      {error ? <p className='textarea__error'>{helperText} </p> : null}
    </div>
  );
}

export default React.memo(TextArea);
