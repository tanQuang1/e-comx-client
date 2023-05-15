import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(8, 'Username must be at least 8 characters long')
    .required('This field is required'),
  email: Yup.string().email('email is wrong').required('This field is required'),
  phone: Yup.string()
    .matches(
      /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
      'Phone is wrong',
    )
    .required('This field is required'),
  address: Yup.string().required('This field is required'),
  province: Yup.object().shape({
    provinceName: Yup.string().required('This field is required'),
  }),
  district: Yup.object().shape({
    districtName: Yup.string().required('This field is required'),
  }),
  ward: Yup.object().shape({
    wardName: Yup.string().required('This field is required'),
  }),
  service_type_id: Yup.number().min(1, 'This field is required'),
});
export const initialValues = {
  coupon: '',
  province: {
    provinceId: 0,
    provinceName: '',
  },
  district: {
    districtId: 0,
    districtName: '',
  },
  ward: {
    wardId: 0,
    wardName: '',
  },
  fullname: '',
  phone: '',
  email: '',
  address: '',
  paymentType: 'online',
  service_type_id: 0,
  remember: false,
};

export interface InitialValuesType {
  coupon: string;
  province: {
    provinceId: number;
    provinceName: string;
  };
  district: {
    districtId: number;
    districtName: string;
  };

  ward: {
    wardId: number;
    wardName: string;
  };
  fullname: string;
  phone: string;
  email: string;
  address: string;
  paymentType: string;
  service_type_id: number;
  remember: boolean;
}
