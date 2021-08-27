import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './CardPopup.css';
import { CommentsList } from '../../components';
import { QuickInput } from '../UI';
import CardDescrBlock from './CardDescrBlock';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { cardsSelectors, cardsActions } from '../../redux/features/cards';
import { cardPopupActions } from '../../redux/features/cardPopup';
import { columnsSelectors } from '../../redux/features/columns';
import { ICard, IColumn } from '../../interfaces';
import { isEmptyStr } from '../../utils';

interface CardPopupProps {
  cardId: string;
}

const CardPopup: React.FC<CardPopupProps> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const data: ICard = useAppSelector(state => cardsSelectors.getCardById(state, cardId));
  const column: IColumn = useAppSelector(state => columnsSelectors.getColumnById(state, data.columnId));

  const [showTitleEdit, setShowTitleEdit] = useState<boolean>(false);

  function onSubmit(values: { title: string }) {
    if (isEmptyStr(values.title)) {
      return { title: 'Required' };
    }
    dispatch(cardsActions.editCardTitle(cardId, values.title));
  }

  function hidePopup() {
    dispatch(cardPopupActions.hidePopup());
  }

  return (
    <div className="card-popup" onMouseDown={hidePopup}>
      <div className="card-popup__window" onMouseDown={e => e.stopPropagation()}>
        {data && (
          <div className="card-popup__wrapper">
            <div className="card-popup__header">
              {
                showTitleEdit
                  ? <Form
                      onSubmit={onSubmit}
                      initialValues={{ title: data.title }}
                      render={({ handleSubmit, form }) => (
                        <form onSubmit={handleSubmit} className="card-popup__title-form">
                          <Field
                            name="title"
                            className="card-popup__title-input"
                            onCancel={() => setShowTitleEdit(false)}
                            onSubmit={() => form.submit()}
                            component={QuickInput}
                          />
                        </form>
                      )}
                    />
                  : <h2 className="card-popup__title" onClick={() => setShowTitleEdit(true)}>
                      {data.title}
                      <i className="bi bi-pencil-fill card-popup__title-edit"></i>
                    </h2>
              }
              <div className="bi bi-x-lg card-popup__close-btn" onClick={hidePopup}></div>
            </div>
            <div className="card-popup__column-name">in column "{column.title}"</div>
            <div className="card-popup__author-name">{data.author}</div>
            <div className="card-popup__content">
              <CardDescrBlock cardId={data.id} description={data.descr} />
              <CommentsList cardId={data.id} columnId={data.columnId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPopup;