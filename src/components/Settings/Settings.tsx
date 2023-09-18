import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input, Textarea } from '../Common/FormsControl/FormsControl';
import classes from './Settings.module.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { requiredField } from '../Common/Validators/validators';
import { saveProfile } from '../../redux/profile-reducer';
import { useNavigate } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { Dispatch, compose } from 'redux';
import { ProfileType } from '../types/ProfileType';
import { AppStateType } from '../../redux/redux-store';
import { getProfile } from '../../redux/Selectors/profile-selectors';
import { getAuthorizedUserId, getIsAuth } from '../../redux/Selectors/auth-selectors';

type MapStateToPropsType = {
  profile: ProfileType;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type ThisProfileType = {
  profile: ProfileType;
};

const Settings: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const navigate = useNavigate();
  const mydispatch: Dispatch<any> = useDispatch();

  const onSubmit = (formData: ProfileType) => {
    mydispatch(saveProfile(formData));
    navigate('/profile');
  };

  const profile = useSelector(getProfile);
  // const authorizedUserId = useSelector(getAuthorizedUserId);
  // const isAuth = useSelector(getIsAuth);

  return (
    <div>
      <div className={classes.header}>Settings</div>
      <SettingsReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile} />
    </div>
  );
};

const SettingsForm: React.FC<InjectedFormProps<ProfileType, ThisProfileType> & ThisProfileType> = (props) => {
  return (
    <form className={classes.form} onSubmit={props.handleSubmit}>
      <div className={classes.block}>
        <div className={classes.item_name}>Name: </div>
        <Field
          type="text"
          component={Input}
          name={'fullName'}
          placeholder={'Enter your name'}
          validate={[requiredField]}
          className={classes.input}
        />
      </div>
      <div className={classes.block}>
        <div className={classes.item_name}>About me:</div>
        <Field
          type="textarea"
          component={Textarea}
          name={'aboutMe'}
          placeholder={'Write something about yourself'}
          validate={[requiredField]}
          className={classes.input}
        />
      </div>
      <div className={classes.block_chkbox}>
        <div className={classes.item_name}>Looking for a job</div>
        <Field className={classes.input} type="checkbox" component={Input} name={'lookingForAJob'} validate={[]} />
      </div>
      <div className={classes.block}>
        <div className={classes.item_name}>Job you are looking for</div>
        <Field
          type="textarea"
          component={Textarea}
          name={'lookingForAJobDescription'}
          placeholder={'I am looking for...'}
          validate={[requiredField]}
          className={classes.input}
        />
        <div>
          <div className={classes.item_name}>Contacts</div>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <div className={classes.contacts}>
                <b>{key}:</b>{' '}
                <Field className={classes.input} type="text" component={Input} name={'contacts.' + key} validate={[]} />
              </div>
            );
          })}
        </div>
        <div className={classes.form_summary_error}>{props.error}</div>
        <button className={classes.button}>Submit</button>
      </div>
    </form>
  );
};

const SettingsReduxForm = reduxForm<ProfileType, ThisProfileType>({
  form: 'settings',
})(SettingsForm);

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose<any>(connect(mapStateToProps, { saveProfile }), withAuthRedirect)(Settings);
