import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import userPhoto from '../../../App/images/people-profile.png';
import FollowButton from '../controls/FollowButton';

import {IUser} from '../../types';

import styles from '../../styles.module.css';

interface IUserProps {
  user: IUser;
  followingInProgress: Array<number>;
}

const User: FC<IUserProps> = ({user, followingInProgress}) => (
  <div className={styles.person}>
    <span>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt="usersPhoto" />
        </NavLink>
      </div>
    </span>
    <span className={styles.description}>
      <div>
        <div>
          <h4>{user.name}</h4>
        </div>
        <div>
          <h5>{user.status}</h5>
        </div>
        <div>Italy, Milano</div>
        <div>
          <FollowButton user={user} followingInProgress={followingInProgress} />
        </div>
      </div>
    </span>
  </div>
);

export default User;
