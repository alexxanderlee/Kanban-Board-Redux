import React, { useState } from 'react';
import './CardPopup.css';
import { QuickInput } from '../../components';
import CardDescrBlock from './CardDescrBlock';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { cardsSelectors, cardsActions } from '../../redux/features/cards';
import { cardPopupActions } from '../../redux/features/cardPopup';
import { columnsSelectors } from '../../redux/features/columns';
import { ICard, IColumn } from '../../interfaces';

interface CardPopupProps {
  cardId: string;
}

const CardPopup: React.FC<CardPopupProps> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const data: ICard = useAppSelector(state => cardsSelectors.getCardById(state, cardId));
  const column: IColumn = useAppSelector(state => columnsSelectors.getColumnById(state, data.columnId));

  const [showTitleEdit, setShowTitleEdit] = useState<boolean>(false);

  function updateTitle(value: string): void {
    dispatch(cardsActions.editCardTitle(cardId, value));
    setShowTitleEdit(false);
  }

  function hidePopup() {
    dispatch(cardPopupActions.hidePopup());
    dispatch(cardPopupActions.resetCardId());
  }

  return (
    <div className="card-popup" onClick={hidePopup}>
      <div className="card-popup__window" onClick={e => e.stopPropagation()}>
        {data && (
          <div className="card-popup__wrapper">
            <div className="card-popup__header">
              {
                showTitleEdit
                  ? <QuickInput
                      className={'card-popup__title-input'}
                      initialValue={data.title}
                      onSubmit={updateTitle}
                      onCancel={() => setShowTitleEdit(false)}
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
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPopup;