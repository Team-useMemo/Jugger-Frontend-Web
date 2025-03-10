import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';

//초기 상태 타입
interface ModalState {
  value: number;
}

//초기값 상태 값
const initialState: ModalState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.value);
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

// slice의 상태값
export const counterState = (state: RootState) => state.modalToggle.value;

export default counterSlice.reducer;
