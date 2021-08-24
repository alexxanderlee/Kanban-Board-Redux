import { RootState } from '../../store';

export const getCardId = (state: RootState) => state.cardPopup.cardId;

export const isVisible = (state: RootState) => state.cardPopup.isVisible;