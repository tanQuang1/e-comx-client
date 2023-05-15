import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import useUser from '@/hooks/useUser';
import React, { useCallback, useEffect, useState } from 'react';
import { AvailableServicesType, DistrictType, WardType } from '@/types/GHN.type';
import api from '@/services';
import useCart from '@/hooks/useCart';
import { APP_LOCAL_STORAGE, APP_ROUTER } from '@/utils/app-config';
import { InitialValuesType } from './constant';
import { FormikErrors, FormikTouched } from 'formik';
import { useRouter } from 'next/router';
import ListProduct from './ListProduct';
import useApp from '@/hooks/useApp';
import { ModalNameEnum } from '@/store/app/app.type';
import SelectCheckout from './selectCheckout';

type FormPropsType = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setValues: (fields: React.SetStateAction<InitialValuesType>, shouldValidate?: boolean) => void;
  values: InitialValuesType;
  errors: FormikErrors<InitialValuesType>;
  touched: FormikTouched<InitialValuesType>;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
};

export default function Form(props: FormPropsType) {
  const { cart } = useCart();
  const router = useRouter();
  const { setFieldValue, setValues, errors, touched, values, handleChange, handleBlur } = props;
  const {
    user: { userDetail },
  } = useUser();
  const { openModal } = useApp();

  const { currentData } = api.useGetProvinceQuery(undefined, { skip: cart.length === 0 });
  const [dataDistrict, setDataDistrict] = useState<DistrictType[]>([]);
  const [dataWard, setDataWard] = useState<WardType[]>([]);
  const [dataAvailableServices, setDataAvailableServices] = useState<AvailableServicesType[]>([]);
  const [addressSavedLocalStore, setAddressSavesLocalStore] = useState(null);
  const [getDistrict] = api.useGetDistrictMutation();
  const [getWard] = api.useGetWardMutation();
  const [getAvailableServices] = api.useGetAvailableServicesMutation();

  useEffect(() => {
    const shippingDetail = localStorage.getItem(APP_LOCAL_STORAGE.ADDRESS);
    if (shippingDetail) {
      setAddressSavesLocalStore(JSON.parse(shippingDetail));
    }
  }, []);
  const handleEnterSavedInformation = async () => {
    if (userDetail !== null) {
      setFieldValue('email', userDetail.email);
    }
    if (addressSavedLocalStore !== null) {
      const {
        province: { provinceId, provinceName },
        district: { districtId, districtName },
        ward: { wardId, wardName },
        address,
      } = addressSavedLocalStore;
      try {
        const [districtResults, wardResults, availableServicesResults] = await Promise.all([
          getDistrict(provinceId),
          getWard(districtId),
          getAvailableServices(districtId),
        ]);
        if ('data' in districtResults) {
          setDataDistrict(districtResults.data);
        }
        if ('data' in wardResults) {
          setDataWard(wardResults.data);
        }
        if ('data' in availableServicesResults) {
          setDataAvailableServices(availableServicesResults.data);
        }
      } catch (error) {
        console.log(error);
      }
      setValues({
        ...values,
        email: userDetail?.email,
        province: {
          provinceName,
          provinceId,
        },
        district: {
          districtName,
          districtId,
        },
        ward: {
          wardName,
          wardId,
        },
        address,
      });
    }
  };
  const handleOnchangeSelectProvince = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = currentData?.find((option) => {
      return option?.ProvinceName.toString() === event.target.value;
    });
    if (!selectedOption) return;
    setValues({
      ...values,
      province: {
        provinceId: selectedOption?.ProvinceID,
        provinceName: selectedOption?.ProvinceName,
      },
      district: {
        districtName: '',
        districtId: 0,
      },
      ward: {
        wardId: 0,
        wardName: '',
      },
    });

    if (dataWard) {
      setDataWard([]);
    }
    if (dataAvailableServices) {
      setDataAvailableServices([]);
    }
    try {
      getDistrict(selectedOption?.ProvinceID || 1).then((results) => {
        if ('data' in results) {
          setDataDistrict(results.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnchangeSelectDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = dataDistrict?.find((option) => {
      return option?.DistrictName.toString() === event.target.value;
    });
    if (!selectedOption) return;
    setValues({
      ...values,
      district: {
        districtName: selectedOption?.DistrictName,
        districtId: selectedOption?.DistrictID,
      },
      ward: {
        wardId: 0,
        wardName: '',
      },
      service_type_id: 0,
    });

    try {
      getWard(selectedOption?.DistrictID || 0).then((results) => {
        if ('data' in results) {
          setDataWard(results.data);
        }
      });
      getAvailableServices(selectedOption?.DistrictID || 0).then((results) => {
        if ('data' in results) {
          setDataAvailableServices(results.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnChangeSelectWard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = dataWard?.find((option) => {
      return option.WardName.toString() === event.target.value;
    });
    if (!selectedOption) return;
    setFieldValue('ward', {
      wardId: selectedOption?.WardCode,
      wardName: selectedOption?.WardName,
    });
  };

  const renderProvince = useCallback(() => {
    if (currentData) {
      return (
        <>
          {currentData?.map((item) => {
            return (
              <option value={item.ProvinceName} key={item.ProvinceID}>
                {item.ProvinceName}
              </option>
            );
          })}
        </>
      );
    }

    return <></>;
  }, [currentData]);
  const renderDistrict = useCallback(() => {
    if (dataDistrict) {
      return (
        <>
          {dataDistrict.map((item) => {
            return (
              <option key={item.DistrictID} value={item.DistrictName}>
                {item.DistrictName}
              </option>
            );
          })}
        </>
      );
    }

    return <></>;
  }, [dataDistrict]);
  const renderWard = useCallback(() => {
    if (dataWard) {
      return (
        <>
          {dataWard?.map((item) => {
            return (
              <option key={item.WardCode} value={item.WardName}>
                {item.WardName}
              </option>
            );
          })}
        </>
      );
    }

    return <></>;
  }, [dataWard]);
  const renderAvailableServices = useCallback(() => {
    if (dataAvailableServices) {
      return (
        <>
          {dataAvailableServices?.map((item, index) => {
            return (
              <option value={item.service_type_id} key={index}>
                {item.short_name}
              </option>
            );
          })}
        </>
      );
    }

    return <></>;
  }, [dataAvailableServices]);
  return (
    <div className='checkout__information'>
      <div className='information__user'>
        <div className='user__contact'>
          <div className='contact__information'>
            <div className='information__header'>
              <h3>Contact information</h3>
              {userDetail !== null ? (
                <Button
                  onClick={handleEnterSavedInformation}
                  color='tertiary'
                  variant='outlined'
                  size='md'
                  type='button'
                >
                  Enter saved information
                </Button>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span onClick={() => openModal(ModalNameEnum.AUTH)}> Log in</span>
                </p>
              )}
            </div>
            <div className='information__textField'>
              <div className='textField--email textField'>
                <TextField
                  label='Email'
                  type='email'
                  name='email'
                  labelPosition='inline'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email) && touched.email}
                  helperText={errors.email}
                />
              </div>
              <div className='textField--phone textField'>
                <TextField
                  label='Phone'
                  type='phone'
                  name='phone'
                  labelPosition='inline'
                  error={Boolean(errors.phone) && touched.phone}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.phone}
                />
              </div>
            </div>
          </div>
          <div className='contact__address'>
            <div className='address__header'>
              <h3>Shipping address</h3>
            </div>
            <div className='address__textField'>
              <div className='textField--fullName textField'>
                <TextField
                  label='Full name'
                  type='text'
                  name='fullname'
                  labelPosition='inline'
                  error={Boolean(errors.fullname) && touched.fullname}
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.fullname}
                />
              </div>
              <div className='textField--country textField'>
                <select name='country'>
                  <option value='vietnam'>Việt Nam</option>
                </select>
              </div>
              <div className='textField--select'>
                <div className='select--province select'>
                  <SelectCheckout
                    placeholder='Select province'
                    name='province'
                    value={values.province.provinceName}
                    onBlur={handleBlur}
                    onChange={handleOnchangeSelectProvince}
                    error={Boolean(errors.province?.provinceName) && touched.province?.provinceName}
                    helperText={errors?.province?.provinceName}
                  >
                    {renderProvince()}
                  </SelectCheckout>
                </div>
                <div className='textField--district select'>
                  <SelectCheckout
                    placeholder='Select district'
                    name='district'
                    value={values.district.districtName}
                    onChange={handleOnchangeSelectDistrict}
                    onBlur={handleBlur}
                    error={Boolean(errors.district?.districtName) && touched.district?.districtName}
                    helperText={errors?.district?.districtName}
                  >
                    {renderDistrict()}
                  </SelectCheckout>
                </div>
                <div className='textField--ward select'>
                  <SelectCheckout
                    placeholder='Select ward'
                    name='ward'
                    error={Boolean(errors.ward?.wardName) && touched.ward?.wardName}
                    value={values.ward.wardName}
                    helperText={errors?.ward?.wardName}
                    onBlur={handleBlur}
                    onChange={handleOnChangeSelectWard}
                  >
                    {renderWard()}
                  </SelectCheckout>
                </div>
              </div>
              <div className='textField--AvailableServices select'>
                <SelectCheckout
                  placeholder='Select type of service'
                  name='service_type_id'
                  error={Boolean(errors.service_type_id) && touched.service_type_id}
                  value={values.service_type_id}
                  helperText={errors.service_type_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {renderAvailableServices()}
                </SelectCheckout>
              </div>
              <div className='textField--address textField'>
                <TextField
                  label='Address'
                  labelPosition='inline'
                  type='text'
                  name='address'
                  error={Boolean(errors.address) && touched.address}
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={errors.address}
                />
              </div>
              <div className='textField--remenber'>
                <input
                  checked={values.remember}
                  name='remember'
                  type='checkbox'
                  id='check-confirm'
                  onChange={handleChange}
                />
                <label htmlFor='check-confirm'> Save this information for next time </label>
              </div>
            </div>
          </div>
          <div className='contact__payment'>
            <div className='payment__header'>
              <h3>Payment</h3>
            </div>
            <div className='payment__select'>
              <div className='select--online select'>
                <input
                  type='radio'
                  id='Online'
                  name='paymentType'
                  value='online'
                  checked={values.paymentType === 'online'}
                  onChange={() => {
                    setFieldValue('paymentType', 'online');
                  }}
                />
                <label htmlFor='Online'>Online payment</label>
              </div>
              <div className='select--offline select'>
                <input
                  type='radio'
                  id='Offline'
                  name='paymentType'
                  value='offline'
                  checked={values.paymentType === 'offline'}
                  onChange={() => {
                    setFieldValue('paymentType', 'offline');
                  }}
                />
                <label htmlFor='Offline'>Offline payment</label>
              </div>
            </div>
          </div>
          <div className='contact__nav'>
            <div className='nav__button'>
              <div className='button--backToCart button'>
                <Button
                  color='tertiary'
                  size='md'
                  type='button'
                  onClick={() => {
                    router.push(APP_ROUTER.CART);
                  }}
                >
                  Back To Cart
                </Button>
              </div>
              <div className='button--finishOrder button'>
                <Button color='primary' size='md' type='submit'>
                  Finsh Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='information__product'>
        <ListProduct
          value={values.coupon}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
      </div>
    </div>
  );
}
