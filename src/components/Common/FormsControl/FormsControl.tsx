import React from 'react';
import classes from './FormsControl.module.css';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

type FormControlsType = {
  input: WrappedFieldInputProps;
  meta: WrappedFieldMetaProps;
};

export const Textarea: React.FC<FormControlsType> = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;
  return (
    <div className={classes.formControl__wrapper + ' ' + (hasError ? classes.error : '')}>
      <textarea {...input} {...props}></textarea>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};

export const Input: React.FC<FormControlsType> = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;
  return (
    <div className={classes.formControl__wrapper + ' ' + (hasError ? classes.error : '')}>
      <input {...input} {...props}></input>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};
