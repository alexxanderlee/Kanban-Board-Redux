import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import './TextAreaField.css';

interface TextAreaFieldProps extends FieldRenderProps<string> {
  placeholder?: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ input, meta, placeholder, rows = 4 }) => {
  
  return (
    <textarea
      {...input}
      className={meta.submitError ? 'textarea textarea_err' : 'textarea'}
      rows={rows}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextAreaField;
