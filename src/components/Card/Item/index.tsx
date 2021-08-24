import React from 'react';
import './Item.css';
import { useAppDispatch } from '../../../redux/store';
import { cardsActions } from '../../../redux/features/cards';
import { cardPopupActions } from '../../../redux/features/cardPopup';

interface CardProps {
  id: string;
  title: string;
  descr: string | null;
}

const Card: React.FC<CardProps> = ({ id, title, descr }) => {
  const dispatch = useAppDispatch();

  function handleDeleteCard(event: React.MouseEvent): void {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(cardsActions.deleteCard(id));
    }
  }

  function handleClickCard(): void {
    dispatch(cardPopupActions.setCardId(id));
    dispatch(cardPopupActions.showPopup());
  }

  return (
    <div className="card" onClick={handleClickCard}>
      <div className="card__title">
        {title}
        <i className="bi bi-x-lg card__delete-btn" onClick={handleDeleteCard}></i>
      </div>
      <div className="card__indicators">
        {descr && <i className="bi bi-text-left card__indicator"></i>}
        
      </div>
    </div>
  );
};

export default Card;