import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { ActiveModalAuthEnum } from './index';
import { RegisterFormDataType } from '@/types/user.type';
import api from '@/services';
import Loading from '@/components/ui/Loading';
import { toast } from 'react-toastify';
interface RegisterPropsType {
  setActiveForm: (form: ActiveModalAuthEnum) => void;
  open: boolean;
  active: ActiveModalAuthEnum;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('This field is required'),
  lastname: Yup.string().required('This field is required'),
  email: Yup.string().email('email is wrong').required('this field is required'),
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
  confirmPassword: Yup.string()
    .min(8, 'Confirm password should be of minimum 8 characters length')
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Confirm password must match with password'),
});

const initialValues: RegisterFormDataType = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};
export default function Register(props: RegisterPropsType) {
  const { setActiveForm, active, open, ...restProps } = props;
  const [register, { isLoading }] = api.useRegisterMutation();

  const formik = useFormik<RegisterFormDataType>({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit: (value, { resetForm }) => {
      register(value)
        .then((res) => {
          if ('data' in res) {
            if (res.data) {
              toast.success('Register success');
              setActiveForm(ActiveModalAuthEnum.LOGIN);
              resetForm();
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
      <form onSubmit={handleSubmit}>
        <div className='body__form'>
          <div className='form form--register'>
            <div className='form__textField'>
              <TextField
                label='First name'
                required
                placeholder='First name'
                type='text'
                name='firstname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
                error={Boolean(errors.firstname) && touched.firstname}
                helperText={errors.firstname}
              />
            </div>
            <div className='form__textField'>
              <TextField
                label='Last name'
                required
                placeholder='Last name'
                type='text'
                name='lastname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
                error={Boolean(errors.lastname) && touched.lastname}
                helperText={errors.lastname}
              />
            </div>

            <div className='form__textField'>
              <TextField
                label='Email'
                required
                placeholder='Email'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(errors.email) && touched.email}
                helperText={errors.email}
              />
            </div>
            <div className='form__textField'>
              <TextField
                label='User Name'
                required
                placeholder='User Name'
                type='text'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={Boolean(errors.username) && touched.username}
                helperText={errors.username}
              />
            </div>
            <div className='form__textField'>
              <TextField
                label='Password'
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
            <div className='form__textField'>
              <TextField
                label='Confirm Password'
                required
                placeholder='Confirm Password'
                type='password'
                name='confirmPassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={Boolean(errors.confirmPassword) && touched.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </div>
          </div>
        </div>
        <div className='body__button'>
          <Button size='lg' type='submit'>
            CREATE NEW ACCOUNT
          </Button>
        </div>
        <p className='body__or'>
          <span>or</span>
        </p>
        <div
          className='body__register'
          onClick={() => {
            setActiveForm(ActiveModalAuthEnum.LOGIN);
          }}
        >
          <Button color='quaternary' size='lg'>
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
}
