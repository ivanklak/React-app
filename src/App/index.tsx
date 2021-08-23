import React, {FC, useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Layout} from 'antd';

import Dialogs from '../Dialogs';
import Users from '../Users';
import Login from '../Authentication/components/Login';
import Profile from '../Profile';
import Header from '../Authentication/components/Header';

import Preloader from './components/Preloader';
import {initializeApp} from './thunks';
import {getInitial} from './selectors';
import withAuthRedirect from './HOCs/withAuthRedirect';
import News from './components/News';
import Music from './components/Music';
import Settings from './components/Settings';

import './components/index.css';
import 'antd/dist/antd.css';
import Navbar from './components/Navbar';

const {Footer, Content} = Layout;

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
    <Layout>
      <Header />
      <Content style={{padding: '0 50px'}}>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <Navbar />
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <Route path="/dialogs" component={withAuthRedirect(Dialogs)} />
            <Route path="/profile/:userId?" render={() => <Profile />} />
            <Route path="/users" component={withAuthRedirect(Users)} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/friends" />
          </Content>
        </Layout>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default withRouter(App);
