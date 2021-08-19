import React, { useState } from 'react';

interface QuickInputProps {
  className: string;
  initialValue: string;
  onSubmit(value: string): void;
  onCancel(): void;
}

const QuickInput: React.FC<QuickInputProps> = ({ className, initialValue, onSubmit, onCancel }) => {

  const [value, setValue] = useState<string>(initialValue);

  const isEmpty = (str: string): boolean => (str.trim() === '');
  const isInitial = (val: string): boolean => (val.trim() === initialValue);

  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = event.target.value;
    setValue(value);
  }

  function onKeyDown(event: React.KeyboardEvent): void {
    const key: string = event.key;
    switch (key) {
      case 'Enter':
        if (isEmpty(value) || isInitial(value)) {
          onCancel();
          return;
        }
        onSubmit(value);
        break;
      case 'Escape':
        onCancel();
        break;
    }
  }

  function onBlur(): void {
    if (isEmpty(value) || isInitial(value)) {
      onCancel();
      return;
    }
    onSubmit(value);
  }

  function onFocus(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.select();
  }

  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      autoFocus
    />
  );
};

export default QuickInput;