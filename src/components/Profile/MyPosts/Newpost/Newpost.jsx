import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Textarea } from '../../../Common/FormsControl/FormsControl';
import { requiredField, maxLengthCreator } from '../../../Common/Validators/validators';
import classes from './Newpost.module.css';

const maxLength30 = maxLengthCreator(30);

const Newpost = (props) => {
  let addNewPost = (a, dispatch) => {
    props.addPost(a.newPostText);
    dispatch(reset('newPost'));
  };

  return <NewpostFormRedux onSubmit={addNewPost} />;
};

const NewpostForm = (props) => {
  return (
    <form className={classes.wrapper} onSubmit={props.handleSubmit}>
      <div className={classes.img}>
        <img src={require('./icons8-customer-50.png')} alt="" />
      </div>
      <Field
        className={classes.field_ins}
        component={Textarea}
        name="newPostText"
        placeholder="Write something..."
        validate={[requiredField, maxLength30]}
      ></Field>
      <button className={classes.button}>Send message</button>
    </form>
  );
};

const NewpostFormRedux = reduxForm({
  form: 'newPost',
})(NewpostForm);

export default Newpost;
