import React, {ComponentType, FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getAuth} from '../selectors';

function withAuthRedirect<p>(WrappedComponent: ComponentType<p>) {
  const RedirectComponent: FC<p> = props => {
    const isAuth = useSelector(getAuth);

    return isAuth ? <WrappedComponent {...props} /> : <Redirect to="/login" />;
  };

  return RedirectComponent;
}

export default withAuthRedirect;
