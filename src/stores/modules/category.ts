import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';
import { fetchCategory } from '@controllers/api';

//초기 상태 타입
interface ModalState {
  value: any[];
}

//초기값 상태 값
const initialState: ModalState = {
  value: [],
};

//slice 설정
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // modalToggleAction: (state, action: PayloadAction<boolean>) => {
    //   state.value = action.payload;
    // },
    loadCategories: (state) => {
      state.value = [...fetchCategory('username')];
    },
  },
});

//actions
export const { loadCategories } = categorySlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.modalToggle.value;

//slice의 reducers
export default categorySlice.reducer;
