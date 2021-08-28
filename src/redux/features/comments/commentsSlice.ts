import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../../interfaces';
import { cardsActions } from '../cards';
import { columnsActions } from '../columns';

interface CommentsState {
  items: IComment[],
}

const initialState: CommentsState = {
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: {
      reducer: (state, action: PayloadAction<IComment>) => {
        state.items.push(action.payload);
      },
      prepare: (cardId, columnId, author, text) => {
        const comment: IComment = {
          id: Date.now().toString(16),
          cardId,
          columnId,
          author,
          text,
          date: Date.now(),
          isEdited: false,
        };
        return { payload: comment };
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(comment => (comment.id !== action.payload));
    },
    updateComment: (state, action: PayloadAction<IComment>) => {
      state.items = state.items.map(comment => (comment.id === action.payload.id) ? action.payload : comment);
    },
  },
  extraReducers: (builder) =>{
    builder.addCase(cardsActions.deleteCard, (state, action) => {
      state.items = state.items.filter(comment => (comment.cardId !== action.payload));
    })
    builder.addCase(columnsActions.deleteColumn, (state, action) => {
      state.items = state.items.filter(comment => (comment.columnId !== action.payload));
    })
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;