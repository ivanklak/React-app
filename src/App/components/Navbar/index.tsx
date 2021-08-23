import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import {Layout, Menu} from 'antd';
const {Sider} = Layout;

const Navbar: FC = () => (
  <Sider className="site-layout-background">
    <Menu mode="inline" defaultSelectedKeys={['1']} style={{height: '100%'}}>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/dialogs">Messages</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/friends">Friends</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/news">News</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/music">Music</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Navbar;
