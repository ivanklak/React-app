import React, {FC} from 'react';
import {Space, Spin} from 'antd';

const Preloader: FC = () => (
  <Space style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
    <Spin size="large" />
  </Space>
);

export default Preloader;
