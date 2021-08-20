import React from 'react';
import './CommentsBlock.css';
import { IComment, ICard } from '../../interfaces';
import { CommentItem } from '../../components';

interface ICommentsBlockProps {
  items: IComment[];
  username: string;
  cardId: string;
  updateCard<T extends keyof ICard>(key: T, value: ICard[T]): void
}

const CommentsBlock: React.FC<ICommentsBlockProps> = ({ items, username, cardId, updateCard }) => {

  const [inputValue, setInputValue] = React.useState<string>('');

  const isEmptyStr = (str: string): boolean => (str.trim() === '');

  function addComment(): void {
    if (isEmptyStr(inputValue)) {
      return;
    }
    const comment: IComment = {
      id: Date.now().toString(16),
      cardId: cardId,
      author: username,
      text: inputValue,
      date: Date.now(),
      isEdited: false,
    }
    const newComments: IComment[] = [...items, comment];
    updateCard('comments', newComments);
    setInputValue('');
  }

  function deleteComment(id: string): void {
    const newComments: IComment[] = items.filter(item => item.id !== id);
    updateCard('comments', newComments);
  }

  function editComment(id: string, newText: string): void {
    const newComments: IComment[] = items.map(item => {
      if (item.id === id) {
        item.text = newText;
        item.isEdited = true;
      }
      return item;
    });
    updateCard('comments', newComments);
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
        {items.map(item => (
          <CommentItem key={item.id} data={item} deleteComment={deleteComment} editComment={editComment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsBlock;