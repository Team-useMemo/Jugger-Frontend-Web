import { createApi } from '@reduxjs/toolkit/query/react';
import { CategoryProp, CategoryResponseProp } from '@ts/Category.Prop';
import { customBaseQuery } from './customBaseQuery';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryProp[], void>({
      query: () => `/api/v1/categories/recent`,
      transformResponse: (response: CategoryResponseProp[]) =>
        response
          .map((category) => ({
            categoryId: category.uuid,
            categoryName: category.name,
            isPinned: category.isPinned,
            categoryColor: category.color.replace(/^color/, ''),
            recentMessage: category.recentMessage,
            updateAt: new Date(category.updateAt),
          }))
          .sort((a, b) => new Date(b.updateAt).getTime() - new Date(a.updateAt).getTime()),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ categoryId }) => ({ type: 'Category' as const, id: categoryId })),
              { type: 'Category', id: 'LIST' },
            ]
          : [];
      },
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
        url: '/api/v1/categories/update',
        method: 'PUT',
        body: { categoryId: id, newName: title, newColor: color },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/categories/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),
    togglePin: builder.mutation<void, { id: string; isPinned: boolean }>({
      query: ({ id, isPinned }) => ({
        url: `/api/v1/categories/pin?categoryId=${id}&isPinned=${isPinned}`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
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
