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
    editCategory: (state, action: PayloadAction<any>) => {
      const { id, title, color } = action.payload;
      state.value = state.value.map((category) => (category.id === id ? { ...category, title, color } : category));
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((category) => category.id !== action.payload);
    },
  },
});

//actions
export const { loadCategories, addCategory, editCategory, deleteCategory } = categorySlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.categorySlice.value;

//slice의 reducers
export default categorySlice.reducer;
