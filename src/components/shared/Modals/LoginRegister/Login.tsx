import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { FormikHelpers, useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { ActiveModalAuthEnum } from './index';
import Link from 'next/link';
import api from '@/services';
import { LoginFormDataType } from '@/types/user.type';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
interface LoginPropsType {
  setActiveForm: (form: ActiveModalAuthEnum) => void;
  onClose: () => void;
  open: boolean;
  active: ActiveModalAuthEnum;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(8, 'Username must be at least 8 characters long')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must have at least 1 upper letter, 1 lower letter, 1 number, 1 special character',
    ),
});

const initialValues: LoginFormDataType = {
  username: '',
  password: '',
  remember: false,
};
const Login: React.FC<LoginPropsType> = (props) => {
  const { setActiveForm, onClose, open, active, ...restProps } = props;
  const [login, { isLoading }] = api.useLoginMutation();

  const formik = useFormik<LoginFormDataType>({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit: function (value: LoginFormDataType, { resetForm }: FormikHelpers<LoginFormDataType>) {
      //Login hooks
      login(value)
        .then((res) => {
          if ('data' in res) {
            if (res.data) {
              toast.success('Login success');
              resetForm();
              onClose();
            }
          }
        })
        .catch(() => {
          toast.error('try again');
        });
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, handleReset } = formik;
  useEffect(() => {
    handleReset(initialValues);
  }, [active, open]);
  if (isLoading) return <Loading />;

  return (
    <div className='login__body' {...restProps}>
      <form onSubmit={handleSubmit} autoComplete='on'>
        <div className='body__form'>
          <div className='form form--login'>
            <div className='form__textField'>
              <TextField
                label='User Name'
                required
                placeholder='User Name'
                name='username'
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={Boolean(errors.username) && touched.username}
                helperText={errors.username}
              />
            </div>
            <div className='form__textField'>
              <TextField
                label='Password '
                required
                placeholder='Password'
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password) && touched.password}
                helperText={errors.password}
              />
            </div>
          </div>
        </div>
        <div className='body__check'>
          <div className='check__box'>
            <input
              checked={values.remember}
              name='remember'
              type='checkbox'
              id='check-confirm'
              onChange={handleChange}
            />
            <label htmlFor='check-confirm'> Remember me </label>
          </div>
          <Link href='/' className='check__forgot'>
            Forgot your password ?
          </Link>
        </div>
        <div className='body__button'>
          <Button size='lg' type='submit'>
            LOGIN
          </Button>
        </div>
        <p className='body__or'>
          <span>or</span>
        </p>
        <div className='body__register'>
          <Button
            color='quaternary'
            size='lg'
            onClick={() => {
              setActiveForm(ActiveModalAuthEnum.REGISTER);
            }}
          >
            CREATE NEW ACCOUNT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Login);
