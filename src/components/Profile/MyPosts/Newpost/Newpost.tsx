import React, { Dispatch } from 'react';
import { Field, FormAction, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Textarea } from '../../../Common/FormsControl/FormsControl';
import { requiredField, maxLengthCreator } from '../../../Common/Validators/validators';
import classes from './Newpost.module.css';

const maxLength30 = maxLengthCreator(30);

type MapStateToPropsType = {};

type MapDispatchToPropsType = {
  addPost: (addNewPost: string) => void;
};

type NewPostDataType = {
  newPostText: string;
};

const Newpost: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  let addNewPost = (a: NewPostDataType, dispatch: Dispatch<FormAction>) => {
    props.addPost(a.newPostText);
    dispatch(reset('newPost'));
  };

  return <NewpostFormRedux onSubmit={addNewPost} />;
};

const NewpostForm: React.FC<InjectedFormProps<NewPostDataType>> = (props) => {
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

const NewpostFormRedux = reduxForm<NewPostDataType>({
  form: 'newPost',
})(NewpostForm);

export default Newpost;
