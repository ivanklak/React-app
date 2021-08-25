import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {Layout, Avatar, Button, Col, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import {logout} from '../../thunks';
import {getAuth} from '../../../App/selectors';

const Header: FC = () => {
  const {Header} = Layout;
  const isAuth = useSelector(getAuth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Header className="header">
      <Row>
        <Col span={20}>
          <Avatar src="https://cdn.auth0.com/blog/react-js/react.png" />
        </Col>
        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />} />
            </Col>
            <Col span={3}>
              <Button data-testid="User.Logout" onClick={onLogout}>
                Log out
              </Button>
            </Col>
          </>
        ) : (
          <Col span={4}>
            <Button data-testid="User.Login">
              <Link to="/login">Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Header;
