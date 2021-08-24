import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IComment } from '../../../interfaces';

const getComments= (state: RootState): IComment[]  => state.comments.items;

export const getCommentsByCardId = createSelector(
  (state: RootState, cardId: string) => ({
    comments: getComments(state),
    cardId,
  }),
  ({ comments, cardId }) => comments.filter(comment => comment.cardId === cardId)
);