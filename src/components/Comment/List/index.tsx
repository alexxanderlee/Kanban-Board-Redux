import React from 'react';
import { Form, Field } from 'react-final-form';
import './List.css';
import { CommentItem } from '../../Comment';
import { TextAreaField, Button } from '../../UI';
import { isEmptyStr } from '../../../utils';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { commentsSelectors, commentsActions } from '../../../redux/features/comments';
import { userSelectors } from '../../../redux/features/user';

interface ICommentsListProps {
  cardId: string;
  columnId: string;
}

const CommentsList: React.FC<ICommentsListProps> = ({ cardId, columnId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => commentsSelectors.getCommentsByCardId(state, cardId));
  const username = useAppSelector(userSelectors.getUserName);

  function onSumbit(values: { comment: string }, form: any) {
    console.log(form)
    if (isEmptyStr(values.comment)) {
      return { comment: 'Required' };
    }
    dispatch(commentsActions.addComment(cardId, columnId, username, values.comment,));
    form.reset();
  }

  return (
    <div className="card-comments">
      <h3 className="card-popup__subtitle">Comments</h3>
      <Form
        onSubmit={onSumbit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form
            onSubmit={handleSubmit} className="comment-form">
            <Field
              name="comment"
              placeholder="Write a comment..."
              component={TextAreaField} 
            />
            <div className="comment-form__btn">
              <Button type="submit" variant="blue" text="Add" disabled={submitting || pristine} onClick={handleSubmit} />
            </div>
          </form>
        )}
      />
      {/* <div className="comment-form">
        <textarea
          className='comment-form__input'
          placeholder='Write a comment...'
          value={inputValue}
          onChange={onChangeInput}
        >{inputValue}</textarea>
        <button 
          type="submit"
          className="comment-form__btn"
          onClick={addComment}
        >Add</button>
      </div> */}
      <div className="card-comments__list">
        {comments.map(comment => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
