import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getAuth} from '../selectors';

type PropsType = any;

const withAuthRedirect = (ComponentToBeRendered: any) => {
  const WrappedComponent: FC<PropsType> = props => {
    const isAuth = useSelector(getAuth);

    return isAuth ? <ComponentToBeRendered {...props} /> : <Redirect to="/login" />;
  };

  return WrappedComponent;
};

export default withAuthRedirect;
