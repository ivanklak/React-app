import React from 'react';

import {useSelector} from 'react-redux';

import Preloader from '../../Preloader/Preloader';
import selector from '../selector';

import ProfileStatusWithHooks from './ProfileStatusWithHooks';

import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
  const {profile} = useSelector(selector);

  return profile ? (
    <>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.small} alt="photo" />
        <ProfileStatusWithHooks />
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
    </>
  ) : (
    <Preloader />
  );
};

export default ProfileInfo;
