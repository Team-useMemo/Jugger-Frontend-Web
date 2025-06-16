import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@stores/config/configStore';

interface ModalState {
  value: any;
}

const initialState: ModalState = {
  value: null,
};

export const ModalSlice = createSlice({
  name: 'm1odal',
  initialState,
  reducers: {
    setModalValue: (state, action: PayloadAction<{ name: string; value: any }>) => {
      state.value = {
        ...state.value,
        [action.payload.name]: {
          state: state.value[action.payload.name].state ?? false,
          value: action.payload.value,
        },
      };
    },
    setModalOpen: (state, action: PayloadAction<{ name: string; value?: any }>) => {
      state.value = {
        ...state.value,
        [action.payload.name]: {
          state: true,
          value: action.payload.value,
        },
      };
    },
    setModalClose: (state, action: PayloadAction<string>) => {
      state.value = {
        ...state.value,
        [action.payload]: {
          state: false,
          value: state.value[action.payload].value ?? null,
        },
      };
    },
  },
});

//actions
export const { setModalValue, setModalOpen, setModalClose } = ModalSlice.actions;

// slice의 상태값
export const modalState = (state: RootState) => state.modal.value;

export const getModalIsOpen = (modal: ReturnType<typeof modalState>, name: string) => modal?.[name]?.state;

export const getModalValue = (modal: ReturnType<typeof modalState>, name: string) => modal?.[name]?.value;

// //actions
// export const { modalToggleAction } = toggleSlice.actions;

// // slice의 상태값
// export const modalState = (state: RootState) => state.modal.value;
