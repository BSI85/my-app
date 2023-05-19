import { Avatar, Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useRef, useState } from 'react';
import classes from './ChatPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage, startMessagesListening, stopMessagesListening } from '../../../redux/chat-reduser';
import { Dispatch } from 'redux';
import { AppStateType } from '../../../redux/redux-store';
import { ChatMessageType } from '../../types/ChatType';

const ChatPage: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  });

  return (
    <div>
      {status === 'error' && <div>Some error occured</div>}
      <ChatMessages />
      <AddChatMessage />
    </div>
  );
};

const ChatMessages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  return (
    <div style={{ height: 400, overflowY: 'auto' }} onScroll={scrollHandler}>
      <h3 style={{ textAlign: 'center' }}>Chat</h3>
      <div style={{ marginTop: 20 }}>
        <div>
          {messages.map((m, index) => (
            <Message key={index} message={m} />
          ))}
          <div ref={messagesAnchorRef}> </div>
        </div>
      </div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.autor}>
        <Avatar shape="square" size={36} src={<img src={message.photo} alt="avatar" />} />
        <div className={classes.userName}>{message.userName}</div>
      </div>
      <div className={classes.messageText}>{message.message}</div>
    </div>
  );
});

export const AddChatMessage: React.FC = () => {
  const [message, setMessage] = useState('');

  const dispatch: Dispatch<any> = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendChatMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendChatMessage(message));
    setMessage('');
  };
  return (
    <div style={{ marginTop: 20 }}>
      <div>
        <TextArea
          placeholder="Enter your message..."
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          maxLength={300}
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        />
      </div>
      <Button disabled={status !== 'ready'} type="primary" style={{ marginTop: 15 }} onClick={sendChatMessageHandler}>
        Send message
      </Button>
    </div>
  );
};

export default ChatPage;
