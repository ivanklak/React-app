import React, {FC, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {requestUsers} from '../../Redux/Users/users-reducer';
import Pages from '../Paginator/Pages';
import Preloader from '../Preloader';
import {UserType} from '../../types/types';

import selector from './selector';
import User from './User';

import styles from './styles.module.css';

const Users: FC = () => {
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

  const pages = useMemo(() => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
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
      <div>
        {users.map((u: UserType) => (
          <User user={u} followingInProgress={followingInProgress} key={u.id} />
        ))}
      </div>
    </div>
  );
};

export default Users;
