import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControl/FormsControl';
import { maxLengthCreator, requiredField } from '../Common/Validators/validators';
import { DialogsDataType, MessagesDataType } from '../types/DialogsDataType';

type PropsType = {
  dialogsData: Array<DialogsDataType>;
  messagesData: Array<MessagesDataType>;
  sendMessage: (addNewMessage: string) => void;
};

type DialogFormDataType = {
  newMessageBody: string;
};

const Dialogs: React.FC<PropsType> = (props) => {
  let addNewMessage = (a: DialogFormDataType) => {
    props.sendMessage(a.newMessageBody);
  };

  let dialogsElements = props.dialogsData.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = props.messagesData.map((m) => <Message key={m.id} message={m.message} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_block}>{dialogsElements}</div>
      <div className={classes.messages_block}>
        <div className={classes.messages}>{messagesElements}</div>
        <div className={classes.sendarea}>
          <DialogFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

let maxLength20 = maxLengthCreator(20);

const DialogForm: React.FC<InjectedFormProps<DialogFormDataType>> = (props) => {
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

const DialogFormRedux = reduxForm<DialogFormDataType>({
  form: 'dialog',
})(DialogForm);

export default Dialogs;
