import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICard } from '../../../interfaces';

const getCards = (state: RootState) => state.cards.items;

const getId = (_: RootState, id: string) => id;

export const getCardsByColumnId = createSelector(
  getCards,
  getId,
  (cards, columnId) => cards.filter((card: ICard) => (card.columnId === columnId))
);

export const getCardById = createSelector(
  getCards,
  getId,
  (cards, cardId) => cards.find((card: ICard) => (card.id === cardId))
);