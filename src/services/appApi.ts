import { CategoryDataType } from '@/types/app.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const appAPI = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    fetchAllCategory: builder.query<{ categories: CategoryDataType[] }, void>({
      query: () => '/category',
    }),
    fetchAllBrands: builder.query<{ brands: string[] }, void>({
      query: () => '/product/brand',
    }),
  };
};

export default appAPI;
