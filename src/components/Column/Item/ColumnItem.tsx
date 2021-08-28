import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './ColumnItem.css';
import { CardsList } from '../../../components';
import { QuickInput } from '../../UI';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';
import { IColumn } from '../../../interfaces';
import { validators } from '../../../utils';

interface ColumnItemProps {
  column: IColumn;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
  const dispatch = useAppDispatch();

  const [titleFormVisible, setTitleFormVisible] = useState<boolean>(false);

  function onSubmit(values: { title: string }) {
    const payload: IColumn = {
      id: column.id,
      title: values.title
    };
    dispatch(columnsActions.updateColumn(payload));
  }

  function deleteColumn() {
    const ask: string = 'Are you really want to delete this column?';
    if (window.confirm(ask)) {
      dispatch(columnsActions.deleteColumn(column.id));
    }
  }

  return (
    <div className="column">
      {
        titleFormVisible
          ? <div className="edit-title">
              <Form
                onSubmit={onSubmit}
                initialValues={{ title: column.title }}
                render={({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit} className="edit-title__from">
                    <Field
                      name="title"
                      className="edit-title__input"
                      onSubmit={() => form.submit()}
                      onCancel={() => setTitleFormVisible(false)}
                      validate={validators.required}
                      component={QuickInput}
                    />
                  </form>
                )}
              />
            </div>
          : <div className="col-title">
              <div className="col-title__text">{column.title}</div>
              <div className="col-title__btns">
                <i
                  title="Edit"
                  className="bi bi-pencil-fill col-title__btn"
                  onClick={() => setTitleFormVisible(true)}
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
        <CardsList columnId={column.id} />
      </div>
    </div>
  );
}

export default ColumnItem;