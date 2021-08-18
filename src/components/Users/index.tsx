import React, {FC, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {requestUsers} from '../../Redux/Users/thunks';
import Pages from '../Paginator/Pages';
import Preloader from '../Preloader';

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
    (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize));
    },
    [currentPage],
  );

  const pages = useMemo(() => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const arrOfPages: Array<number> = [];

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
          <Pages key={p} page={p} currentPage={currentPage} onPageClick={onPageChanged} />
        ))}
      </div>
      <div>
        {users.map(u => (
          <User user={u} followingInProgress={followingInProgress} key={u.id} />
        ))}
      </div>
    </div>
  );
};

export default Users;
