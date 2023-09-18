import React, { useEffect } from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogsData } from '../../redux/Selectors/dialogs-selectors';
import Messages from './Messages/Messages';
import { Route, Routes } from 'react-router-dom';
import { setDialogsData } from '../../redux/dialogs-reducer';
import { Dispatch } from 'redux';

const Dialogs: React.FC = () => {
  const dialogsData = useSelector(getDialogsData);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(setDialogsData());
  }, []);

  let dialogsElements = dialogsData.map((d) => (
    <DialogItem key={d.id} name={d.userName} id={d.id} avatar={d.photos.small} />
  ));

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_block}>{dialogsElements}</div>
      <div className={classes.messages_block}>
        <Routes>
          <Route path="/:dialogID?" element={<Messages />} />
        </Routes>
        <div className={classes.sendarea}></div>
      </div>
    </div>
  );
};

export default Dialogs;
