import React from 'react';
import './Card.css';
import { ICard } from '../../interfaces';

interface CardProps {
  data: ICard;
  onDelete(id: number | string): void;
  setShowCardPopup(value: boolean): void;
  setCardPopupData(data: ICard): void;
}

const Card: React.FC<CardProps> = ({ data, onDelete, setShowCardPopup, setCardPopupData }) => {

  function handleDeleteCard(event: React.MouseEvent): void {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(data.id);
    }
  }

  function handleClickCard(): void {
    setCardPopupData(data);
    setShowCardPopup(true);
  }

  const indicatorsExist = (data.descr || data.comments.length > 0);

  return (
    <div className="card" onClick={handleClickCard}>
      <div className="card__title">
        {data.title}
        <i className="bi bi-x-lg card__delete-btn" onClick={handleDeleteCard}></i>
      </div>
      {indicatorsExist && (
        <div className="card__indicators">
            {data.descr && <i className="bi bi-text-left card__indicator"></i>}
            {data.comments.length > 0 && <i className="bi bi-chat-dots card__indicator"><span>{data.comments.length}</span></i>}
        </div>
      )}
    </div>
  );
};

export default Card;