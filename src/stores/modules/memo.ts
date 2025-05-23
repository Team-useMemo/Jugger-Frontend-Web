import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';
import { MemoProp } from '@ts/Memo.Prop';

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo'],
  endpoints: (builder) => ({
    getMemos: builder.query<MemoProp[], string>({
      query: (categoryUuid) => `/api/v1/categories/chat/before?categoryUuid=${categoryUuid}`,
      providesTags: (result) =>
        result
          ? [...result.map((memo) => ({ type: 'Memo' as const, id: memo.id })), { type: 'Memo', id: 'LIST' }]
          : [{ type: 'Memo', id: 'LIST' }],
    }),
    getMemoById: builder.query<MemoProp, string>({
      query: (memoId) => `/api/v1/chat/${memoId}`,
      providesTags: (_result, _error, id) => [{ type: 'Memo', id }],
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

export const {
  useGetMemosQuery,
  usePostMemoMutation,
  usePostCalendarMutation,
  useUploadFileMutation,
  useGetMemoByIdQuery,
} = memoApi;
