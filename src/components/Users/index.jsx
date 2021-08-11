import React, {useCallback, useEffect, useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import userPhoto from '../../assets/images/people-profile.png';
import {requestUsers} from '../../Redux/users-reducer';
import Pages from '../Paginator/Pages';
import FollowButton from '../controls/FollowButton';
import Preloader from '../Preloader';

import selector from './selector';

import styles from './styles.module.css';

const Users = () => {
  const {users, pageSize, totalUsersCount, currentPage, followingInProgress, isFetching} = useSelector(selector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize));
  }, []);

  const onPageChanged = useCallback(
    pageNumber => {
      dispatch(requestUsers(pageNumber, pageSize));
    },
    [currentPage],
  );

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = useMemo(() => {
    const arrOfPages = [];

    for (let i = 1; i <= pagesCount; i++) {
      arrOfPages.push(i);
    }

    return arrOfPages;
  }, [totalUsersCount, pageSize]);

  return isFetching ? (
    <Preloader />
  ) : (
    <div>
      <div className={styles.pages}>
        {pages.map(p => (
          <Pages key={p} page={p} style={currentPage === p && styles.selectedPage} onPageClick={onPageChanged} />
        ))}
      </div>
      {users.map(u => (
        <div key={u.id} className={styles.persons}>
          <div className={styles.person}>
            <span>
              <div>
                <NavLink to={'/profile/' + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} alt="usersPhoto" />
                </NavLink>
              </div>
              <div className={styles.followbtn}>
                <FollowButton user={u} followingInProgress={followingInProgress} />
              </div>
            </span>
            <span className={styles.description}>
              <div>
                <h4>{u.name}</h4>
              </div>
              <div>
                <h5>{u.status}</h5>
              </div>
              <div>u.location.country</div>
              <div>u.location.city</div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
