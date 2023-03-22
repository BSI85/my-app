import React from 'react';
import classes from './FormsControl.module.css';

export const Textarea = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;
  return (
    <div className={classes.formControl__wrapper + ' ' + (hasError ? classes.error : '')}>
      <textarea {...input} {...props}></textarea>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {
  let hasError = meta.error && meta.touched;
  return (
    <div className={classes.formControl__wrapper + ' ' + (hasError ? classes.error : '')}>
      <input {...input} {...props}></input>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};
