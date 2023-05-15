import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import React from 'react';

interface OptionsType {
  _id: string;
  name: string;
}
interface SelectPropsType {
  value: string;
  options: OptionsType[];
  onSelect: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  maxWidth?: boolean;
}

function Select(props: SelectPropsType) {
  const {
    value,
    onSelect,
    className = '',
    options = [],
    size = '',
    error,
    helperText,
    placeholder,
    maxWidth = false,
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleSelectItem = (value: string) => {
    onSelect(value);
    toggleOpen();
  };
  return (
    <div className='select-box__wrapper'>
      <div
        onClick={toggleOpen}
        className={`select-box ${maxWidth ? 'mw' : ''} ${className} ${open ? 'open' : ''} ${size}`}
        {...rest}
      >
        <span className='select-box__overlay' onClick={toggleOpen}></span>
        {
          <p className='select-box__content'>
            {value === '' ? placeholder || 'Select a option' : value}
          </p>
        }
        <Icon width={16} height={16} icon={APP_ICONS.arrowUp} />
        <ul className='select-box__list'>
          {options &&
            options.map((item: OptionsType) => (
              <li
                key={item._id}
                className='list__items'
                onClick={() => handleSelectItem(item.name)}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
      {error ? <p className='select-box__error'>{helperText}</p> : null}
    </div>
  );
}

export default React.memo(Select);
