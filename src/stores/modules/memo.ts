import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';
import { fetchAllMemo } from '@controllers/api';
import { MemoProp, scheduleProp } from '@ts/Memo.Prop';
import { userMemoType } from '@ts/type';

//초기값 상태 값
const initialState: { value: MemoProp[] } = {
  value: [],
};

//slice 설정
export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    loadMemos: (state, action: PayloadAction<string>) => {
      state.value = [...fetchAllMemo(action.payload)];
    },
    addMemos: (
      state,
      action: PayloadAction<{
        type: userMemoType;
        content: string | scheduleProp;
        categoryId: string | null;
      }>,
    ) => {
      state.value = [
        ...state.value,
        {
          id: state.value.length + 1,
          date: new Date(),
          ...action.payload,
        },
      ];
    },
  },
});

//actions
export const { loadMemos, addMemos } = memoSlice.actions;

// slice의 상태값
export const categoryState = (state: RootState) => state.memoSlice.value;

//slice의 reducers
export default memoSlice.reducer;
