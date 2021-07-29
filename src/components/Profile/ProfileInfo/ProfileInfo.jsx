import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.small} />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        <p>
          <div>
            <strong>{profile.fullName}</strong>
          </div>
        </p>

        <div>{profile.aboutMe}</div>
        <div>{profile.contacts.facebook}</div>
        <div>{profile.contacts.vk}</div>
        <div>{profile.contacts.twitter}</div>
      </div>
    </div>
  );
};
export default ProfileInfo;
