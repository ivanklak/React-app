import React, {useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import {initializeApp} from './Redux/app-reducer';
import Preloader from './components/Preloader/Preloader';
import withAuthRedirect from './auth/withAuthRedirect';

import './App.css';

const App = props => {
  useEffect(() => {
    props.initializeApp();
  }, []);

  if (!props.initialized) {
    return <Preloader />;
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path="/dialogs" component={withAuthRedirect(DialogsContainer)} />

        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />

        <Route path="/users" component={withAuthRedirect(UsersContainer)} />

        <Route path="/login" render={() => <Login />} />

        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/friends" />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  initialized: state.app.initialized,
});

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
