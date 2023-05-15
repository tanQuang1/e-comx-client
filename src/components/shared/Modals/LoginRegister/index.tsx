import { APP_ICONS } from '@/utils/app-config';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Login from './Login';
import Register from './Register';

export enum ActiveModalAuthEnum {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}
interface LoginPropsType extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  open: boolean;
}
function LoginRegister(props: LoginPropsType) {
  const { onClose, open, ...resProps } = props;
  const [active, setActive] = useState<ActiveModalAuthEnum>(ActiveModalAuthEnum.LOGIN);
  const setActiveForm = (form: ActiveModalAuthEnum) => {
    setActive(form);
  };

  return (
    <>
      <div className='login' {...resProps}>
        <div className='login__close'>
          <Icon width={20} height={20} icon={APP_ICONS.X} onClick={onClose} />
        </div>
        <div className='login__title'>
          <h3
            className={`title ${active === ActiveModalAuthEnum.LOGIN ? 'active' : ''}`}
            onClick={() => {
              setActiveForm(ActiveModalAuthEnum.LOGIN);
            }}
          >
            Login
          </h3>
          <h3
            className={`title ${active === ActiveModalAuthEnum.REGISTER ? 'active' : ''}`}
            onClick={() => {
              setActiveForm(ActiveModalAuthEnum.REGISTER);
            }}
          >
            Register
          </h3>
        </div>
        {active === ActiveModalAuthEnum.LOGIN ? (
          <Login open={open} setActiveForm={setActiveForm} onClose={onClose} active={active} />
        ) : (
          <Register open={open} setActiveForm={setActiveForm} active={active} />
        )}
        <div className='login__button'>
          <p>
            By providing your email address, you agree to our
            <br />
            <a href='#'>Privacy Policy</a>
            and
            <a href='#'>Terms of Service</a>.
          </p>
        </div>
      </div>
    </>
  );
}

export default React.memo(LoginRegister);
