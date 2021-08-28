import React from 'react';
import { Form, Field } from 'react-final-form';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import './CommentItem.css';
import { Button, TextAreaField } from '../../UI';
import { validators } from '../../../utils';
import { useAppDispatch } from '../../../redux/store';
import { commentsActions } from '../../../redux/features/comments';
import { IComment } from '../../../interfaces';

dayjs.extend(calendar);

interface ICommentItemProps {
  comment: IComment;
}

const CommentItem: React.FC<ICommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);
  const date = dayjs(comment.date).calendar(dayjs());

  function deleteComment() {
    dispatch(commentsActions.deleteComment(comment.id));
  }

  function submitEditForm(values: { text: string }) {
    const payload: IComment = {
      ...comment,
      text: values.text,
      isEdited: true
    };
    dispatch(commentsActions.updateComment(payload));
    setShowEditForm(false);
  }

  const editForm = (
    <Form
      onSubmit={submitEditForm}
      initialValues={{ text: comment.text }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="edit-comment__form">
          <Field
            name="text"
            rows={3}
            autoFocus={true}
            validate={validators.required}
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
  );

  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__info">
          <div className="comment__author">{comment.author}</div>
          <div className="comment__date">{date}</div>
          {comment.isEdited && <i className="bi bi-pencil-fill comment__edited-icon" title="Edited"></i>}
        </div>
        {!showEditForm && (
          <div className="comment__btns">
            <div className="comment__btn" onClick={() => setShowEditForm(true)}>Edit</div>
            <div className="comment__btn" onClick={deleteComment}>Delete</div>
          </div>
        )}
      </div>
      {showEditForm ? editForm : <div className="comment__text">{comment.text}</div>}
    </div>
  );
};

export default CommentItem;
