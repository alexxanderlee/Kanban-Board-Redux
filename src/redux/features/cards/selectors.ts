import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICard } from '../../../interfaces';

const getCards = (state: RootState) => state.cards.items;

export const getCardsByColumnId = createSelector(
  (state: RootState, columnId: string) => ({
    cards: getCards(state),
    columnId,
  }),
  ({ cards, columnId }) => cards.filter((card: ICard) => (card.columnId === columnId))
);

export const getCardById = createSelector(
  (state: RootState, cardId: string) => ({
    cards: getCards(state),
    cardId,
  }),
  ({ cards, cardId }) => cards.find((card: ICard) => (card.id === cardId))
);