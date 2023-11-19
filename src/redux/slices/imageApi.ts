import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReAuth } from '../../helpers/baseQueryWithReauth';
import { ImageType } from './types';

const baseQueryWithReauth = createBaseQueryWithReAuth(
  'http://localhost:3001/api'
);

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['imageList'],
  endpoints: (build) => ({
    getImageList: build.query<ImageType[], void>({
      query: () => `/photos`,
    }),
  }),
});

export const {
  useGetImageListQuery
} = imageApi;
