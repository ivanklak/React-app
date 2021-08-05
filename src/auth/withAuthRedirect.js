import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const mapStateToPropsForRedirect = state => ({
  isAuth: state.auth.isAuth,
});

const withAuthRedirect = ComponentToBeRendered => props => {
  const {isAuth} = useSelector(mapStateToPropsForRedirect);

  return isAuth ? isAuth && <ComponentToBeRendered {...props} /> : <Redirect to={'/login'} />;
};

export default withAuthRedirect;
