import React, {FC, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Layout} from 'antd';
import 'antd/dist/antd.css';

import Header from '../Authentication/components/Header';

import {initializeApp} from './thunks';
import {getInitial} from './selectors';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';

import Routes from './routes';

import styles from './styles.module.css';

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
  
  //some changes

  return (
    <Layout>
      <Header />
      <Content className={styles.appContent}>
        <Layout className={styles.appLayout}>
          <Navbar />
          <Content className={styles.routeContent}>
            <Routes />
          </Content>
        </Layout>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default withRouter(App);
