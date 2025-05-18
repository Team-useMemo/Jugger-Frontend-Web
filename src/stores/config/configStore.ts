import { configureStore } from '@reduxjs/toolkit';
import modalToggle from '@stores/modules/todoSlice';
import memo from '@stores/modules/memo';
import { categoryApi } from '@stores/modules/category'; // 추가 필요

const store = configureStore({
  reducer: {
    modal: modalToggle,
    memo,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(categoryApi.middleware), // 👈 이 부분이 핵심!
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
