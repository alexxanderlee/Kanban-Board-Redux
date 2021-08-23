import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { cardsActions } from '../../redux/features/cards';
import { isEmptyStr } from '../../utils';

interface CardDescrBlockProps {
  cardId: string;
  description: string | null;
}

const CardDescrBlock: React.FC<CardDescrBlockProps> = ({ cardId, description }) => {
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | null>(description);

  function onChangeInputValue(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setInputValue(event.target.value);
  }

  function clearDescr(): void {
    dispatch(cardsActions.editCardDescr(cardId, null));
    setInputValue('');
  }

  function submitDescrForm(): void {
    if (inputValue && isEmptyStr(inputValue)) {
      closeDescrForm();
      return;
    }
    dispatch(cardsActions.editCardDescr(cardId, inputValue));
    setShowEditForm(false);
  }

  function closeDescrForm(): void {
    setShowEditForm(false);
    setInputValue(description);
  }

  const editDescrForm: React.ReactNode = (
    <div className="card-descr__edit-block">
      <textarea
        className="card-descr__textarea"
        placeholder="Write a description..."
        value={inputValue ?? ''}
        onChange={onChangeInputValue}
      ></textarea>
      <button type="button" className="card-descr__btn card-descr__btn_green" onClick={submitDescrForm}>Save</button>
      <button type="button" className="card-descr__btn card-descr__btn_gray" onClick={closeDescrForm}>Cancel</button>
    </div>
  );

  return (
    <div className="card-descr">
      <h3 className="card-popup__subtitle">Description</h3>
      {description && !showEditForm && (<>
        <button
          type="button"
          className="bi bi-pencil-fill card-descr__edit-btn"
          onClick={() => setShowEditForm(true)}
        >Edit</button>

        <button
          type="button"
          className="bi bi-x-lg card-descr__edit-btn"
          onClick={clearDescr}
        >Clear</button>
      </>)}

      {description && (
        showEditForm
          ? editDescrForm
          : <div className="card-descr__text">{description}</div>
      )}
      {!description && (
        showEditForm
          ? editDescrForm
          : <div className="card-descr__add-btn" onClick={() => setShowEditForm(true)}>
              <i className="bi bi-plus-lg"></i>
              <span>Add a description...</span>
            </div>
      )}
    </div>
  );
};

export default CardDescrBlock;