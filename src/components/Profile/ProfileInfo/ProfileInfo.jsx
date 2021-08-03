import React from 'react';

import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

import s from './ProfileInfo.module.css';

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.small} alt="photo" />
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        <p>
          <div>
            <strong>{props.profile.fullName}</strong>
          </div>
        </p>

        <div>{props.profile.aboutMe}</div>
        <div>{props.profile.contacts.facebook}</div>
        <div>{props.profile.contacts.vk}</div>
        <div>{props.profile.contacts.twitter}</div>
      </div>
    </div>
  );
};
export default ProfileInfo;
