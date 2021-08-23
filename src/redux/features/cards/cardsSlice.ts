import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../../interfaces';

interface CardsState {
  items: ICard[],
}

interface EditCardPayload<T extends keyof ICard> {
  cardId: string;
  value: ICard[T];
}

function editCard<T extends keyof ICard>(cards: ICard[], id: string, key: T, value: ICard[T]) {
  return cards.map(card => {
    if (card.id === id) {
      card[key] = value;
    }
    return card;
  });
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
        const card: ICard = action.payload;
        state.items.push(card);
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
      const cardId: string = action.payload;
      state.items = state.items.filter(card => (card.id !== cardId));
    },
    deleteCardsByColumnId: (state, action: PayloadAction<string>) => {
      const columnId: string = action.payload;
      state.items = state.items.filter(card => (card.columnId !== columnId));
    },
    editCardTitle: {
      reducer: (state, action: PayloadAction<EditCardPayload<'title'>>) => {
        const { cardId, value } = action.payload;
        state.items = editCard<'title'>(state.items, cardId, 'title', value);
      },
      prepare: (cardId: string, value: string) => ({ payload: { cardId, value } }),
    },
    editCardDescr: {
      reducer: (state, action: PayloadAction<EditCardPayload<'descr'>>) => {
        const { cardId, value } = action.payload;
        state.items = editCard<'descr'>(state.items, cardId, 'descr', value);
      },
      prepare: (cardId: string, value: string | null) => ({ payload: { cardId, value } }),
    },
  },
});

export const cardsActions = cardsSlice.actions;

export default cardsSlice.reducer;