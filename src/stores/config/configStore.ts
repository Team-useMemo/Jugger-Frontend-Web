//configStore.ts
import { configureStore } from '@reduxjs/toolkit';
import modalToggle from '../modules/todoSlice';
import counterSlice from '../modules/counterSlice';
import categorySlice from '@stores/modules/category';
import memoSlice from '@stores/modules/memo';

//1. configureStore 함수를 사용하여 store를 생성
//2. configureStore 함수의 인자로는 reducer 속성이 포함된 객체(module)가 전달
const store = configureStore({
  reducer: {
    modalToggle,
    counterSlice,
    categorySlice,
    memoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

//스토어의 전체 상태 타입을 RootState 타입으로 정의
//ReturnType<typeof store.getState>: 스토어의 getState 메서드의 반환값을 나타낸다.
export type RootState = ReturnType<typeof store.getState>;

// 스토어의 디스패치 함수 타입을 AppDispatch 타입으로 정의
// typeof store.dispatch: 스토어의 dispatch 메서드의 타입을 나타낸다.
export type AppDispatch = typeof store.dispatch;

//최상위 컴포넌트에 제공할 store
export default store;
