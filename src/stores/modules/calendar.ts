import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CalendarState {
  value: Date | null;
}

const initialState: CalendarState = {
  value: null,
};

export const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // setModal
    // "PayloadAction"를 이용해서 "payload"타입 지정
    setCalendarDate: (state, action: PayloadAction<Date | null>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
    clearCalendarDate: (state) => {
      state.value = null;
    },
  },
});

//actions
export const { setCalendarDate, clearCalendarDate } = CalendarSlice.actions;

// //actions
// export const { modalToggleAction } = toggleSlice.actions;

// // slice의 상태값
// export const modalState = (state: RootState) => state.modal.value;
