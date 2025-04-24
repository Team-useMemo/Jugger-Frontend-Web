import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContextMenuState {
  isOpen: boolean;
  anchor: { x: number; y: number } | null;
  props: {
    title: string;
    color: string;
    onPin: () => void;
    onCategory: () => void;
    onDelete: () => void;
  } | null;
}

const initialState: ContextMenuState = {
  isOpen: false,
  anchor: null,
  props: null,
};

const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    openContextMenu: (
      state,
      action: PayloadAction<{
        anchor: { x: number; y: number };
        props: ContextMenuState['props'];
      }>,
    ) => {
      state.isOpen = true;
      state.anchor = action.payload.anchor;
      state.props = action.payload.props;
    },
    closeContextMenu: (state) => {
      state.isOpen = false;
      state.anchor = null;
      state.props = null;
    },
  },
});

export const { openContextMenu, closeContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
