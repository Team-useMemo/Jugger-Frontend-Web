import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './customBaseQuery';
import { CategoryProp } from '@ts/Category.Prop';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryProp[], void>({
      query: () => `/api/v1/categories/recent`,
      transformResponse: (response: CategoryProp[]) =>
        response.map((category) => ({
          uuid: category.uuid,
          name: category.name,
          isPinned: category.isPinned,
          color: category.color.replace(/^color/, ''),
          recentMessage: category.recentMessage ?? {
            content: '대화를 시작해보세요!',
            createdAt: new Date().toISOString(),
          },
          updatedAt: new Date(category.updatedAt),
        })),
      providesTags: (result) =>
        result
          ? [...result.map(({ uuid }) => ({ type: 'Category' as const, uuid })), { type: 'Category', id: 'LIST' }]
          : [],
    }),
    addCategory: builder.mutation<void, { name: string; color: string }>({
      query: (body) => ({
        url: '/api/v1/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    editCategory: builder.mutation<void, { id: string; title: string; color: string }>({
      query: ({ id, title, color }) => ({
        url: `/api/v1/categories/${id}`,
        method: 'PATCH',
        body: { name: title, color },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Category', id }],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),
    togglePin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/categories/pin/${id}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useTogglePinMutation,
} = categoryApi;
