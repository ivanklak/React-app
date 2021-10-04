import React, {ComponentType, FC} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {getAuth} from '../selectors';
import Login from '../../Authentication/components/Login';

function withAuthRedirect<P>(WrappedComponent: ComponentType<P>) {
  const RedirectComponent: FC<P> = props => {
    const location = useLocation();
    const isAuth = useSelector(getAuth);

    return isAuth ? <WrappedComponent {...props} /> : <Login pathname={location.pathname} />;
  };

  return RedirectComponent;
}

export default withAuthRedirect;
