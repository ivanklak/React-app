import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getAuth} from '../selectors';

const withAuthRedirect = ComponentToBeRendered => {
  const WrappedComponent = props => {
    const isAuth = useSelector(getAuth);

    return isAuth ? <ComponentToBeRendered {...props} /> : <Redirect to="/login" />;
  };

  return WrappedComponent;
};

export default withAuthRedirect;
