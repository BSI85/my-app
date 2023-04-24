import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../Common/FormsControl/FormsControl';
import { requiredField } from '../Common/Validators/validators';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import { logIn } from '../../redux/auth-reduser';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

type LoginFormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginFormOwnPropsType = {
  captchaUrl: string | null;
};

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: LoginFormDataType) => {
    props.logIn(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth) {
    return <Navigate to={'/profile'} />;
  }
  return (
    <div className={classes.login}>
      <h1 className={classes.login__header}>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form className={classes.login__form} onSubmit={handleSubmit}>
      <div className={classes.login__login}>
        <Field type="text" component={Input} name={'email'} placeholder={'Email'} validate={[requiredField]} />
      </div>
      <div className={classes.login__password}>
        <Field
          type="password"
          component={Input}
          name={'password'}
          placeholder={'Password'}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
      </div>
      {captchaUrl && (
        <div className={classes.captcha}>
          <img src={captchaUrl} alt="" />
          <Field type="text" component={Input} name={'captcha'} validate={[requiredField]} />
        </div>
      )}
      <div className={classes.form_summary_error}>{error}</div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({
  form: 'login',
})(LoginForm);

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logIn })(Login);
