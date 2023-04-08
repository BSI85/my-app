import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../Common/FormsControl/FormsControl';
import classes from './Settings.module.css';
import { connect } from 'react-redux';
import { requiredField } from '../Common/Validators/validators';
import { saveProfile } from '../../redux/profile-reducer';
import { useNavigate } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

const Settings = (props) => {
  const navigate = useNavigate();
  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      navigate('/profile');
    });
  };
  return (
    <div>
      <div className={classes.header}>Settings</div>
      <SettingsReduxForm onSubmit={onSubmit} initialValues={props.profile} profile={props.profile} />
    </div>
  );
};

const SettingsForm = (props) => {
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
        />
      </div>
      <div className={classes.block_chkbox}>
        <div className={classes.item_name}>Looking for a job</div>
        <Field type="checkbox" component={Input} name={'lookingForAJob'} validate={[]} />
      </div>
      <div className={classes.block}>
        <div className={classes.item_name}>Job you are looking for</div>
        <Field
          type="textarea"
          component={Textarea}
          name={'lookingForAJobDescription'}
          placeholder={'I am looking for...'}
          validate={[requiredField]}
        />
        <div>
          <div className={classes.item_name}>Contacts</div>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <div className={classes.contacts}>
                <b>{key}:</b> <Field type="text" component={Input} name={'contacts.' + key} validate={[]} />
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

const SettingsReduxForm = reduxForm({
  form: 'settings',
})(SettingsForm);

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { saveProfile }), withAuthRedirect)(Settings);
