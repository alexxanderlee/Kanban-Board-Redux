import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import './TextAreaField.css';

interface TextAreaFieldProps extends FieldRenderProps<string> {
  placeholder?: string;
  rows?: number;
  autoFocus?: boolean
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ input, meta, placeholder, autoFocus, rows = 4 }) => {
  console.log(meta)
  return (
    <textarea
      {...input}
      className={meta.error && !meta.pristine ? 'textarea textarea_err' : 'textarea'}
      rows={rows}
      placeholder={placeholder}
      autoFocus={autoFocus}
    ></textarea>
  );
};

export default TextAreaField;
