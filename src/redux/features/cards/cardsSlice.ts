import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../../interfaces';
import { columnsActions } from '../columns';

interface CardsState {
  items: ICard[],
}

const initialState: CardsState = {
  items: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: {
      reducer: (state, action: PayloadAction<ICard>) => {
        state.items.push(action.payload);
      },
      prepare: (columnId, author, title) => {
        const card: ICard = {
          id: Date.now().toString(16),
          columnId,
          author,
          title,
          descr: null,
        };
        return { payload: card };
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(card => (card.id !== action.payload));
    },
    updateCard: (state, action: PayloadAction<ICard>) => {
      state.items = state.items.map(card => {
        if (card.id === action.payload.id) {
          return action.payload;
        }
        return card;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(columnsActions.deleteColumn, (state, action) => {
      const columnId: string = action.payload;
      state.items = state.items.filter(card => (card.columnId !== columnId));
    })
  },
});

export const cardsActions = cardsSlice.actions;

export default cardsSlice.reducer;