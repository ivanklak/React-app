import React, {useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Dialogs from './components/Dialogs';
import Users from './components/Users';
import Profile from './components/Profile';
import {Header} from './components/Header/Header';
import {Login} from './components/Login/Login';
import {initializeApp} from './Redux/app-reducer';
import Preloader from './components/Preloader/Preloader';
import withAuthRedirect from './auth/withAuthRedirect';
import {getInitial} from './selectors';

import './App.css';

const App = () => {
  const initialized = useSelector(getInitial);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path="/dialogs" component={withAuthRedirect(Dialogs)} />

        <Route path="/profile/:userId?" render={() => <Profile />} />

        <Route path="/users" component={withAuthRedirect(Users)} />

        <Route path="/login" render={() => <Login />} />

        <Route path="/news" render={() => <News />} />
        <Route path="/music" render={() => <Music />} />
        <Route path="/settings" render={() => <Settings />} />
        <Route path="/friends" />
      </div>
    </div>
  );
};

export default withRouter(App);
