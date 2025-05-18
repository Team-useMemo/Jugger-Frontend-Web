import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryProp } from '@ts/Category.Prop';

const baseURL = import.meta.env.VITE_BASE_URL;

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
          recentMessage: category.recentMessage,
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
