import React from 'react';

import {useSelector} from 'react-redux';

import Preloader from '../../Preloader';
import selector from '../selector';

import Status from './Status';

import styles from './styles.module.css';

const ProfileInfo = () => {
  const {profile} = useSelector(selector);

  return profile ? (
    <>
      <div className={styles.descriptionBlock}>
        <img src={profile.photos.small} alt="photo" />
        <Status />
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
