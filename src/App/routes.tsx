import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Dialogs from '../Dialogs';
import Profile from '../Profile';
import Users from '../Users';
import Login from '../Authentication/components/Login';

import withAuthRedirect from './HOCs/withAuthRedirect';
import News from './components/News';
import Music from './components/Music';
import Settings from './components/Settings';
import Friends from './components/Friends';

const Routes = () => (
  <>
    <Switch>
      <Route path="/dialogs" component={withAuthRedirect(Dialogs)} />
      <Route path="/profile/:userId?" component={Profile} />
      <Route path="/users" component={withAuthRedirect(Users)} />
      <Route path="/login" component={Login} />
      <Route path="/news" component={News} />
      <Route path="/music" component={Music} />
      <Route path="/settings" component={Settings} />
      <Route path="/friends" component={Friends} />
    </Switch>
  </>
);

export default Routes;
