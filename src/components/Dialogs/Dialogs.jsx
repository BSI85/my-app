import React from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';

class Dialogs extends React.Component {
  constructor(props) {
    super(props);
  }
  sendNewMessage = () => {
    this.props.sendMessage();
  };
  onMessageChange = (event) => {
    let text = event.target.value;
    this.props.updateNewMessageText(text);
  };
  dialogsElements = this.props.dialogsPageState.dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.name} id={d.id} />
  ));
  messagesElements = this.props.dialogsPageState.messagesData.map((m) => <Message key={m.id} message={m.message} />);

  render() {
    return (
      <div className={classes.dialogs}>
        <div className={classes.dialogs_block}>{this.dialogsElements}</div>
        <div className={classes.messages_block}>
          <div className={classes.messages}>{this.messagesElements}</div>
          <div className={classes.sendarea}>
            <div className={classes.textarea_wrapper}>
              <textarea
                className={classes.textarea}
                onChange={this.onMessageChange}
                value={this.props.newMessageText}
              ></textarea>
            </div>
            <div>
              <button className={classes.button} onClick={this.sendNewMessage}>
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const Dialogs = (props) => {
//   let sendNewMessage = () => {
//     props.sendMessage();
//   };

//   let onMessageChange = (event) => {
//     let text = event.target.value;
//     props.updateNewMessageText(text);
//   };

//   let dialogsElements = props.dialogsPageState.dialogsData.map((d) => (
//     <DialogItem key={d.id} name={d.name} id={d.id} />
//   ));
//   let messagesElements = props.dialogsPageState.messagesData.map((m) => <Message key={m.id} message={m.message} />);
//   return (
//     <div className={classes.dialogs}>
//       <div className={classes.dialogs_block}>{dialogsElements}</div>
//       <div className={classes.messages_block}>
//         <div className={classes.messages}>{messagesElements}</div>
//         <div className={classes.sendarea}>
//           <div className={classes.textarea_wrapper}>
//             <textarea className={classes.textarea} onChange={onMessageChange} value={props.newMessageText}></textarea>
//           </div>
//           <div>
//             <button className={classes.button} onClick={sendNewMessage}>
//               Send message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Dialogs;
