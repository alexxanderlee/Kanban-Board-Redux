import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import './Popup.css';
import { useAppDispatch } from '../../redux/store';
import { userActions } from '../../redux/features/user';
import { InputField, Button } from '../UI';

interface PopupProps {
}

const Popup: React.FC<PopupProps> = () => {
  const dispatch = useAppDispatch();
  const [popupVisible, setPopupVisible] = useState<boolean>(true);

  interface FormValues {
    username: string;
  }

  function onSubmit(values: FormValues) {
    dispatch(userActions.setUser(values.username));
    setPopupVisible(false);
  }

  const required = (value: string) => (value ? undefined : 'Required');

  return (
    <div className={popupVisible ? 'popup' : 'popup popup_hidden'}>
      <div className="popup__window">
        <Form
          onSubmit={onSubmit}
          render={(props) => (
            <form onSubmit={props.handleSubmit} className="auth-form">
              <h2 className="auth-form__title">Enter your name</h2>
              <Field
                name="username"
                validate={required}
                placeholder={'Enter a name'}
                autoFocus={true}
                component={InputField}
              />
              <div className="auth-form__btn">
                <Button
                  type="submit"
                  disabled={props.submitting || props.pristine}
                  text="OK"
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Popup;