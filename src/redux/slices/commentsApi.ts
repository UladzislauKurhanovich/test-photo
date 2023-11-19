import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQueryWithReAuth } from '../../helpers/baseQueryWithReauth';
import { CommentType } from './types';

const baseQueryWithReauth = createBaseQueryWithReAuth(
  'http://localhost:3001/api'
);

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['commentsList'],
  endpoints: (build) => ({
    getPhotoComments: build.query<any[], {photoId: number}>({
      query: ({ photoId }) => `/photos/${photoId}/comments`,
    }),
    addCommentToPhoto: build.mutation<any, { photoId: number, comment: CommentType }>({
      query: ({ photoId, comment }) => ({
        url: `/photos/${photoId}/comments`,
        method: 'POST',
        body: comment,
      }),
    }),
    deleteComment: build.mutation<any, number>({
      query: (commentId: number) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPhotoCommentsQuery,
  useAddCommentToPhotoMutation,
  useDeleteCommentMutation
} = commentsApi;
