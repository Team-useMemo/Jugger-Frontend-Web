import { createApi } from '@reduxjs/toolkit/query/react';
import { MemoResponseProp } from '@ts/Memo.Prop';
import { customBaseQuery } from './customBaseQuery';

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo'],
  endpoints: (builder) => ({
    getMemos: builder.query<MemoResponseProp[], { before?: string; page: number; size: number }>({
      query: ({ before = new Date().toISOString(), page, size }) =>
        `/api/v1/chat/before?before=${before}&page=${page}&size=${size}`,
      transformResponse: (response: any) => {
        return response
          .flatMap((categoryBlock: any) =>
            categoryBlock.chatItems.map((item: any, index: number) => {
              const type = item.linkUrl ? 'link' : item.scheduleName ? 'schedule' : item.imgUrl ? 'photo' : 'text';

              const content =
                type === 'schedule'
                  ? {
                      title: item.scheduleName,
                      startDate: item.scheduleStartDate ? new Date(item.scheduleStartDate) : null,
                      endDate: item.scheduleEndDate ? new Date(item.scheduleEndDate) : null,
                    }
                  : type === 'link'
                    ? item.linkUrl
                    : type === 'photo'
                      ? item.imgUrl
                      : item.data;

              return {
                id: index,
                type,
                content,
                date: new Date(item.timestamp),
                categoryId: categoryBlock.categoryId,
              };
            }),
          )
          .sort((a: MemoResponseProp, b: MemoResponseProp) => a.date.getTime() - b.date.getTime());
      },
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
