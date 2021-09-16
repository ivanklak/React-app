import React, {FC, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Pagination, Row} from 'antd';

import Preloader from '../App/components/Preloader';

import {requestUsers} from './thunks';
import selector from './selectors';
import User from './components/User';

import styles from './styles.module.css';

const Users: FC = () => {
  const {users, pageSize, currentPage, totalUsersCount, followingInProgress, isFetching} = useSelector(selector);
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

  return users ? (
    <Row>
      <Col span={24} className={styles.usersContainer}>
        <div data-testid="Pagination.Block" className={styles.pagination}>
          <Pagination size="small" current={currentPage} total={totalUsersCount} pageSize={pageSize} onChange={onPageChanged} showSizeChanger={false} />
        </div>
        <div className={styles.usersList} data-testid="Users.List">
          {users.map(u => (
            <User user={u} followingInProgress={followingInProgress} key={u.id} isFetching={isFetching} />
          ))}
        </div>
      </Col>
    </Row>
  ) : (
    <Preloader />
  );
};

export default Users;
