import React, { useState } from 'react';
import './AddColumnBlock.css';
import { isEmptyStr } from '../../utils';
import { useAppDispatch } from '../../redux/store';
import { columnsActions } from '../../redux/features/columns';

interface IAddColumnFormProps {
}

const AddColumnForm: React.FunctionComponent<IAddColumnFormProps> = (props) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    // event.preventDefault();
    switch (event.key) {
      case 'Enter':
        addColumn();
        break;
      case 'Escape':
        setShowForm(false);
        break;
    }
  }

  function addColumn() {
    if (isEmptyStr(value)) {
      return;
    }
    dispatch(columnsActions.addColumn(value));
    setShowForm(false);
    setValue('');
  }

  return (
    <div className="add-col-block">
      {
        showForm
          ? (<form className="add-col-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="add-col-form__input"
                placeholder="Enter a column title"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoFocus
              />
              <button 
                type="button"
                className="add-col-form__btn add-col-form__btn_ok"
                onClick={addColumn}
              >Add</button>
              <button
                type="button"
                className="add-col-form__btn add-col-form__btn_cancel"
                onClick={() => setShowForm(false)}
              >Cancel</button>
            </form>)
          : (<div onClick={() => setShowForm(true)} className="add-col-btn">
              <i className="bi bi-plus-lg"></i>
              <span>Add a new column</span>
            </div>)
      }
    </div>
  );
};

export default AddColumnForm;
