import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';

//초기 상태 타입
interface ModalState {
  value: boolean;
}

//초기값 상태 값
const initialState: ModalState = {
  value: false,
};

//slice 설정
export const toggleSlice = createSlice({
  name: 'modalTodo',
  initialState,
  reducers: {
    // "PayloadAction"를 이용해서 "payload"타입 지정
    modalToggleAction: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

//actions
export const { modalToggleAction } = toggleSlice.actions;

// slice의 상태값
export const modalState = (state: RootState) => state.modal.value;

//slice의 reducers
export default toggleSlice.reducer;
