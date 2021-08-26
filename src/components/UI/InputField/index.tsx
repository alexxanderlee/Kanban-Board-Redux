import React from 'react';
import './InputField.css';
import { FieldRenderProps } from 'react-final-form';

interface InputFieldProps extends FieldRenderProps<string> {
  placeholder?: string;
  autoFocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ meta, input, placeholder, autoFocus }) => {
  return (
    <div className="field">
      {meta.error && meta.touched && <div className="field-error">{meta.error}</div>}
      <input
        {...input}
        type="text"
        className={meta.error && meta.touched ? 'input input_error' : 'input'}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default InputField;

