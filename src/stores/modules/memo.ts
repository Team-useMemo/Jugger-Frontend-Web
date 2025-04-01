import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';
import { fetchAllMemo } from '@controllers/api';

//초기 상태 타입
interface ModalState {
  value: any[];
}

//초기값 상태 값
const initialState: ModalState = {
  value: [],
};

//slice 설정
export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    // modalToggleAction: (state, action: PayloadAction<boolean>) => {
    //   state.value = action.payload;
    // },
    loadMemos: (state, action: PayloadAction<string | undefined>) => {
      state.value = [...fetchAllMemo(action.payload)];
    },
    addMemos: (state, action: PayloadAction<any>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

//actions
export const { loadMemos, addMemos } = memoSlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.memoSlice.value;

//slice의 reducers
export default memoSlice.reducer;
