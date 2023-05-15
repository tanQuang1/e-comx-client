import Accordion from '@/components/ui/Accordion';
import { APP_ICONS, APP_LOCAL_STORAGE, APP_ROUTER } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import api from '@/services';
import useCart from '@/hooks/useCart';
import { useRouter } from 'next/router';
import { validationSchema, initialValues, InitialValuesType } from './constant';
import ListProductCheckout from './ListProduct';
import { toast } from 'react-toastify';
import Form from './Form';
import useApp from '@/hooks/useApp';

export default function CheckoutTemplate() {
  const { cart } = useCart();
  const router = useRouter();

  const { modal, closeModal } = useApp();

  useEffect(() => {
    if (modal.isOpen) {
      closeModal();
    }
    if (cart.length === 0) {
      router.push('/');
    }
  }, []);
  const [activeAccordion, setActiveAccordion] = useState<boolean>(false);
  const [createOrder] = api.useCreateOrderMutation();
  const formik = useFormik<InitialValuesType>({
    initialValues,
    validateOnChange: false,
    validationSchema,
    onSubmit: (values: InitialValuesType) => {
      console.log(values);
      const {
        province,
        district,
        ward,
        coupon,
        fullname,
        phone,
        email,
        paymentType,
        service_type_id,
        address,
        remember,
      } = values;

      const shippingDetail = {
        address: {
          province,
          district,
          ward,
          detail: address,
        },
        coupon,
        fullname,
        phone,
        email,
      };

      if (remember) {
        localStorage.setItem(APP_LOCAL_STORAGE.ADDRESS, JSON.stringify(address));
      }
      const products = [];
      for (const element of cart) {
        products.push({ product: element.product._id, quantity: element.quantity });
      }

      const payload = {
        products,
        coupon,
        shippingDetail,
        paymentType,
        service_type_id,
      };

      if (paymentType === 'online') {
        createOrder(payload).then((results) => {
          if ('data' in results) {
            window.location.href = results.data.url;
          }
        });
      }

      if (paymentType === 'offline') {
        createOrder(payload).then((res) => {
          console.log(res);
          if ('data' in res && 'success' in res.data) {
            if (res.data.success) {
              toast.success('Đặt hàng thành công');
              localStorage.setItem(
                APP_LOCAL_STORAGE.IS_ORDER_SUCCESS,
                JSON.stringify(res.data.success),
              );
              router.push(APP_ROUTER.SUCCESS);
            } else {
              toast.error('Đặt hàng thất bại');
            }
          }
        });
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    setValues,
  } = formik;

  return (
    <div className='checkout'>
      <form onSubmit={handleSubmit} autoComplete='on'>
        <div className='checkout__product-accordion'>
          <div className='product-accordion--list'>
            <Accordion
              header={
                <div className='accordion--list-header'>
                  <div className='header--title'>
                    {' '}
                    <Icon icon={APP_ICONS.cart} />
                    {activeAccordion ? (
                      <p style={{ marginLeft: '2rem' }}>Hide order summary</p>
                    ) : (
                      <p style={{ marginLeft: '2rem' }}>Show order summary</p>
                    )}
                  </div>
                </div>
              }
              open={activeAccordion}
              onClick={() => setActiveAccordion(!activeAccordion)}
            >
              <ListProductCheckout
                value={values.coupon}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </Accordion>
          </div>
        </div>
        <Form
          setFieldValue={setFieldValue}
          setValues={setValues}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </form>
    </div>
  );
}
