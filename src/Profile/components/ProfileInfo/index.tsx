import React, {FC} from 'react';

import {useSelector} from 'react-redux';

import Preloader from '../../../App/compnents/Preloader';
import selector from '../selector';
import ProfileLogo from '../../../App/images/people-profile.png';

import Status from './Status';

import styles from './styles.module.css';

const ProfileInfo: FC = () => {
  const {profile} = useSelector(selector);

  return profile ? (
    <>
      <div className={styles.descriptionBlock}>
        <img src={profile.photos.small ? profile.photos.small : ProfileLogo} alt="photo" style={{height: '80px', width: '80px'}} />
        <Status />
        <p>
          <div>
            <strong>{profile.fullName}</strong>
          </div>
        </p>
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
