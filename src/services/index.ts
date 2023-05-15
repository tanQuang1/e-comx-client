import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import productAPI from './productApi';
import userAPI from './userApi';
import appAPI from './appApi';
import reviewAPI from './reviewsApi';
import couponAPI from './couponApi';
import orderApi from './orderApi';
import servicesApi from './typeServices';
import regonApi from './regonApi';

export interface SerializedError {
  status?: number;
  message?: string;
  success?: boolean;
}

// const url = 'http://139.180.207.224:1234';
const url = 'https://vhreactshop.online/ecomx-api';

let token;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    ['Authorization']: 'Bearer ' + token,
  },
});

const api = createApi({
  reducerPath: 'clientPageApi',
  baseQuery,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false,
  endpoints: (builder) => ({
    ...appAPI(builder),
    ...productAPI(builder),
    ...userAPI(builder),
    ...reviewAPI(builder),
    ...couponAPI(builder),
    ...orderApi(builder),
    ...regonApi(builder),
    ...servicesApi(builder),
  }),
});
export default api;
