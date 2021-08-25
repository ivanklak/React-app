import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {Card, Col, Row, Skeleton, Space} from 'antd';

import selector from '../../selectors';
import ProfileLogo from '../../../App/images/people-profile.png';

import Status from './Status';

import styles from './styles.module.css';

const ProfileInfo: FC = () => {
  const {Meta} = Card;
  const {profile} = useSelector(selector);
  const {isLoading} = useSelector(selector);

  return profile ? (
    <Row justify="center" className={styles.profileContainer}>
      <Col>
        <Card
          bordered={false}
          style={{width: 250}}
          cover={<img alt="avatar" src={profile.photos.small ? profile.photos.small : ProfileLogo} className={styles.profileAvatar} />}
        >
          <Meta title={profile.fullName} description={<Status />} />
        </Card>
      </Col>
    </Row>
  ) : (
    <Space>
      <Skeleton.Avatar style={{height: '160px', width: '160px'}} className={styles.skeletonAvatar} active={isLoading} />
    </Space>
  );
};

export default ProfileInfo;
