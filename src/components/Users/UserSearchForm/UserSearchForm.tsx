import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import classes from './UserSearchForm.module.css';
import React from 'react';
import { FilterType } from '../../../redux/users-reducer';

type FormValues = {
  term: string;
  friend: null | boolean;
};

type PropsType = {
  onSearchTerm: (filter: FilterType) => void;
};

const UserSearchForm: React.FC<PropsType> = (props) => {
  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: null }}
        validate={(values: FormValues) => {
          const errors: FormikErrors<FormValues> = {};
          // if (!values.term) {
          //   errors.term = 'Search request is empty';
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.onSearchTerm(values);

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div>
              <Field type="text" name="term" className={classes.field} />
              <ErrorMessage name="term" component="div" className={classes.errorMessage} />
            </div>
            <Field name="friend" as="select" className={classes.select}>
              <option value="null">All</option>
              <option value="true">Following</option>
              <option value="false">Not following</option>
            </Field>

            <button type="submit" disabled={isSubmitting} className={classes.search_submit}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserSearchForm;
