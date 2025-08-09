import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CalendarResponseProp,
  LinkResponseProp,
  MemoProp,
  MemoResponseProp,
  // MemoResponseProp,
  PhotoResponseProp,
  scheduleAlarms,
  scheduleProp,
} from '@ts/Memo.Prop';
import { customBaseQuery } from './customBaseQuery';

const getScheduleMemoContent = (response: any) => {
  const startDateTime = response.scheduleStartDate || response.startDateTime;
  const endDateTime = response.scheduleEndDate || response.endDateTime;
  const title = response.scheduleName || response.title;

  const startDate = new Date(startDateTime);
  const endDate = endDateTime ? new Date(endDateTime) : null;
  const alarmDate = response.alarm ? new Date(response.alarm) : null;

  return {
    title: title,
    place: response.place,
    alarm: alarmDate
      ? scheduleAlarms.find((e) => e.minute == (startDate.getTime() - alarmDate.getTime()) / (60 * 1000))
      : null,
    description: response.description,
    startDate,
    endDate,
  } as scheduleProp;
};

export const memoApi = createApi({
  reducerPath: 'memoApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Memo', 'Calendar', 'Photo', 'Link'],
  endpoints: (builder) => ({
    getMemos: builder.query<
      MemoProp[],
      {
        before?: string;
        after?: string;
        page?: number;
        size?: number;
        categoryId?: string;
      }
    >({
      query: ({ before, after, page = 0, size = 20, categoryId }) => {
        const params = new URLSearchParams({ page: `${page}`, size: `${size}` });

        if (categoryId) params.set('categoryId', categoryId);

        if (before) params.set('before', before);
        else if (after) params.set('after', after);
        else params.set('before', new Date(Date.now() + 10000).toISOString()); // 초기 로딩

        const base = categoryId ? '/api/v1/categories/chat' : '/api/v1/chat';
        const dir = after ? 'after' : 'before';
        return `${base}/${dir}?${params.toString()}`;
      },
      transformResponse: (response: any): MemoProp[] => {
        console.log(response);

        return response
          .map((item: any) => {
            const content =
              item.type === 'CALENDAR'
                ? getScheduleMemoContent(item)
                : item.type === 'PHOTO'
                  ? {
                      imgUrl: item.imgUrl,
                      description: item.description,
                    }
                  : item.content;

            return {
              chatId: item.chatId,
              type: item.type,
              content,
              date: new Date(item.timestamp),
              categoryId: item.categoryId,
              updatedAt: new Date(),
            };
          })
          .sort((a: MemoResponseProp, b: MemoResponseProp) => b.date.getTime() - a.date.getTime());
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}_${queryArgs?.categoryId ?? 'all'}`,
      merge: (currentCache, newItems, { arg }) => {
        const isInitialLoad = !arg?.before && !arg?.after;

        if (isInitialLoad) {
          currentCache.length = 0; // 초기화
          currentCache.push(...newItems);
          return;
        }

        if (arg?.before) {
          currentCache.push(...newItems); // 과거 채팅 뒤에 추가
        } else {
          currentCache.unshift(...newItems); // 최신 채팅 앞에 추가
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.categoryId !== previousArg?.categoryId;
      },
      // providesTags: (result): readonly { type: 'Memo'; id: string | number }[] => {
      //   console.log('123', result);
      //   return result
      //     ? [
      //         ...result.map((memo) => ({
      //           type: 'Memo' as const,
      //           id: memo.chatId,
      //         })),
      //         { type: 'Memo', id: `LIST` },
      //       ]
      //     : [{ type: 'Memo', id: `LIST` }];
      // },
    }),
    postMemo: builder.mutation<void, { categoryUuid?: string; text: string }>({
      query: ({ categoryUuid = 'temp', text }) => ({
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
    patchMemo: builder.mutation<void, { chatId: string; categoryId: string }>({
      query: ({ chatId, categoryId }) => ({
        url: `/api/v1/chat/category?chatId=${chatId}&newCategoryId=${categoryId}`,
        method: 'PATCH',
      }),
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Link', id: 'LIST' },
      ],
    }),
    postCalendar: builder.mutation<
      void,
      {
        name: string;
        place: string;
        alarm?: string;
        description: string;
        startTime: string;
        endTime?: string;
        categoryId?: string;
      }
    >({
      query: ({ name, place, alarm, description, startTime, endTime, categoryId = 'temp' }) => ({
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
    getCalendar: builder.query<MemoProp[], { categoryId?: string; start?: string; end?: string }>({
      query: ({ categoryId, start = '2025-01-01T00:00:00.007Z', end = '2025-12-31T00:00:00.007Z' }) => {
        const params = new URLSearchParams({ start: `${start}`, end: `${end}` });

        if (categoryId) params.set('categoryId', categoryId);

        const base = categoryId ? '/api/v1/calendar/category' : '/api/v1/calendar';

        return {
          url: `${base}?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: CalendarResponseProp[]): MemoProp[] => {
        console.log(response);
        return response
          .map((e) => {
            return {
              chatId: e.chatId,
              type: 'CALENDAR',
              content: getScheduleMemoContent(e),
              categoryId: e.categoryId,
              date: new Date(e.startDateTime),
            } as MemoProp;
          })
          .sort((a: MemoProp, b: MemoProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Calendar', id: 'LIST' }] : []),
    }),
    putCalendar: builder.mutation<
      void,
      {
        title: string;
        place?: string;
        alarm?: string;
        description?: string;
        startDate: string;
        endDate?: string;
        chatId: string;
      }
    >({
      query: ({ chatId, title, place, alarm, description, startDate, endDate }) => ({
        url: '/api/v1/calendar',
        method: 'PUT',
        body: {
          chatId,
          title: title,
          start: startDate,
          end: endDate,
          place,
          alarm,
          description,
        },
      }),
      invalidatesTags: [
        { type: 'Memo', id: 'LIST' },
        { type: 'Calendar', id: 'LIST' },
      ],
    }),
    uploadFile: builder.mutation<void, { file: File; categoryId?: string; description: string }>({
      query: ({ file, categoryId = 'temp', description }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('categoryId', categoryId);
        formData.append('description', description);
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
    getPhotos: builder.query<MemoProp[], { categoryId?: string; before?: string; page: number; size: number }>({
      query: ({ categoryId, before = new Date(Date.now() + 10000).toISOString(), page, size }) => {
        const params = new URLSearchParams({ before: `${before}`, page: `${page}`, size: `${size}` });

        if (categoryId) params.set('categoryId', categoryId);

        const base = categoryId ? '/api/v1/photos/category' : '/api/v1/photos/duration';

        return {
          url: `${base}?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: PhotoResponseProp[]): MemoProp[] => {
        console.log(response);
        return response
          .map(
            (e) =>
              ({
                chatId: e.photoId,
                type: 'PHOTO',
                content: {
                  imgUrl: e.url,
                  description: e.description,
                },
                categoryId: e.categoryId,
                date: new Date(e.timestamp),
              }) as MemoProp,
          )
          .sort((a: MemoProp, b: MemoProp) => a.date.getTime() - b.date.getTime());
      },
      providesTags: (result) => (result ? [{ type: 'Photo', id: 'LIST' }] : []),
    }),
    getLinks: builder.query<MemoProp[], { categoryId?: string; before?: string; page: number; size: number }>({
      query: ({ categoryId, before = new Date(Date.now() + 10000).toISOString(), page, size }) => {
        const params = new URLSearchParams({ before: `${before}`, page: `${page}`, size: `${size}` });

        if (categoryId) params.set('categoryId', categoryId);

        const base = categoryId ? '/api/v1/links/category' : '/api/v1/links';

        return {
          url: `${base}?${params.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response: any): MemoProp[] => {
        return response.map((e: LinkResponseProp, i: number) => ({
          memoId: i,
          type: 'link',
          content: e.link,
          categoryId: e.categoryId,
          date: new Date(new Date().getTime() + i),
        }));
      },
      providesTags: (result) => (result ? [{ type: 'Link', id: 'LIST' }] : []),
    }),
  }),
});

export const {
  useLazyGetMemosQuery,
  useGetMemosQuery,
  usePostMemoMutation,
  usePostCalendarMutation,
  useGetCalendarQuery,
  useUploadFileMutation,
  useGetPhotosQuery,
  useGetLinksQuery,
  useDeleteMemoMutation,
  usePutCalendarMutation,
  usePatchMemoMutation,
} = memoApi;
