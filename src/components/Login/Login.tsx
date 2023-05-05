import React, { Dispatch } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import classes from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/auth-reduser';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaUrl: string;
};

type PropsType = {
  onSubmit: (formData: FormValues) => void;
  captchaUrl: string | null;
};

const Login: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch: Dispatch<any> = useDispatch();
  const onSubmit = (values: FormValues) => {
    dispatch(logIn(values.email, values.password, values.rememberMe, values.captchaUrl));
  };

  if (isAuth) {
    return <Navigate to={'/profile'} />;
  }
  return (
    <div className={classes.login}>
      <h1 className={classes.login__header}>Login</h1>
      <FormikForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const FormikForm: React.FC<PropsType> = (props) => (
  <div>
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false, captchaUrl: '' }}
      validate={(values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.email) {
          errors.email = 'Field is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Field is required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.login__form}>
          <div className={classes.login__login}>
            <Field type="email" name="email" placeholder="Enter your email" />
          </div>
          <ErrorMessage name="email" component="div" className={classes.errorMessage} />
          <div className={classes.login__password}>
            <Field type="password" name="password" placeholder="Enter your password" />
          </div>
          <ErrorMessage name="password" component="div" className={classes.errorMessage} />
          <div>
            <Field type="checkbox" name="rememberMe" />
          </div>
          {props.captchaUrl && (
            <div className={classes.captcha}>
              <img src={props.captchaUrl} alt="" />
              <div>
                <Field type="text" name="captchaUrl" />
              </div>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className={classes.button}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
