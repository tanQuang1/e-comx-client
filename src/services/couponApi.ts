import { CouponDataType } from '@/types/coupon.tyoe';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const couponAPI = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    checkCoupon: builder.mutation<CouponDataType, string>({
      query: (discountCode) => `/coupon/check-udc?code=${discountCode}`,
    }),
  };
};

export default couponAPI;
