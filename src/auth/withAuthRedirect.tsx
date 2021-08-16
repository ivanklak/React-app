import React, {ComponentType, FC} from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getAuth} from '../selectors';

function withAuthRedirect<WCProps>(WrappedComponent: ComponentType<WCProps>) {
  const RedirectComponent: FC<WCProps> = props => {
    const isAuth = useSelector(getAuth);

    return isAuth ? <WrappedComponent {...(props as WCProps)} /> : <Redirect to="/login" />;
  };

  return RedirectComponent;
}

export default withAuthRedirect;
