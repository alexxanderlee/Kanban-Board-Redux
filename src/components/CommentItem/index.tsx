import React from 'react';
import { formatRelative } from 'date-fns';
import './CommentItem.css';
import { IComment } from '../../interfaces';

interface ICommentItemProps {
  data: IComment;
  deleteComment(id: string): void;
  editComment(id: string, newText: string): void;
}

const CommentItem: React.FC<ICommentItemProps> = ({ data, deleteComment, editComment }) => {
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);
  const [editFormValue, setEditFormValue] = React.useState<string>(data.text);
  const date = formatRelative(new Date(data.date), new Date());

  const isEmptyStr = (str: string): boolean => (str.trim() === '');

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setEditFormValue(event.target.value);
  }

  function submitEditForm(): void {
    if (isEmptyStr(editFormValue)) {
      closeEditForm();
      return;
    }
    editComment(data.id, editFormValue);
    setShowEditForm(false);
  }

  function closeEditForm(): void {
    setShowEditForm(false);
    setEditFormValue(data.text);
  }

  const editForm = (
    <React.Fragment>
      <textarea
        className="edit-comment__textarea"
        value={editFormValue}
        onChange={onChange}
      ></textarea>
      <button
        className="edit-comment__btn edit-comment__btn_ok"
        onClick={submitEditForm}
      >Save</button>
      <button
        className="edit-comment__btn edit-comment__btn_cancel"
        onClick={closeEditForm}
      >Cancel</button>
    </React.Fragment>
  );

  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__info">
          <div className="comment__author">{data.author}</div>
          <div className="comment__date">{date}</div>
          {data.isEdited && <i className="bi bi-pencil-fill comment__edited-icon" title="Edited"></i>}
        </div>
        {!showEditForm && (
          <div className="comment__btns">
            <div className="comment__btn" onClick={() => setShowEditForm(true)}>Edit</div>
            <div className="comment__btn" onClick={() => deleteComment(data.id)}>Delete</div>
          </div>
        )}
      </div>
      {showEditForm ? editForm : <div className="comment__text">{data.text}</div>}
    </div>
  );
};

export default CommentItem;
