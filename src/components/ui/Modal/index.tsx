import { ModalPlacementEnum } from '@/store/app/app.type';
import React from 'react';

interface modalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  placement: string | ModalPlacementEnum;
}

function Modal(props: modalProps) {
  const { children, open, onClose, placement, ...rest } = props;

  console.log(placement);

  return (
    <div className={`modal ${open ? 'open' : ''}`} {...rest}>
      <div className='modal__overlay' onClick={onClose}></div>
      <div className={`modal__body modal__body--${placement} `}>{children}</div>
    </div>
  );
}

export default React.memo(Modal);
