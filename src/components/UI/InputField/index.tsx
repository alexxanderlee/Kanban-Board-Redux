import React from 'react';
import './InputField.css';
import { FieldRenderProps } from 'react-final-form';

interface InputFieldProps extends FieldRenderProps<string> {
  placeholder?: string;
  autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ meta, input, placeholder, autoFocus }) => {
  return (
    <input
      {...input}
      type="text"
      className={meta.submitError ? 'input input_error' : 'input'}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
};

export default InputField;

