import React from 'react';
import './Item.css';

interface CardProps {
  id: string;
  title: string;
  descr: string | null;
}

const Card: React.FC<CardProps> = ({ id, title, descr }) => {

  function handleDeleteCard(event: React.MouseEvent): void {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      // onDelete(id);
    }
  }

  function handleClickCard(): void {
    // setCardPopupData(data);
    // setShowCardPopup(true);
  }

  // const indicatorsExist = (descr || data.comments.length > 0);

  return (
    <div className="card" onClick={handleClickCard}>
      <div className="card__title">
        {title}
        <i className="bi bi-x-lg card__delete-btn" onClick={handleDeleteCard}></i>
      </div>
      {/* {indicatorsExist && (
        <div className="card__indicators">
            {descr && <i className="bi bi-text-left card__indicator"></i>}
            {data.comments.length > 0 && <i className="bi bi-chat-dots card__indicator"><span>{data.comments.length}</span></i>}
        </div>
      )} */}
    </div>
  );
};

export default Card;