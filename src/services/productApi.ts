import { ProductDataType } from '@/types/product.type';
import { ReviewsType } from '@/types/review.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const productAPI = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    fetchAllProduct: builder.query<
      { products: ProductDataType[]; totalRows: number },
      {
        limit?: number;
        subcategoryId?: string | string[];
      }
    >({
      query: ({ limit, subcategoryId }) => {
        if (subcategoryId) {
          return `/product/subcategory/${subcategoryId}/?limit=${limit}`;
        }
        return `/product/?limit=${limit}`;
      },
      transformResponse: (response: { products: ProductDataType[]; totalRows: number }) => {
        console.log('transform', response);
        return response;
      },
    }),
    fetchBestSellingProduct: builder.query<
      { products: ProductDataType[]; totalRows: number },
      number | void
    >({
      query: (limit?: number) =>
        limit ? '/product/best-selling/?limit=' + limit : '/product/best-selling',
      transformResponse: (response: { products: ProductDataType[]; totalRows: number }) => {
        console.log('transform2', response);
        return response;
      },
    }),
    fetchNewestProduct: builder.query<{ products: ProductDataType[] | undefined }, number | void>({
      query: (limit?: number) => (limit ? '/product?page=2&limit=' + limit : '/product'),
      transformResponse: (response: { products: ProductDataType[]; totalRows: number }) => {
        console.log('transform2', response);
        return response;
      },
    }),
    getProductById: builder.query<ProductDataType, string | string[] | undefined>({
      // second parameter is type for query arg . here is id
      query: (id: string) => '/product/' + id,
      transformResponse: (response: { product: ProductDataType }) => {
        return response.product;
      },
    }),
    getReviewsByIdProduct: builder.query<ReviewsType[], string | string[] | undefined>({
      // second parameter is type for query arg . here is id
      query: (id: string) => '/review/product/' + id,
      transformResponse: (response: { reviews: ReviewsType[] }) => {
        return response.reviews;
      },
    }),
  };
};

export default productAPI;
