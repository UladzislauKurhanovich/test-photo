import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { sessionAuthDataHandler } from './sessionAuthDataHandler';

export const createBaseQueryWithReAuth =
  (
    baseUrl: string | undefined
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        const { jwtToken } = sessionAuthDataHandler.getTokens();

        if (jwtToken) {
          headers.set('Authorization', `Bearer ${jwtToken}`);
        }

        return headers;
      },
    });

    return await baseQuery(args, api, extraOptions);
  };
