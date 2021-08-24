import React, {useState, useEffect, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Input} from 'antd';

import {updateStatus} from '../../thunks';
import selector from '../../selectors';

const Status: FC = () => {
  const {status} = useSelector(selector);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [profileStatus, setProfileStatus] = useState(status);

  useEffect(() => {
    setProfileStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatus(profileStatus));
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileStatus(e.currentTarget.value);
  };

  return editMode ? (
    <div>
      <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} defaultValue={profileStatus} />
    </div>
  ) : (
    <div>
      <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
    </div>
  );
};

export default Status;
