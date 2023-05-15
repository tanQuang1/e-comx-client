import { CreateOrderFormType, responseCreateOrderType } from '@/types/order.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const orderApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    createOrder: builder.mutation<responseCreateOrderType, CreateOrderFormType>({
      query: (body: CreateOrderFormType) => {
        return {
          url: '/order',
          method: 'POST',
          body,
        };
      },
    }),
  };
};

export default orderApi;
