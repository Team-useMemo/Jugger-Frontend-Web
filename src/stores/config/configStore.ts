import { configureStore } from '@reduxjs/toolkit';
import modalToggle from '@stores/modules/todoSlice';
import { memoApi } from '@stores/modules/memo';
import { categoryApi } from '@stores/modules/category'; // 추가 필요

const store = configureStore({
  reducer: {
    modal: modalToggle,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [memoApi.reducerPath]: memoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(categoryApi.middleware, memoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
