import React, { useState } from 'react';
import './CardPopup.css';
import { IState, ICard } from '../../interfaces';
import { QuickInput, CommentsBlock } from '../../components';
import CardDescrBlock from './CardDescrBlock';

interface CardPopupProps {
  data: ICard | null;
  columnTitle: string;
  username: string;
  setShowCardPopup(value: boolean): void;
  setState(state: IState | ((prevState: IState) => IState)): void;
}

const CardPopup: React.FC<CardPopupProps> = ({ data, columnTitle, username, setShowCardPopup, setState }) => {

  const [showTitleEdit, setShowTitleEdit] = useState<boolean>(false);

  function titleOnCancel(): void {
    setShowTitleEdit(false);
  }

  function titleOnSubmit(value: string): void {
    updateCard('title', value);
    setShowTitleEdit(false);
  }
  
  function updateCard<T extends keyof ICard>(key: T, value: ICard[T]): void {
    data && setState(prevState => {
      const newState: IState = { ...prevState };
      const columnId: string = data.columnId;
      newState[columnId].cards = newState[columnId].cards.map(card => {
        if (card.id === data.id) {
          card[key] = value;
        }
        return card;
      });
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    });
  }

  return (
    <div className="card-popup" onClick={() => setShowCardPopup(false)}>
      <div className="card-popup__window" onClick={e => e.stopPropagation()}>
        {data && (
          <div className="card-popup__wrapper">
            <div className="card-popup__header">
              {
                showTitleEdit
                  ? <QuickInput
                      className={'card-popup__title-input'}
                      initialValue={data.title}
                      onSubmit={titleOnSubmit}
                      onCancel={titleOnCancel}
                    />
                  : <h2 className="card-popup__title" onClick={() => setShowTitleEdit(true)}>
                      {data.title}
                      <i className="bi bi-pencil-fill card-popup__title-edit"></i>
                    </h2>
              }
              <div className="bi bi-x-lg card-popup__close-btn" onClick={() => setShowCardPopup(false)}></div>
            </div>
            <div className="card-popup__column-name">in column "{columnTitle}"</div>
            <div className="card-popup__author-name">{data.author}</div>
            <div className="card-popup__content">
              <CardDescrBlock description={data.descr} updateCard={updateCard} />
              <CommentsBlock
                cardId={data.id}
                items={data.comments}
                username={username}
                updateCard={updateCard}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPopup;