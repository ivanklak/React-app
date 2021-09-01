import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Layout, Menu} from 'antd';

import styles from './styles.module.css';

const {Sider} = Layout;

const menuItems = [
  {key: '/profile', label: 'Profile', path: '/profile'},
  {key: '/dialogs', label: 'Dialogs', path: '/dialogs'},
  {key: '/users', label: 'Users', path: '/users'},
  {key: '/friends', label: 'Friends', path: '/friends'},
  {key: '/news', label: 'News', path: '/news'},
  {key: '/music', label: 'Music', path: '/music'},
  {key: '/settings', label: 'Settings', path: '/settings'},
];

const Navbar: FC = () => {
  const location = useLocation();

  return (
    <Sider className={styles.siderContainer}>
      <Menu mode="inline" defaultSelectedKeys={[location.pathname]} className={styles.menuContainer}>
        {menuItems.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Navbar;
