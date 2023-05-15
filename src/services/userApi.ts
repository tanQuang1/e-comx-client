import { LoginFormDataType, RegisterFormDataType, UserDataType } from '@/types/user.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { toast } from 'react-toastify';

const userAPI = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    getUserDetail: builder.query<UserDataType, void>({
      // second parameter is type for query arg . here is id
      query: () => '/user/detail',
    }),
    login: builder.mutation<UserDataType, LoginFormDataType>({
      query: (body: LoginFormDataType) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body,
        };
      },
      transformErrorResponse: (response: any) => {
        toast.error(response.data.message as any);
        return response;
      },
      transformResponse: (response: any) => {
        return response;
      },
    }),
    register: builder.mutation<UserDataType, RegisterFormDataType>({
      query: (body: RegisterFormDataType) => {
        return {
          url: '/auth/register',
          method: 'POST',
          body,
        };
      },
      transformErrorResponse: (response: any) => {
        toast.error(response.data.message as any);
        return response;
      },
      transformResponse: (response: any) => {
        return response;
      },
    }),
  };
};

export default userAPI;
