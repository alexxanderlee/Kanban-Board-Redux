import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './Form.css';
import { useAppDispatch } from '../../../redux/store';
import { columnsActions } from '../../../redux/features/columns';
import { InputField, Button } from '../../UI';

const AddColumnForm: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState<boolean>(false);

  interface FormValues {
    title: string;
  }

  function onSubmit(values: FormValues) {
    dispatch(columnsActions.addColumn(values.title));
    setShowForm(false);
  }

  const required = (value: string) => (value ? undefined : 'Required');

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
                    validate={required}
                    component={InputField}
                  />
                  <div className="add-col-form__btn">
                    <Button
                      type="submit"
                      variant="green"
                      disabled={submitting || pristine}
                    >Add</Button>
                  </div>
                  <div className="add-col-form__btn">
                    <Button
                      type="submit"
                      variant="gray"
                      onClick={() => setShowForm(false)}
                    >Cancel</Button>
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

export default AddColumnForm;
