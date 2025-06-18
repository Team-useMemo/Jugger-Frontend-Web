import { createApi } from '@reduxjs/toolkit/query/react';
import { CalendarResponseProp, LinkResponseProp, MemoResponseProp, PhotoResponseProp } from '@ts/Memo.Prop';
import { customBaseQuery } from './customBaseQuery';

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo', 'Calendar', 'Photo', 'Link'],
  endpoints: (builder) => ({
    getMemos: builder.query<MemoResponseProp[], { before?: string; page: number; size: number }>({
      query: ({ before = new Date(Date.now() + 1000).toISOString(), page, size }) =>
        `/api/v1/chat/before?before=${before}&page=${page}&size=${size}`,
      transformResponse: (response: any): MemoResponseProp[] => {
        return response
          .flatMap((categoryBlock: any) =>
            categoryBlock.chatItems.map((item: any, index: number) => {
              const type = item.linkUrl ? 'link' : item.scheduleName ? 'schedule' : item.imgUrl ? 'photo' : 'text';

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
                id: index,
                type,
                content,
                date: new Date(item.timestamp),
                categoryId: categoryBlock.categoryId ?? undefined,
              };
            }),
          )
          .sort((a: MemoResponseProp, b: MemoResponseProp) => b.date.getTime() - a.date.getTime());
      },
      providesTags: (result): readonly { type: 'Memo'; id: string | number }[] =>
        result
          ? [
              ...result.map((memo) => ({
                type: 'Memo' as const,
                id: memo.id,
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
    postCalendar: builder.mutation<void, { name: string; startTime: string; endTime?: string; categoryId: string }>({
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
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Calendar', id: 'LIST' },
      ],
    }),
    getCalendar: builder.query<MemoResponseProp[], { start?: string; end?: string }>({
      query: ({ start = '2025-01-01T00:00:00.007Z', end = '2025-12-31T00:00:00.007Z' }) => ({
        url: `/api/v1/calendar?start=${start}&end=${end}`,
        method: 'GET',
      }),
      transformResponse: (response: CalendarResponseProp[]): MemoResponseProp[] => {
        return response
          .map(
            (e, i: number) =>
              ({
                id: i,
                type: 'schedule',
                content: {
                  title: e.title,
                  startDate: new Date(e.startDateTime),
                  endDate: e.endDateTime ? new Date(e.endDateTime) : null,
                },
                categoryId: e.categoryId,
                categoryColor: e.categoryColor,
                date: new Date(e.startDateTime),
              }) as MemoResponseProp,
          )
          .sort((a: MemoResponseProp, b: MemoResponseProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Calendar', id: 'LIST' }] : []),
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
          responseHandler: 'text',
        };
      },
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Photo', id: 'LIST' },
      ],
    }),
    getPhotos: builder.query<MemoResponseProp[], { category_uuid: string }>({
      query: ({ category_uuid }) => ({
        url: `/api/v1/photos?category_uuid=${category_uuid}`,
        method: 'GET',
      }),
      transformResponse: (response: PhotoResponseProp[]): MemoResponseProp[] => {
        return response
          .map(
            (e, i: number) =>
              ({
                id: i,
                type: 'image',
                content: e.url,
                categoryId: e.categoryName,
                date: new Date(e.timestamp),
              }) as MemoResponseProp,
          )
          .sort((a: MemoResponseProp, b: MemoResponseProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Photo', id: 'LIST' }] : []),
    }),
    getLinks: builder.query<MemoResponseProp[], { categoryId: string }>({
      query: ({ categoryId }) => ({
        url: `/api/v1/links?categoryId=${categoryId}`,
        method: 'GET',
      }),
      transformResponse: (response: any): MemoResponseProp[] => {
        if (!response?.[0]) return [];
        const { linkData } = response[0];
        return linkData.map((e: LinkResponseProp, i: number) => ({
          id: i,
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
} = memoApi;
