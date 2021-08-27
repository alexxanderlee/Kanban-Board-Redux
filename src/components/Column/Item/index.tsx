import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './Item.css';
import { CardsList } from '../../../components';
import { QuickInput } from '../../UI';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';
import { isEmptyStr } from '../../../utils';

interface ColumnItemProps {
  id: string;
  title: string;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ id, title }) => {
  const dispatch = useAppDispatch();

  const [editTitleVisible, setEditTitleVisible] = useState<boolean>(false);

  function onSubmit(values: { title: string }) {
    if (isEmptyStr(values.title)) {
      return { title: 'Required' };
    }
    const payload = {
      columnId: id,
      newTitle: values.title
    };
    dispatch(columnsActions.editTitle(payload));
  }

  function deleteColumn() {
    const ask: string = 'Are you really want to delete this column?';
    if (window.confirm(ask)) {
      dispatch(columnsActions.deleteColumn(id));
    }
  }

  return (
    <div className="column">
      {
        editTitleVisible
          ? <div className="edit-title">
              <Form
                onSubmit={onSubmit}
                initialValues={{ title }}
                render={({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit} className="edit-title__from">
                    <Field
                      name="title"
                      className="edit-title__input"
                      onSubmit={() => form.submit()}
                      onCancel={() => setEditTitleVisible(false)}
                      component={QuickInput}
                    />
                  </form>
                )}
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