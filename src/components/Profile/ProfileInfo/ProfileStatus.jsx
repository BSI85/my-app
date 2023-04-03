import React, { useState, useEffect } from 'react';
import classes from './ProfileStatus.module.css';

const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={classes.status}>
      {!editMode ? (
        <div>
          <span onDoubleClick={activateEditMode}>{props.status || 'Введите Ваш статус'}</span>
        </div>
      ) : (
        <div>
          <input
            className={classes.input}
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
            maxLength={300}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
