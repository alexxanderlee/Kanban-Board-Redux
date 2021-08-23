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
    showPopup: (state) => {
      state.isVisible = true;
    },
    hidePopup: (state) => {
      state.isVisible = false;
    },
    setCardId: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload;
    },
    resetCardId: (state) => {
      state.cardId = null;
    }
  }
});

export const cardPopupActions = slice.actions;

export default slice.reducer;