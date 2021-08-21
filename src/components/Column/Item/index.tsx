import React, { useState, useRef } from 'react';
import './Item.css';
import { QuickInput } from '../../../components';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';

interface ColumnItemProps {
  id: string;
  title: string;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const [editTitleVisible, setEditTitleVisible] = useState<boolean>(false);
  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);
  const addCardInputRef = useRef<HTMLTextAreaElement>(null);

  function titleOnSubmit(value: string): void {
    const payload = {
      columnId: id,
      newTitle: value
    };
    dispatch(columnsActions.editTitle(payload));
    setEditTitleVisible(false);
  }

  function titleOnCancle(): void {
    setEditTitleVisible(false);
  }

  function deleteColumn() {
    const ask: string = 'Are you really want to delete this column?';
    if (window.confirm(ask)) {
      dispatch(columnsActions.deleteColumn(id));
    }
  }

  const titleBlock: React.ReactNode = !editTitleVisible
    ? <div className="col-title">
        <div className="col-title__text">{title}</div>
        <div className="col-title__btns">
          <i
            title="Edit"
            className="bi bi-pencil-fill col-title__btn"
            onClick={() => setEditTitleVisible(true)}
          ></i>
          <i
            title="Delete"
            className="bi bi-x-lg col-title__btn"
            onClick={deleteColumn}
          ></i>
        </div>
      </div>
    : <div className="edit-title">
        <QuickInput
          className={'edit-title__input'}
          initialValue={title}
          onSubmit={titleOnSubmit}
          onCancel={titleOnCancle}
        />
      </div>;

  const addCardBlock: React.ReactNode = !addCardVisible
    ? <div onClick={() => setAddCardVisible(true)} className="column__add-card-btn">
        <i className="bi bi-plus-lg"></i>
        <span>Add a card...</span>
      </div>
    : <form className="add-card-form">
        <textarea
          ref={addCardInputRef}
          className="add-card-form__input"
          name="card-title"
          placeholder="Enter a title"
          autoFocus
        ></textarea>
        <button 
          type="button"
          className="add-card-form__btn add-card-form__btn_green"
          // onClick={onAddCard}
        >Add</button>
        <button
          type="button"
          className="add-card-form__btn add-card-form__btn_gray"
          onClick={() => setAddCardVisible(false)}
        >Cancel</button>
      </form>;

  return (
    <div className="column">
      {titleBlock}
      <div className="column__cards">
        {/* cards list */}
      </div>
      {addCardBlock}
    </div>
  );
}

export default ColumnItem;