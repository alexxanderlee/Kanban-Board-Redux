import React from 'react';
import { Form, Field } from 'react-final-form';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import './Item.css';
import { Button, TextAreaField } from '../../UI';
import { isEmptyStr } from '../../../utils';
import { useAppDispatch } from '../../../redux/store';
import { commentsActions } from '../../../redux/features/comments';
import { IComment } from '../../../interfaces';

dayjs.extend(calendar);

interface ICommentItemProps {
  data: IComment;
}

const CommentItem: React.FC<ICommentItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);
  const date = dayjs(data.date).calendar(dayjs());

  function deleteComment() {
    dispatch(commentsActions.deleteComment(data.id));
  }

  function submitEditForm(values: { text: string }) {
    if (isEmptyStr(values.text)) {
      return { text: 'Require' };
    }
    dispatch(commentsActions.editCommentText(data.id, values.text));
    setShowEditForm(false);
  }

  const editForm = (
    <Form
      onSubmit={submitEditForm}
      initialValues={{ text: data.text }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="edit-comment__form">
          <Field
            name="text"
            rows={3}
            component={TextAreaField}
          />
          <div className="edit-comment__btn">
            <Button type="submit" text="Save" disabled={submitting || pristine} />
          </div>
          <div className="edit-comment__btn">
            <Button variant="gray" text="Cancel" onClick={() => setShowEditForm(false)} />
          </div>
        </form>
      )}
    />
      // <textarea
      //   className="edit-comment__textarea"
      //   value={editFormValue}
      //   onChange={onChange}
      // ></textarea>
      // <button
      //   className="edit-comment__btn edit-comment__btn_ok"
      //   onClick={updateCommentText}
      // >Save</button>
      // <button
      //   className="edit-comment__btn edit-comment__btn_cancel"
      //   onClick={closeEditForm}
      // >Cancel</button>
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
            <div className="comment__btn" onClick={deleteComment}>Delete</div>
          </div>
        )}
      </div>
      {showEditForm ? editForm : <div className="comment__text">{data.text}</div>}
    </div>
  );
};

export default CommentItem;
