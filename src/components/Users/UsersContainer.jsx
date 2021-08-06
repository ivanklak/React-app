import React from 'react';
import {useSelector} from 'react-redux';

import Preloader from '../Preloader/Preloader';

import Users from './Users';
import selector from './selector';

export const UsersContainer = () => {
  const {isFetching} = useSelector(selector);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
