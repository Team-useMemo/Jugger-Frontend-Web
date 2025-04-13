import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';
import { fetchCategory } from '@controllers/api';
import { CategoryProp } from '@ts/Category.Prop';

const initialState: {
  value: CategoryProp[];
} = {
  value: [],
};

//slice 설정
export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    loadCategories: (state, action: PayloadAction<string>) => {
      state.value = [...fetchCategory(action.payload)];
    },
    addCategory: (state, action: PayloadAction<any>) => {
      // post로 카테고리 보낸 후 id 받아와야 함
      const id =
        state.value.reduce((acc, e) => {
          return Math.max(acc, Number(e.id));
        }, 0) + 1;

      state.value = [
        ...state.value,
        {
          id: id.toString(),
          pinned: false,
          content: 'empty',
          lastDate: new Date(),
          ...action.payload,
        },
      ];
    },
    editCategory: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        color: string;
      }>,
    ) => {
      const { id, title, color } = action.payload;
      state.value = state.value.map((category) => (category.id === id ? { ...category, title, color } : category));
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((category) => category.id !== action.payload);
    },
    togglePin: (state, action: PayloadAction<string>) => {
      state.value = state.value.map((category) =>
        category.id === action.payload ? { ...category, pinned: !category.pinned } : category,
      );
    },
  },
});

//actions
export const { loadCategories, addCategory, editCategory, deleteCategory, togglePin } = categorySlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.categorySlice.value;

//slice의 reducers
export default categorySlice.reducer;
