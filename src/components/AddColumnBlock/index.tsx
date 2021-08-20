import React, { useState } from 'react';
import './AddColumnBlock.css';
import { useAppDispatch } from '../../redux/store';
import { columnsActions } from '../../redux/features/columns';

interface IAddColumnFormProps {
}

const AddColumnForm: React.FunctionComponent<IAddColumnFormProps> = (props) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>('');
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function addColumn() {
    dispatch(columnsActions.addColumn(value));
    setIsFormVisible(false);
    setValue('');
  }

  return (
    <div className="add-col-block">
      {
        isFormVisible
          ? (<form className="add-card-form">
              <textarea
                className="add-card-form__input"
                placeholder="Enter a column title"
                value={value}
                onChange={onChange}
                autoFocus
              ></textarea>
              <button 
                type="button"
                className="add-card-form__btn add-card-form__btn_green"
                onClick={addColumn}
              >Add</button>
              <button
                type="button"
                className="add-card-form__btn add-card-form__btn_gray"
                onClick={() => setIsFormVisible(false)}
              >Cancel</button>
            </form>)
          : (<div onClick={() => setIsFormVisible(true)} className="column__add-card-btn">
              <i className="bi bi-plus-lg"></i>
              <span>Add a new column</span>
            </div>)
      }
    </div>
  );
};

export default AddColumnForm;
