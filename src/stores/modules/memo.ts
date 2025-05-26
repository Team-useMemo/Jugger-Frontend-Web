import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';
import { MemoProp } from '@ts/Memo.Prop';

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo'],
  endpoints: (builder) => ({
    getMemos: builder.query<MemoProp[], { before: string; page: number; size: number }>({
      query: ({ before, page, size }) => `/api/v1/chat/before?before=${before}&page=${page}&size=${size}`,
      providesTags: (result) =>
        result
          ? [...result.map((memo) => ({ type: 'Memo' as const, id: memo.id })), { type: 'Memo', id: 'LIST' }]
          : [{ type: 'Memo', id: 'LIST' }],
    }),
    postMemo: builder.mutation<void, { categoryUuid: string; text: string }>({
      query: ({ categoryUuid, text }) => ({
        url: '/api/v1/chat',
        method: 'POST',
        body: {
          categoryUuid,
          text,
        },
      }),
      invalidatesTags: [{ type: 'Memo', id: 'LIST' }],
    }),
    postCalendar: builder.mutation<void, { name: string; startTime: string; endTime: string; categoryId: string }>({
      query: ({ name, startTime, endTime, categoryId }) => ({
        url: '/api/v1/calendar',
        method: 'POST',
        body: {
          name,
          startTime,
          endTime,
          categoryId,
        },
      }),
      invalidatesTags: [{ type: 'Memo', id: 'LIST' }],
    }),
    uploadFile: builder.mutation<void, { file: File; category_uuid: string }>({
      query: ({ file, category_uuid }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category_uuid', category_uuid);

        return {
          url: '/api/v1/upload/files',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Memo', id: 'LIST' }],
    }),
  }),
});

export const { useGetMemosQuery, usePostMemoMutation, usePostCalendarMutation, useUploadFileMutation } = memoApi;
