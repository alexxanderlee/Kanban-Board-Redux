import React, { useState, useRef } from 'react';
import './Popup.css';

interface PopupProps {
  setUsername(username: string): void;
}

const Popup: React.FC<PopupProps> = ({ setUsername }) => {
  const [popupVisible, setPopupVisible] = useState<boolean>(true);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function submitInput(): void {
    const value: string = inputRef.current!.value;
    if (value === '') {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);
    setUsername(value);
    setPopupVisible(false);
  }

  function onKeyPress(event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      submitInput();
    }
  }

  return (
    <div className={popupVisible ? 'popup' : 'popup popup_hidden'}>
      <div className="popup__window">
        <div className="popup__title">Enter your name</div>
        <input
          ref={inputRef}
          type="text"
          className={errorInput ? 'popup__input popup__input_error' : 'popup__input'}
          onKeyPress={onKeyPress}
          placeholder="Name"
          autoFocus
        />
        <button className="popup__btn" onClick={submitInput}>OK</button>
      </div>
    </div>
  );
};

export default Popup;