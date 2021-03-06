import React from 'react';
import { FormApi } from 'final-form';
import { Form, Field } from 'react-final-form';
import './CommentsList.css';
import { CommentItem } from '../../Comment';
import { TextAreaField, Button } from '../../UI';
import { validators } from '../../../utils';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { commentsSelectors, commentsActions } from '../../../redux/features/comments';
import { userSelectors } from '../../../redux/features/user';

interface ICommentsListProps {
  cardId: string;
  columnId: string;
}

interface CommentFormValues {
  comment: string;
}

const CommentsList: React.FC<ICommentsListProps> = ({ cardId, columnId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => commentsSelectors.getCommentsByCardId(state, cardId));
  const username = useAppSelector(userSelectors.getUserName);

  function onSumbit(values: CommentFormValues, form: FormApi<CommentFormValues>) {
    dispatch(commentsActions.addComment(cardId, columnId, username, values.comment,));
    form.reset();
  }

  return (
    <div className="card-comments">
      <h3 className="card-popup__subtitle">Comments</h3>
      <Form
        onSubmit={onSumbit}
        render={({ handleSubmit, submitting, pristine }) => (
          <form
            onSubmit={handleSubmit} className="comment-form">
            <Field
              name="comment"
              placeholder="Write a comment..."
              validate={validators.required}
              component={TextAreaField}
            />
            <div className="comment-form__btn">
              <Button type="submit" variant="blue" text="Add" disabled={submitting || pristine} onClick={handleSubmit} />
            </div>
          </form>
        )}
      />
      <div className="card-comments__list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
