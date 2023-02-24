import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
  let sendNewMessage = () => {
    props.dispatch(sendMessageCreator());
  };

  let onMessageChange = (event) => {
    let text = event.target.value;
    props.dispatch(updateNewMessageTextCreator(text));
  };

  let dialogsElements = props.state.dialogsData.map((d) => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = props.state.messagesData.map((m) => <Message message={m.message} />);
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_block}>{dialogsElements}</div>
      <div className={classes.messages_block}>
        <div className={classes.messages}>{messagesElements}</div>
        <div className={classes.sendarea}>
          <div className={classes.textarea_wrapper}>
            <textarea
              className={classes.textarea}
              onChange={onMessageChange}
              value={props.state.newMessageText}
            ></textarea>
          </div>
          <div>
            <button onClick={sendNewMessage}>Send message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
