import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const withAuthRedirect = ComponentToBeRendered => {
  const mapStateToPropsForRedirect = state => ({
    isAuth: state.auth.isAuth,
  });

  return props => {
    const {isAuth} = useSelector(mapStateToPropsForRedirect);

    useEffect(() => {
      if (!isAuth) {
        props.history.push('/login');
      }
    }, [isAuth]);

    return isAuth && <ComponentToBeRendered {...props} />;
  };
};

export default withAuthRedirect;
