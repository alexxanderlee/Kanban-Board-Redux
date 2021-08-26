import React from 'react';
import './Button.css';

interface IButtonProps {
  type?: 'submit' | 'button' | 'reset';
  variant: 'green' | 'gray';
  disabled?: boolean;
  children?: string;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({ type, variant, disabled, children, onClick }) => {
  let className = 'button';
  if (variant === 'green') {
    className += ' button_green';
  }
  if (variant === 'gray') {
    className += ' button_gray';
  }

  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      className={className}
      onClick={!disabled ? onClick : undefined}
    >{children}</button>
  );
};

export default Button;
