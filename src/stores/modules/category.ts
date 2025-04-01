import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    loadCategories: (state, action: PayloadAction<string | undefined>) => {
      state.value = [...fetchCategory(action.payload)];
    },
    addCategory: (state, action: PayloadAction<any>) => {
      const id =
        state.value.reduce((acc, e) => {
          return Math.max(acc, e.id);
        }, 0) + 1;

      state.value = [
        ...state.value,
        {
          id: id,
          pinned: false,
          content: 'empty',
          lastDate: new Date(),
          ...action.payload,
        },
      ];
    },
  },
});

//actions
export const { loadCategories, addCategory } = categorySlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.modalToggle.value;

//slice의 reducers
export default categorySlice.reducer;
