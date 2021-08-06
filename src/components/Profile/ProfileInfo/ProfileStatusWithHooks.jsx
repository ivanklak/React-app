import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {updateStatus} from '../../../Redux/profile-reducer';
import selector from '../selector';

const ProfileStatusWithHooks = () => {
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

  const onStatusChange = e => {
    setProfileStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={profileStatus} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
