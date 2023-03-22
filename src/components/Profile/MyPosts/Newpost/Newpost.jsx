import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../Common/FormsControl/FormsControl';
import { requiredField, maxLengthCreator } from '../../../Common/Validators/validators';
import classes from './Newpost.module.css';

const maxLength30 = maxLengthCreator(30);

class Newpost extends React.Component {
  constructor(props) {
    super(props);
  }

  addNewPost = (a) => {
    this.props.addPost(a.newPostText);
  };

  render() {
    return <NewpostFormRedux onSubmit={this.addNewPost} />;
  }
}

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
