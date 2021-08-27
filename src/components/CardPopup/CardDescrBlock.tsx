import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Button, TextAreaField } from '../UI';
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

  function clearDescr() {
    dispatch(cardsActions.editCardDescr(cardId, null));
  }

  function submitDescrForm(values: { descr: string }) {
    if (isEmptyStr(values.descr)) {
      return { descr: 'Require' };
    }
    dispatch(cardsActions.editCardDescr(cardId, values.descr));
    setShowEditForm(false);
  }

  const editDescrForm: React.ReactNode = (
    <Form
      onSubmit={submitDescrForm}
      initialValues={{ descr: description }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="card-descr__form">
          <div className="card-descr__input">
            <Field
              name="descr"
              placeholder="Write a description..."
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