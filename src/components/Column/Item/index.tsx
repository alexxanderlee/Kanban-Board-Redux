import React, { useState } from 'react';
import './Item.css';
import { QuickInput, CardsList } from '../../../components';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';
import { cardsActions } from '../../../redux/features/cards';

interface ColumnItemProps {
  id: string;
  title: string;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const [editTitleVisible, setEditTitleVisible] = useState<boolean>(false);

  function titleOnSubmit(value: string): void {
    const payload = {
      columnId: id,
      newTitle: value
    };
    dispatch(columnsActions.editTitle(payload));
    setEditTitleVisible(false);
  }

  function deleteColumn() {
    const ask: string = 'Are you really want to delete this column?';
    if (window.confirm(ask)) {
      dispatch(columnsActions.deleteColumn(id));
      dispatch(cardsActions.deleteCardsByColumnId(id));
    }
  }

  return (
    <div className="column">
      {
        editTitleVisible
          ? <div className="edit-title">
              <QuickInput
                className={'edit-title__input'}
                initialValue={title}
                onSubmit={titleOnSubmit}
                onCancel={() => setEditTitleVisible(false)}
              />
            </div>
          : <div className="col-title">
              <div className="col-title__text">{title}</div>
              <div className="col-title__btns">
                <i
                  title="Edit"
                  className="bi bi-pencil-fill col-title__btn"
                  onClick={() => setEditTitleVisible(true)}
                ></i>
                <i
                  title="Delete"
                  className="bi bi-x-lg col-title__btn"
                  onClick={deleteColumn}
                ></i>
              </div>
            </div>
      }
      <div className="column__cards">
        <CardsList columnId={id} />
      </div>
    </div>
  );
}

export default ColumnItem;