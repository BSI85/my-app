import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogItem = (props) => {
  let path = '/dialogs/' + props.id;
  return (
    <div className={classes.item}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={classes.message_item}>{props.message}</div>;
};

const Dialogs = (props) => {
  let dialogsData = [
    { id: 1, name: 'Zhiroslav' },
    { id: 2, name: 'Prol' },
    { id: 3, name: 'Fyodor' },
    { id: 4, name: 'Snezhana' },
    { id: 5, name: 'Balamut' },
    { id: 6, name: 'Alyona' },
    { id: 7, name: 'Valera' },
  ];

  let messagesData = [
    { id: 1, message: 'Hello' },
    { id: 2, message: 'What you doing?' },
    { id: 3, message: 'Where are you?' },
    { id: 4, message: 'Hello!' },
    { id: 5, message: 'Valera, nastalo twoe vremya' },
  ];

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_items}>
        <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
        <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
        <DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
        <DialogItem name={dialogsData[3].name} id={dialogsData[3].id} />
        <DialogItem name={dialogsData[4].name} id={dialogsData[4].id} />
        <DialogItem name={dialogsData[5].name} id={dialogsData[5].id} />
        <DialogItem name={dialogsData[6].name} id={dialogsData[6].id} />
      </div>
      <div className={classes.messages}>
        <Message message={messagesData[0].message} />
        <Message message={messagesData[1].message} />
        <Message message={messagesData[2].message} />
        <Message message={messagesData[3].message} />
      </div>
    </div>
  );
};

export default Dialogs;
