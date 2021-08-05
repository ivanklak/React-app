import React, {useCallback, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import userPhoto from '../../assets/images/people-profile.png';
import {getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers} from '../../Redux/users-selectors';
import {requestUsers, follow, unfollow} from '../../Redux/users-reducer';

import styles from './users.module.css';

const Users = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize));
  }, []);

  const onPageChanged = useCallback(pageNumber => {
    dispatch(requestUsers(pageNumber, pageSize));
  }, []);

  const followUser = userId => {
    dispatch(follow(userId));
  };
  const unfollowUser = userId => {
    dispatch(unfollow(userId));
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={styles.pages}>
        {pages.map(p => (
          <span
            key={p}
            className={currentPage === p && styles.selectedPage}
            onClick={() => {
              onPageChanged(p);
            }}
          >
            {p + ' '}
          </span>
        ))}
      </div>
      {users.map(u => (
        <div key={u.id} className={styles.persons}>
          <div className={styles.person}>
            <span>
              <div>
                <NavLink to={'/profile/' + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
              </div>
              <div className={styles.followbtn}>
                {u.followed ? (
                  <button
                    disabled={followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      unfollowUser(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={followingInProgress.some(id => id === u.id)}
                    onClick={() => {
                      followUser(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span className={styles.description}>
              <div>
                <h4>{u.name}</h4>
              </div>
              <div>
                <h5>{u.status}</h5>
              </div>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
