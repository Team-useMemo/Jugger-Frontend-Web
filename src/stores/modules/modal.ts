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
          state: 'set',
          value: action.payload.value,
        },
      };
    },
    setModalOpen: (state, action: PayloadAction<{ name: string; value?: any; replaced?: boolean }>) => {
      state.value = {
        ...state.value,
        [action.payload.name]: {
          state: 'open',
          value: action.payload.value,
          replaced: action.payload.replaced,
        },
      };
    },
    setModalClose: (state, action: PayloadAction<{ name: string; value?: any; to?: string; replace?: boolean }>) => {
      state.value = {
        ...state.value,
        [action.payload.name]: {
          state: 'close',
          value: action.payload.value,
          to: action.payload.to,
          replace: action.payload.replace,
        },
      };
    },
    setModalReplace: (state, action: PayloadAction<{ prev: string; to: string; value?: any; replace?: boolean }>) => {
      state.value = {
        ...state.value,
        [action.payload.prev]: {
          state: 'replace',
          value: action.payload.value,
          to: action.payload.to,
          replace: action.payload.replace,
        },
        [action.payload.to]: {
          state: 'replaced',
          value: action.payload.value,
        },
      };
    },
  },
});

//actions
export const { setModalValue, setModalOpen, setModalClose, setModalReplace } = ModalSlice.actions;

// slice의 상태값
export const modalState = (state: RootState) => state.modal.value;

export const getModalIsOpen = (modal: ReturnType<typeof modalState>, name: string) => modal?.[name]?.state;

export const getModalValue = (modal: ReturnType<typeof modalState>, name: string) => modal?.[name]?.value;

// //actions
// export const { modalToggleAction } = toggleSlice.actions;

// // slice의 상태값
// export const modalState = (state: RootState) => state.modal.value;
