import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControl/FormsControl';
import { maxLengthCreator, requiredField } from '../Common/Validators/validators';

class Dialogs extends React.Component {
  addNewMessage = (a) => {
    this.props.sendMessage(a.newMessageBody);
  };

  dialogsElements = this.props.dialogsData.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  messagesElements = this.props.messagesData.map((m) => <Message key={m.id} message={m.message} />);

  render() {
    return (
      <div className={classes.dialogs}>
        <div className={classes.dialogs_block}>{this.dialogsElements}</div>
        <div className={classes.messages_block}>
          <div className={classes.messages}>
            {this.props.messagesData.map((m) => (
              <Message key={m.id} message={m.message} />
            ))}
          </div>
          <div className={classes.sendarea}>
            <DialogFormRedux onSubmit={this.addNewMessage} />
          </div>
        </div>
      </div>
    );
  }
}
let maxLength20 = maxLengthCreator(20);

const DialogForm = (props) => {
  return (
    <form className={classes.textarea_wrapper} onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[requiredField, maxLength20]}
        name="newMessageBody"
        placeholder="Enter your message"
        className={classes.textarea}
      ></Field>
      <div>
        <button className={classes.button}>Send message</button>
      </div>
    </form>
  );
};

const DialogFormRedux = reduxForm({
  form: 'dialog',
})(DialogForm);

export default Dialogs;
