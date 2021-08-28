import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Button, TextAreaField } from '../UI';
import { useAppDispatch } from '../../redux/store';
import { cardsActions } from '../../redux/features/cards';
import { validators } from '../../utils';
import { ICard } from '../../interfaces';

interface CardDescrProps {
  card: ICard;
}

const CardDescr: React.FC<CardDescrProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  function clearDescr() {
    const payload: ICard = { ...card, descr: null };
    dispatch(cardsActions.updateCard(payload));
  }

  function submitDescrForm(values: { descr: string }) {
    const payload: ICard = { ...card, descr: values.descr };
    dispatch(cardsActions.updateCard(payload));
    setShowEditForm(false);
  }

  const editDescrForm: React.ReactNode = (
    <Form
      onSubmit={submitDescrForm}
      initialValues={{ descr: card.descr }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="card-descr__form">
          <div className="card-descr__input">
            <Field
              name="descr"
              placeholder="Write a description..."
              autoFocus={true}
              validate={validators.required}
              component={TextAreaField}
            />
          </div>
          <div className="card-descr__btn">
            <Button type="submit" text="Save" disabled={ submitting || pristine } />
          </div>
          <div className="card-descr__btn">
            <Button variant="gray" text="Cancel" onClick={() => setShowEditForm(false)} />
          </div>
        </form>
      )}
    />
  );

  return (
    <div className="card-descr">
      <h3 className="card-popup__subtitle">Description</h3>
      {card.descr && !showEditForm && (<>
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

      {card.descr && (
        showEditForm
          ? editDescrForm
          : <div className="card-descr__text">{card.descr}</div>
      )}
      {!card.descr && (
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

export default CardDescr;