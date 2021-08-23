import React from 'react';
import './List.css';
import { CardItem } from '../../Card';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { cardsSelectors, cardsActions } from '../../../redux/features/cards';
import { userSelectors } from '../../../redux/features/user';
import { ICard } from '../../../interfaces';
import { isEmptyStr } from '../../../utils';

interface ICardsListProps {
  columnId: string;
}

const CardsList: React.FunctionComponent<ICardsListProps> = ({ columnId }) => {
  const dispatch = useAppDispatch();
  const cards: ICard[] = useAppSelector((state) => cardsSelectors.getCardsByColumnId(state, columnId));
  const username: string = useAppSelector(userSelectors.getUserName);

  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>('');

  function onChangeInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }

  function hideForm() {
    setShowForm(false);
    setInputValue('');
  }

  function addCard() {
    if (isEmptyStr(inputValue)) {
      return;
    }
    dispatch(cardsActions.addCard(columnId, username, inputValue));
    hideForm();
  }

  return (
    <div className="cards-list">
      {cards && cards.map(card => (
        <CardItem id={card.id} title={card.title} descr={card.descr} />
      ))}
      {
        showForm
          ? <form className="add-card-form">
              <textarea
                className="add-card-form__input"
                placeholder="Enter a title"
                value={inputValue}
                onChange={onChangeInput}
                autoFocus
              ></textarea>
              <button 
                type="button"
                className="add-card-form__btn add-card-form__btn_green"
                onClick={addCard}
              >Add</button>
              <button
                type="button"
                className="add-card-form__btn add-card-form__btn_gray"
                onClick={hideForm}
              >Cancel</button>
            </form>
          : <div onClick={() => setShowForm(true)} className="add-card-btn">
              <i className="bi bi-plus-lg"></i>
              <span>Add a card...</span>
            </div>
      }
    </div>
  );
};

export default CardsList;
