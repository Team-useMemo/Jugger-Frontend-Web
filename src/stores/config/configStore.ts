import { configureStore } from '@reduxjs/toolkit';
import modalToggle from '@stores/modules/todoSlice';
import counter from '@stores/modules/counterSlice';
import category from '@stores/modules/category';
import memo from '@stores/modules/memo';

const store = configureStore({
  reducer: {
    modal: modalToggle,
    counter,
    category,
    memo,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
