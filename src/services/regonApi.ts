import { DistrictType, ProvinceType, WardType } from '@/types/GHN.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const regonApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    getProvince: builder.query<ProvinceType[], void>({
      query: () => ({
        url: '/shipping/master-data/province',
        method: 'GET',
      }),
      transformResponse: (response: { data: ProvinceType[] }) => {
        return response.data;
      },
    }),
    getDistrict: builder.mutation<DistrictType[], number>({
      query: (proviceId: number) => ({
        url: `/shipping/master-data/district?province_id=${proviceId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: DistrictType[] }) => {
        return response.data;
      },
    }),
    getWard: builder.mutation<WardType[], number>({
      query: (wardId: number) => ({
        url: `/shipping/master-data/ward?district_id=${wardId}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: WardType[] }) => {
        return response.data;
      },
    }),
  };
};

export default regonApi;
