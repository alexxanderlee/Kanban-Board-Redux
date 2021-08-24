import React from 'react';
import './List.css';
import { CommentItem } from '../../Comment';
import { isEmptyStr } from '../../../utils';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { commentsSelectors, commentsActions } from '../../../redux/features/comments';
import { userSelectors } from '../../../redux/features/user';

interface ICommentsListProps {
  cardId: string;
}

const CommentsList: React.FC<ICommentsListProps> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => commentsSelectors.getCommentsByCardId(state, cardId));
  const username = useAppSelector(userSelectors.getUserName);

  const [inputValue, setInputValue] = React.useState<string>('');

  function addComment(): void {
    if (isEmptyStr(inputValue)) {
      return;
    }
    dispatch(commentsActions.addComment(cardId, username, inputValue,));
    setInputValue('');
  }

  function onChangeInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const value: string = event.target.value;
    setInputValue(value);
  }

  return (
    <div className="card-comments">
      <h3 className="card-popup__subtitle">Comments</h3>
      <div className="comment-form">
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
      </div>
      <div className="card-comments__list">
        {comments.map(comment => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
