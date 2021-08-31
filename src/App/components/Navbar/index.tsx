import React, {FC, useEffect, useState} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {Layout, Menu} from 'antd';

import styles from './styles.module.css';

const {Sider} = Layout;

interface IClickEvent {
  key: string;
}

const pages = [
  {key: '/profile', path: '/profile'},
  {key: '/dialogs', path: '/dialogs'},
  {key: '/users', path: '/users'},
  {key: '/friends', path: '/friends'},
  {key: '/news', path: '/news'},
  {key: '/music', path: '/music'},
  {key: '/settings', path: '/settings'},
  {key: '/login', path: '/login'},
];

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
  const history = useHistory();
  const [selectedPage, setSelectedPage] = useState('/profile');

  const handleClick = ({key}: IClickEvent) => {
    const clicked = menuItems.find(item => item.key === key);

    return clicked ? history.push(clicked.path) : history.push('/profile');
  };

  useEffect(() => {
    const startPage = pages.find(item => location.pathname.startsWith(item.path))?.key;

    if (startPage !== undefined) {
      setSelectedPage(startPage);
    } else {
      history.push('/profile');
    }
  }, [location]);

  return (
    <Sider className={styles.siderContainer}>
      <Menu mode="inline" selectedKeys={[selectedPage]} onClick={handleClick} className={styles.menuContainer}>
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
