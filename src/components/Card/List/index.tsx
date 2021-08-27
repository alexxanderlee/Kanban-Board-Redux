import React from 'react';
import { Form, Field } from 'react-final-form';
import './List.css';
import { CardItem } from '../../Card';
import { InputField, Button } from '../../UI';
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

  function onSubmit(values:  { title: string }) {
    if (isEmptyStr(values.title)) {
      return { title: 'Required' };
    }
    dispatch(cardsActions.addCard(columnId, username, values.title));
    setShowForm(false);
  }

  return (
    <div className="cards-list">
      {cards && cards.map(card => (
        <CardItem key={card.id} id={card.id} title={card.title} descr={card.descr} />
      ))}
      {
        showForm
          ? <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, pristine }) => (
                <form className="add-card-form" onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    placeholder="Enter a title"
                    autoFocus
                    component={InputField}
                  />
                  <div className="add-card-form__btn">
                    <Button
                      type="submit"
                      disabled={submitting || pristine}
                      text="Add"
                    />
                  </div>
                  <div className="add-card-form__btn">
                    <Button
                      variant="gray"
                      onClick={() => setShowForm(false)}
                      text="Cancel"
                    />
                  </div>
                </form>
              )}
            />
          : <div onClick={() => setShowForm(true)} className="add-card-btn">
              <i className="bi bi-plus-lg"></i>
              <span>Add a card...</span>
            </div>
      }
    </div>
  );
};

export default CardsList;
