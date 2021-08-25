import React, {FC} from 'react';
import {Space, Spin} from 'antd';

import styles from './styles.module.css';

const Preloader: FC = () => (
  <Space className={styles.preloader}>
    <Spin size="large" />
  </Space>
);

export default Preloader;
