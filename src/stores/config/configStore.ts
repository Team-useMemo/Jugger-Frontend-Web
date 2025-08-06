import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// 추가 필요
import { CalendarSlice } from '@stores/modules/calendar';
import { categoryApi } from '@stores/modules/category';
import { memoApi } from '@stores/modules/memo';
import { ModalSlice } from '@stores/modules/modal';

const store = configureStore({
  reducer: {
    modal: ModalSlice.reducer,
    calendar: CalendarSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [memoApi.reducerPath]: memoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(categoryApi.middleware, memoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
