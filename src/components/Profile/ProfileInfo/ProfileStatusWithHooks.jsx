import React, { useState, useEffect } from "react";

const ProfileStatusWithHooks = ({ status, updateStatus }) => {
  let [editMode, setEditMode] = useState(false);
  let [profileStatus, setProfileStatus] = useState(status);

  useEffect(() => {
    setProfileStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true); // input
  };

  const deactivateEditMode = () => {
    setEditMode(false); // span
    updateStatus(profileStatus); // update status
  };

  const onStatusChange = e => {
    setProfileStatus(e.currentTarget.value); // current value
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status || "No status"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={profileStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
