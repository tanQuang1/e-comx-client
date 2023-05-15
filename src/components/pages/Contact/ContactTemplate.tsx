import workplace from '@/assets/images/contact-page-workplace.webp';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';
import { APP_ICONS } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface FormDataType {
  name: string;
  email: string;
  message: string;
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  email: Yup.string().email('Email is wrong').required('This field is required'),
  message: Yup.string()
    .required('This field is required')
    .min(50, 'The message must at least 50 characters'),
});
const initialValues = {
  name: '',
  email: '',
  message: '',
};
const Map = dynamic(() => import('../Contact/Map/Map'), { ssr: false });
export default function ContactTemplate() {
  const handleSubmitForm = (value: FormDataType) => {
    // e.preventDefault();
    console.log('call API here', value);
  };
  const formik = useFormik<FormDataType>({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit: (value, { resetForm }) => {
      handleSubmitForm(value);
      toast.success('Submitted!');
      resetForm();
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;
  return (
    <div className='contact-page-container'>
      <div className='breadcrumbs'>
        <div className='wrap-breadcrumb'>
          <h1>Contact</h1>
        </div>
      </div>
      <div className='main-content'>
        <div className='contact-box'>
          <div className='contact info'>
            <div className='contact-info'>
              <div className='contact-image'>
                <Image src={workplace} alt='work-place' />
              </div>
              <div className='contact-phone-email'>
                <Icon icon={APP_ICONS.earphone} className='icon' />
                <div>
                  <span className='email'>Dukamarket@google.com</span>
                  <span className='phone'>(+100) 666-456-789</span>
                </div>
              </div>
              <div className='address'>
                Add: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.
                <br></br>
                Fax: (+100) 123 456 789<br></br>Monday - Friday: 9:00-20:00 <br></br>Email:
                Contact@erentheme.com
              </div>
            </div>
          </div>
          <div className='contact form'>
            <div className='contact-info'>
              <form onSubmit={handleSubmit}>
                <h4 className='title'>Get In Touch</h4>
                <div className='row'>
                  <TextField
                    label='Name'
                    placeholder='Name'
                    required
                    type='text'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={Boolean(errors.name) && touched.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label='Email'
                    placeholder='Email'
                    required
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={Boolean(errors.email) && touched.email}
                    helperText={errors.email}
                  />
                </div>
                <TextArea
                  label='Message'
                  placeholder='Message'
                  rows={8}
                  name='message'
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  error={Boolean(errors.message) && touched.message}
                  helperText={errors.message}
                ></TextArea>
                <Button size='lg' type='submit'>
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='map'>
        <Map />
      </div>
    </div>
  );
}
