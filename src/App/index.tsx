import React, {FC, useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Dialogs from '../Dialogs';
import Users from '../Users';
import Profile from '../Profile';
import Header from '../Authentication/components/Header';
import Login from '../Authentication/components/Login';

import withAuthRedirect from './HOCs/withAuthRedirect';

import Settings from './components/Settings';
import Music from './components/Music';
import News from './components/News';
import Navbar from './components/Navbar';

import Preloader from './components/Preloader';
import {initializeApp} from './thunks';
import {getInitial} from './selectors';

import './components/index.css';

const App: FC = () => {
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
