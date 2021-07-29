import React, { useState, useEffect } from "react";
import { setServers } from "dns";

const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  //useState возращает нам массив,
  //в кот. записывается нулевым элементом - editMode, а первым - setEditMode

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true); // input
  };

  const deactivateEditMode = () => {
    setEditMode(false); // span
    props.updateStatus(status); // update status
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value); // current value
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "No status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
