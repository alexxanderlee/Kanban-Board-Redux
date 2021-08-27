import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardPopupState {
  cardId: string | null;
  isVisible: boolean;
}

const initialState: CardPopupState = {
  cardId: null,
  isVisible: false,
};

const slice = createSlice({
  name: 'cardPopup',
  initialState,
  reducers: {
    hidePopup: (state) => {
      state.isVisible = false;
      state.cardId = null;
    },
    setPopup: (state, action: PayloadAction<string>) => {
      state.isVisible = true;
      state.cardId = action.payload;
    }
  }
});

export const cardPopupActions = slice.actions;

export default slice.reducer;