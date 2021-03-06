import React from 'react';
import './Button.css';

interface IButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'green' | 'gray' | 'blue';
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ type = 'button', variant = 'green', disabled, text, onClick }) => {
  let className = 'button';
  if (variant === 'green') {
    className += ' button_green';
  }
  if (variant === 'gray') {
    className += ' button_gray';
  }
  if (variant === 'blue') {
    className += ' button_blue';
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >{text}</button>
  );
};

export default Button;
