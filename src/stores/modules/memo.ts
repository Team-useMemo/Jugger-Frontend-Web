import { createApi } from '@reduxjs/toolkit/query/react';
import { CalendarResponseProp, LinkResponseProp, MemoProp, MemoResponseProp, PhotoResponseProp } from '@ts/Memo.Prop';
import { customBaseQuery } from './customBaseQuery';

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo', 'Calendar', 'Photo', 'Link'],
  endpoints: (builder) => ({
    getMemos: builder.query<MemoProp[], { before?: string; page: number; size: number }>({
      query: ({ before = new Date(Date.now() + 1000).toISOString(), page, size }) =>
        `/api/v1/chat/before?before=${before}&page=${page}&size=${size}`,
      transformResponse: (response: any): MemoProp[] => {
        console.log(response);
        return response
          .flatMap((categoryBlock: any) =>
            categoryBlock.chatItems.map((item: any) => {
              const type = item.linkUrl
                ? 'link'
                : item.scheduleName
                  ? 'schedule'
                  : item.imgUrl
                    ? 'photo'
                    : 'text';

              const content =
                type === 'schedule'
                  ? {
                    title: item.scheduleName,
                    startDate: item.scheduleStartDate ? new Date(item.scheduleStartDate) : undefined,
                    endDate: item.scheduleEndDate ? new Date(item.scheduleEndDate) : undefined,
                  }
                  : type === 'link'
                    ? item.linkUrl
                    : type === 'photo'
                      ? item.imgUrl
                      : item.data;

              return {
                chatId: item.chatId,
                type,
                content,
                date: new Date(item.timestamp),
                categoryId: categoryBlock.categoryId ?? undefined,
                categoryName: categoryBlock.categoryName ?? undefined,
                categoryColor: categoryBlock.categoryColor ?? undefined,
              };
            })
          )
          .sort((a: MemoResponseProp, b: MemoResponseProp) => b.date.getTime() - a.date.getTime());
      },
      // serializeQueryArgs: ({ endpointName }) => endpointName,
      // merge: (currentCache, newItems) => {
      //   currentCache.push(...newItems);
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg?.page !== previousArg?.page;
      // },
      providesTags: (result): readonly { type: 'Memo'; id: string | number }[] =>
        result
          ? [
            ...result.map((memo) => ({
              type: 'Memo' as const,
              id: memo.chatId,
            })),
            { type: 'Memo', id: 'LIST' },
          ]
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
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Link', id: 'LIST' },
      ],
    }),

    deleteMemo: builder.mutation<void, { chatId: string }>({
      query: ({ chatId }) => ({
        url: `/api/v1/chat?chatId=${chatId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Link', id: 'LIST' },
      ],
    }),
    postCalendar: builder.mutation<void, { name: string; place: string; alarm: Date | null, description: string, startTime: string; endTime?: string; categoryId: string }>({
      query: ({ name, place, alarm, description, startTime, endTime, categoryId }) => ({
        url: '/api/v1/calendar',
        method: 'POST',
        body: {
          name,
          place,
          alarm,
          description,
          startTime,
          endTime,
          categoryId,
        },
      }),
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Calendar', id: 'LIST' },
      ],
    }),
    getCalendar: builder.query<MemoProp[], { start?: string; end?: string }>({
      query: ({ start = '2025-01-01T00:00:00.007Z', end = '2025-12-31T00:00:00.007Z' }) => ({
        url: `/api/v1/calendar?start=${start}&end=${end}`,
        method: 'GET',
      }),
      transformResponse: (response: CalendarResponseProp[]): MemoProp[] => {
        return response
          .map(
            (e,) =>
              ({
                chatId: e.chatId,
                type: 'schedule',
                content: {
                  title: e.title,
                  startDate: new Date(e.startDateTime),
                  endDate: e.endDateTime ? new Date(e.endDateTime) : null,
                },
                categoryId: e.categoryId,
                date: new Date(e.startDateTime),
              }) as MemoProp,
          )
          .sort((a: MemoProp, b: MemoProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Calendar', id: 'LIST' }] : []),
    }),
    uploadFile: builder.mutation<void, { file: File; categoryId: string }>({
      query: ({ file, categoryId }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('categoryId', categoryId);

        return {
          url: '/api/v1/upload/file',
          method: 'POST',
          body: formData,
          responseHandler: 'text',
        };
      },
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Photo', id: 'LIST' },
      ],
    }),
    getPhotos: builder.query<MemoProp[], { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `/api/v1/photos?categoryId=${categoryId}`,
        method: 'GET',
      }),
      transformResponse: (response: PhotoResponseProp[]): MemoProp[] => {
        return response
          .map(
            (e) =>
              ({
                chatId: e.chatId,
                type: 'photo',
                content: e.url,
                categoryId: e.categoryName,
                date: new Date(e.timestamp),
              }) as MemoProp,
          )
          .sort((a: MemoProp, b: MemoProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Photo', id: 'LIST' }] : []),
    }),
    getLinks: builder.query<MemoProp[], { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `/api/v1/links?categoryId=${categoryId}`,
        method: 'GET',
      }),
      transformResponse: (response: any): MemoProp[] => {
        if (!response?.[0]) return [];
        const { linkData } = response[0];
        return linkData.map((e: LinkResponseProp, i: number) => ({
          memoId: i,
          type: 'link',
          content: e.link,
          categoryId: response[0].categoryUuid,
          date: new Date(new Date().getTime() + i),
        }));
      },
      providesTags: (result) => (result ? [{ type: 'Link', id: 'LIST' }] : []),
    }),
  }),
});

export const {
  useGetMemosQuery,
  usePostMemoMutation,
  usePostCalendarMutation,
  useGetCalendarQuery,
  useUploadFileMutation,
  useGetPhotosQuery,
  useGetLinksQuery,
  useDeleteMemoMutation,
} = memoApi;
