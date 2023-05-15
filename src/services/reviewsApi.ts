import { FormReviewsType, AddReviewType } from '@/types/review.type';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const reviewAPI = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    never,
    'clientPageApi'
  >,
) => {
  return {
    addReviews: builder.mutation<AddReviewType, FormReviewsType>({
      query: (body: FormReviewsType) => {
        return {
          url: '/review/',
          method: 'POST',
          body,
        };
      },
    }),
  };
};

export default reviewAPI;
