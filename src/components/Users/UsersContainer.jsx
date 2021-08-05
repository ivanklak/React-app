import React from 'react';
import {useSelector} from 'react-redux';

import {getIsFetching} from '../../Redux/users-selectors';
import Preloader from '../Preloader/Preloader';

import Users from './Users';

export const UsersContainer = () => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
