import React from 'react';
import './Item.css';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { cardsActions } from '../../../redux/features/cards';
import { cardPopupActions } from '../../../redux/features/cardPopup';
import { commentsSelectors } from '../../../redux/features/comments';

interface CardProps {
  id: string;
  title: string;
  descr: string | null;
}

const Card: React.FC<CardProps> = ({ id, title, descr }) => {
  const dispatch = useAppDispatch();
  const commentsCount = useAppSelector((state) => commentsSelectors.getCommentsByCardId(state, id)).length;

  function handleDeleteCard(event: React.MouseEvent): void {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(cardsActions.deleteCard(id));
    }
  }

  function handleClickCard() {
    dispatch(cardPopupActions.setPopup(id));
  }

  return (
    <div className="card" onClick={handleClickCard}>
      <div className="card__title">
        {title}
        <i className="bi bi-x-lg card__delete-btn" onClick={handleDeleteCard}></i>
      </div>
      <div className="card__indicators">
        {descr && <i className="bi bi-text-left card__indicator"></i>}
        {commentsCount > 0 && <i className="bi bi-chat-dots card__indicator"><span>{commentsCount}</span></i>}
      </div>
    </div>
  );
};

export default Card;