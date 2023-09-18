import React, { useEffect } from 'react';
import classes from './Messages.module.css';
import { useParams } from 'react-router-dom';
import DialogForm from './DialogForm';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesData } from '../../../redux/Selectors/dialogs-selectors';
import { deleteMessage, setUsersMessagesData } from '../../../redux/dialogs-reducer';
import { Dispatch } from 'redux';
import Preloader from '../../Common/Preloader';
import { MessageType } from '../../types/DialogsType';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Message: React.FC = () => {
  let params = useParams();
  let dialogUserId: number;
  dialogUserId = Number(params.dialogID);

  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    if (dialogUserId) dispatch(setUsersMessagesData(dialogUserId));
  }, [dialogUserId]);

  let messagesData = useSelector(getMessagesData);
  if (dialogUserId) {
    if (messagesData.items)
      return (
        <div className={classes.messages_block}>
          <div className={classes.messages_items}>
            {messagesData.items.map((i) => (
              <MessagesElement
                key={i.id}
                id={i.id}
                body={i.body}
                addedAt={i.addedAt}
                viewed={i.viewed}
                dialogUserId={dialogUserId}
              />
            ))}
          </div>
          <DialogForm />
        </div>
      );
    else return <Preloader />;
  } else return <div>Select user to start a dialog</div>;
};

type PropsType = {
  id: number;
  body: string;
  addedAt: string;
  viewed: boolean;
  dialogUserId: number;
};

const MessagesElement: React.FC<PropsType> = (props) => {
  let messageDate = new Date(props.addedAt + 'Z');

  let hour = messageDate.getUTCHours();
  let min = messageDate.getMinutes();
  let year = messageDate.getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  let month = monthNames[messageDate.getMonth()];
  let date = messageDate.getDate();

  let timeStamp = hour + ':' + min + ' ' + date + ' ' + month + ' ' + year;
  const dispatch: Dispatch<any> = useDispatch();
  const onDelete = () => {
    dispatch(deleteMessage(props.id, props.dialogUserId));
  };

  return (
    <div className={`${classes.messages_item} ${props.viewed ? undefined : classes.viewed}`} key={props.id}>
      <span className={classes.item_text}>{props.body}</span>
      <div className={classes.item_time}>
        {timeStamp}
        <Button onClick={onDelete} icon={<DeleteOutlined />} type="link"></Button>
      </div>
    </div>
  );
};

export default Message;

// {"items":[
//   {"id":"4681cac8-fe46-4b45-ab03-eb6a6c2b29ca","body":"test","translatedBody":null,"addedAt":"2023-05-27T12:37:05.133","senderId":28295,"senderName":"Zhiroslavski","recipientId":29171,"viewed":false},
// {"id":"d8925f89-f362-4c7d-a0b4-861a3986a4f1","body":"ddd","translatedBody":null,"addedAt":"2023-05-27T12:37:23.663","senderId":28295,"senderName":"Zhiroslavski","recipientId":29171,"viewed":false}],
// "totalCount":2,
// "error":null}

//SENDING

// {"data":{"message":{"id":"d8925f89-f362-4c7d-a0b4-861a3986a4f1","body":"ddd","translatedBody":null,"addedAt":"2023-05-27T12:37:23.663","senderId":28295,"senderName":"Zhiroslavski","recipientId":29171,"recipientName":"alexandaL","viewed":false,"deletedBySender":false,"deletedByRecipient":false,"isSpam":false,"distributionId":null}},"messages":[],"fieldsErrors":[],"resultCode":0}
