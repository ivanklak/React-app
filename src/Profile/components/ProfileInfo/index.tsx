import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Avatar, Card, Col, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';

import selector from '../../selectors';
import ProfileLogoImage from '../../../App/images/people-profile.png';

import Status from './Status';

import styles from './styles.module.css';

const {Meta} = Card;

const ProfileInfo: FC = () => {
  const {profile} = useSelector(selector);

  return profile ? (
    <Row justify="center" className={styles.profileContainer}>
      <Col>
        <Card
          className={styles.profileCart}
          bordered={false}
          cover={<img alt="avatar" src={profile.photos.small ? profile.photos.small : ProfileLogoImage} className={styles.profileAvatar} />}
        >
          <Meta title={profile.fullName} description={<Status />} />
        </Card>
      </Col>
    </Row>
  ) : (
    <Row justify="center">
      <Col className={styles.loadingColumn}>
        <Card loading={true} bordered={false} cover={<Avatar className={styles.loadingAvatar} icon={<UserOutlined className={styles.avatarIcon} />} />}>
          <Meta title="fullName" />
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileInfo;
