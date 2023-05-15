import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import React from 'react';

interface AccordionPropsType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header: string | React.ReactNode;
  open: boolean;
}

function Accordion(props: AccordionPropsType) {
  const { header, open, className = '', children, onClick, ...rest } = props;
  return (
    <div className={`accordion ${open ? 'open' : ''} ${className}`} {...rest}>
      <div className='accordion__header' onClick={onClick}>
        <p>{header}</p>
        {!open ? <Icon icon={APP_ICONS.arrowDown} /> : <Icon icon={APP_ICONS.arrowUp} />}
      </div>
      <div className='accordion__panel'>{children}</div>
    </div>
  );
}
export default React.memo(Accordion);
