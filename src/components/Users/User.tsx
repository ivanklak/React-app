import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import userPhoto from '../../assets/images/people-profile.png';
import FollowButton from '../controls/FollowButton';

import styles from './styles.module.css';

const User: FC<any> = ({user, followingInProgress}) => (
  <div className={styles.person}>
    <span>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt="usersPhoto" />
        </NavLink>
      </div>
      <div className={styles.followbtn}>
        <FollowButton user={user} followingInProgress={followingInProgress} />
      </div>
    </span>
    <span className={styles.description}>
      <div>
        <h4>{user.name}</h4>
      </div>
      <div>
        <h5>{user.status}</h5>
      </div>
      <div>user.location.country</div>
      <div>user.location.city</div>
    </span>
  </div>
);

export default User;
