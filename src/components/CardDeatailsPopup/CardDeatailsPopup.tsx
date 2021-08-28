import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './CardDeatailsPopup.css';
import { CommentsList } from '../../components';
import { QuickInput } from '../UI';
import CardDescrBlock from './CardDescr';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { cardsActions } from '../../redux/features/cards';
import { columnsSelectors } from '../../redux/features/columns';
import { ICard, IColumn } from '../../interfaces';
import { validators } from '../../utils';

interface Props {
  card: ICard;
  hidePopup: () => void;
}

const CardDeatailsPopup: React.FC<Props> = ({ card, hidePopup }) => {
  const dispatch = useAppDispatch();
  const column: IColumn = useAppSelector(state => columnsSelectors.getColumnById(state, card.columnId));

  const [showTitleEdit, setShowTitleEdit] = useState<boolean>(false);

  function onSubmit(values: { title: string }) {
    const payload: ICard = { ...card, title: values.title };
    dispatch(cardsActions.updateCard(payload));
  }

  return (
    <div className="card-popup" onMouseDown={hidePopup}>
      <div className="card-popup__window" onMouseDown={e => e.stopPropagation()}>
        {card && (
          <div className="card-popup__wrapper">
            <div className="card-popup__header">
              {
                showTitleEdit
                  ? <Form
                      onSubmit={onSubmit}
                      initialValues={{ title: card.title }}
                      render={({ handleSubmit, form }) => (
                        <form onSubmit={handleSubmit} className="card-popup__title-form">
                          <Field
                            name="title"
                            className="card-popup__title-input"
                            onCancel={() => setShowTitleEdit(false)}
                            onSubmit={() => form.submit()}
                            validate={validators.required}
                            component={QuickInput}
                          />
                        </form>
                      )}
                    />
                  : <h2 className="card-title">
                      <div className="card-title__text">{card.title}</div>
                      <div className="card-title__btns">
                        <i className="bi bi-pencil-fill card-title__btn" onClick={() => setShowTitleEdit(true)}></i>
                      </div>
                    </h2>
              }
              <div className="bi bi-x-lg card-popup__close-btn" onClick={hidePopup}></div>
            </div>
            <div className="card-popup__column-name">in column "{column.title}"</div>
            <div className="card-popup__author-name">{card.author}</div>
            <div className="card-popup__content">
              <CardDescrBlock card={card} />
              <CommentsList cardId={card.id} columnId={card.columnId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDeatailsPopup;