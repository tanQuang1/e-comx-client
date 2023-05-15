import { AvailableServicesType } from '@/types/GHN.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const servicesApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  const from_district = 3440;
  return {
    getAvailableServices: builder.mutation<AvailableServicesType[], number>({
      query: (to_district: number) => ({
        url: `/shipping/shipping-order/available-services?from_district=${from_district}&to_district=${to_district}`,
      }),
      transformResponse: (response: { data: AvailableServicesType[] }) => {
        return response.data;
      },
    }),
  };
};

export default servicesApi;
