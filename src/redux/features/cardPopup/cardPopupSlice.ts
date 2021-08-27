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
      state.cardId = null;
    },
    setCardId: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload;
    }
  }
});

export const cardPopupActions = slice.actions;

export default slice.reducer;