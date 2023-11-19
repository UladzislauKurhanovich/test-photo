import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReAuth } from '../../helpers/baseQueryWithReauth';


const baseQueryWithReauth = createBaseQueryWithReAuth(
  'http://localhost:3001'
);

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  tagTypes: ['userDetails'],
  endpoints: (build) => ({
    getUser: build.query<any, void>({
      query: () => `/user/details`,
    }),
  }),
});

export const {
  useGetUserQuery
} = userApi;
