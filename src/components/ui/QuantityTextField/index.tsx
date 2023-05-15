import React from 'react';
import { toast } from 'react-toastify';
interface QuantityTextFieldPropsType {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
function QuantityTextField(prop: QuantityTextFieldPropsType) {
  const { quantity, onChange, size = 'md', style } = prop;
  const [value, setValue] = React.useState<string>('');
  const updateQuantityByClickOnIcons = (value: number) => {
    onChange(quantity + value);
  };
  const entryQuantity = (value: string) => {
    if (!containsOnlyNumbers(value)) {
      toast.error('Please enter a valid number');
      setValue(quantity.toString());
      return;
    }
    onChange(Number(value));
  };

  React.useEffect(() => {
    setValue(quantity.toString());
  }, [quantity]);
  function containsOnlyNumbers(str: string) {
    return /^\d+$/.test(str);
  }
  return (
    <div className={`input__quantity ${size}`} style={style}>
      <span
        className='input__quantity-button'
        onClick={() => {
          updateQuantityByClickOnIcons(-1);
        }}
      >
        -
      </span>
      <input
        type='tel'
        className='input__quantity-input'
        pattern='[0-9]'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
        onBlur={() => {
          entryQuantity(value);
        }}
        value={value}
      />
      <span
        className='input__quantity-button'
        onClick={() => {
          updateQuantityByClickOnIcons(1);
        }}
      >
        +
      </span>
    </div>
  );
}

export default QuantityTextField;
