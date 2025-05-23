import { fetchBaseQuery, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query';
const baseURL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as any).status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      // refresh 요청
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: {
            refreshToken,
          },
        },
        api,
        extraOptions,
      );

      if ((refreshResult.data as any)?.accessToken) {
        const newAccessToken = (refreshResult.data as any).accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 원래 요청 재시도
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.warn('리프레시 실패 → 로그인 페이지로 이동');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
  }

  return result;
};
