import React, { useState, useRef } from 'react';
import './Column.css';
import { Card, QuickInput } from '../../components';
// import { IState, IColumn, ICard } from '../../interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { userSelectors } from '../../redux/features/user';
import { columnsActions } from '../../redux/features/columns';
import setDate from 'date-fns/fp/setDate';

interface ColumnProps {
  id: string;
  title: string;
}

const Column: React.FC<ColumnProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(userSelectors.getUserName);

  const [addCardVisible, setAddCardVisible] = useState<boolean>(false);
  const [editTitleVisible, setEditTitleVisible] = useState<boolean>(false);
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

  // function onAddCard(event: React.MouseEvent): void {
  //   event.preventDefault();
  //   const value: string = addCardInputRef.current!.value;
  //   if (isEmptyStr(value)) {
  //     return;
  //   }
  //   const card: ICard = {
  //     id: Date.now().toString(16),
  //     columnId: id,
  //     author: username,
  //     title: value,
  //     descr: null,
  //     comments: []
  //   };
  //   const newCards: ICard[] = [...cards, card];
  //   updateColumn('cards', newCards);
  //   setAddCardVisible(false);
  // }

  // function onDeleteCard(cardId: string): void {
  //   const newCards: ICard[] = [...cards].filter(card => !(cardId === card.id));
  //   updateColumn('cards', newCards);
  // }

  // function updateColumn<T extends keyof IColumn>(key: T, value: IColumn[T]): void {
  //   setState(prevState => {
  //     const newState: IState = { ...prevState };
  //     newState[id][key] = value;
  //     localStorage.setItem('state', JSON.stringify(newState));
  //     return newState;
  //   });
  // }

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
        {/* {cards.map((card) => (
          <Card
            setCardPopupData={setCardPopupData}
            setShowCardPopup={setShowCardPopup}
            onDelete={onDeleteCard}
            data={card}
            key={card.id}
          />
        ))} */}
      </div>
      {addCardBlock}
    </div>
  );
}

export default Column;