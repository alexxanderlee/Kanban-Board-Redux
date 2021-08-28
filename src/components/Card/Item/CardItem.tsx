import React from 'react';
import './CardItem.css';
import { CardDeatailsPopup } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { cardsActions } from '../../../redux/features/cards';
import { commentsSelectors } from '../../../redux/features/comments';
import { ICard } from '../../../interfaces';

interface CardItemProps {
  card: ICard;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const commentsCount = useAppSelector((state) => commentsSelectors.getCommentsByCardId(state, card.id)).length;

  const [isPoupVisible, setIsPopupVisible] = React.useState<boolean>(false);

  function handleDeleteCard(event: React.MouseEvent): void {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      dispatch(cardsActions.deleteCard(card.id));
    }
  }

  function handleClickCard() {
    setIsPopupVisible(true);
  }

  return (
    <>
      {isPoupVisible && <CardDeatailsPopup card={card} hidePopup={() => setIsPopupVisible(false)} />}
      
      <div className="card" onClick={handleClickCard}>
        <div className="card__title">
          {card.title}
          <i className="bi bi-x-lg card__delete-btn" onClick={handleDeleteCard}></i>
        </div>
        <div className="card__indicators">
          {card.descr && <i className="bi bi-text-left card__indicator"></i>}
          {commentsCount > 0 && <i className="bi bi-chat-dots card__indicator"><span>{commentsCount}</span></i>}
        </div>
      </div>
    </>
  );
};

export default CardItem;