import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './ColumnForm.css';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';
import { InputField, Button } from '../../UI';
import { validators } from '../../../utils';

const ColumnForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState<boolean>(false);

  function onSubmit(values: { title: string }) {
    dispatch(columnsActions.addColumn(values.title));
    setShowForm(false);
  }

  return (
    <div className="add-col-block">
      {
        showForm
          ? (<Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit} className="add-col-form">
                  <Field
                    name="title"
                    placeholder="Enter a column title"
                    autoFocus
                    validate={validators.required}
                    component={InputField}
                  />
                  <div className="add-col-form__btn">
                    <Button
                      type="submit"
                      disabled={submitting || pristine}
                      text="Add"
                    />
                  </div>
                  <div className="add-col-form__btn">
                    <Button
                      variant="gray"
                      onClick={() => setShowForm(false)}
                      text="Cancel"
                    />
                  </div>
                </form>
              )}
            />)
            
          : (<div onClick={() => setShowForm(true)} className="add-col-btn">
              <i className="bi bi-plus-lg"></i>
              <span>Add a new column</span>
            </div>)
      }
    </div>
  );
};

export default ColumnForm;
