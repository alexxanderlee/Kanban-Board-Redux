import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../../interfaces';
import { cardsActions } from '../cards';

interface CommentsState {
  items: IComment[],
}

interface EditCommentTextPayload {
  commentId: string;
  newText: string;
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
        const comment: IComment = action.payload;
        state.items.push(comment);
      },
      prepare: (cardId, author, text) => {
        const comment: IComment = {
          id: Date.now().toString(16),
          cardId,
          author,
          text,
          date: Date.now(),
          isEdited: false,
        };
        return { payload: comment };
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const commentId: string = action.payload;
      state.items = state.items.filter(comment => (comment.id !== commentId));
    },
    editCommentText: {
      reducer: (state, action: PayloadAction<EditCommentTextPayload>) => {
        const { commentId, newText } = action.payload;
        state.items = state.items.map(comment => {
          if (comment.id === commentId) {
            comment.text = newText;
          }
          return comment;
        });
      },
      prepare: (commentId, newText) => ({ payload: { commentId, newText } })
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(cardsActions.deleteCard, (state, action) => {
      const cardId: string = action.payload;
      state.items = state.items.filter(comment => (comment.cardId !== cardId));
    })
  },
});

export const commentsActions = commentsSlice.actions;

export default commentsSlice.reducer;