import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface QuickInputProps extends FieldRenderProps<string> {
  className?: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const QuickInput: React.FC<QuickInputProps> = ({ input, meta, className, onSubmit, onCancel }) => {

  function onKeyDown(event: React.KeyboardEvent) {
    const key: string = event.key;
    switch (key) {
      case 'Enter':
        if (!meta.error && !meta.pristine) {
          onSubmit();
        }
        onCancel();
        break;
      case 'Escape':
        onCancel();
        break;
    }
  }

  function onBlur() {
    if (!meta.error && !meta.pristine) {
      onSubmit();
    }
    onCancel();
  }

  function onFocus(event: React.FocusEvent<HTMLInputElement>) {
    event.target.select();
  }

  return (
    <input
      {...input}
      type="text"
      className={className}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      autoFocus
    />
  );
};

export default QuickInput;