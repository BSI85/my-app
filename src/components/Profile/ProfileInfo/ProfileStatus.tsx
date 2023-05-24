import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import classes from './ProfileStatus.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../../redux/Selectors/profile-selectors';
import { Dispatch } from 'redux';
import { updateUserStatus } from '../../../redux/profile-reducer';
import { useParams } from 'react-router-dom';

const ProfileStatus: FC = () => {
  let status = useSelector(getStatus);
  let dispatch: Dispatch<any> = useDispatch();
  let params = useParams();
  let isOwner = !params.userId;

  let [editMode, setEditMode] = useState(false);
  let [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateUserStatus(localStatus));
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.currentTarget.value);
  };

  return (
    <div className={classes.status}>
      {!editMode ? (
        <div>
          <span onDoubleClick={isOwner ? activateEditMode : undefined}>{status || 'Введите Ваш статус'}</span>
        </div>
      ) : (
        <div>
          <input
            className={classes.input}
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={localStatus}
            maxLength={300}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
