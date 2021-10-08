import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {Avatar, Card, Col, Row, Skeleton} from 'antd';

import userPhoto from '../../../App/images/people-profile.png';
import FollowButton from '../controls/FollowButton';
import {IUser} from '../../types';

import styles from './styles.module.css';

interface IUserProps {
  user: IUser;
  followingInProgress: Array<number>;
  isFetching: boolean;
}

const {Meta} = Card;

const User: FC<IUserProps> = ({user, followingInProgress, isFetching}) => (
  <Card className={styles.userCard} data-testid={`UserItem.${user.id}`}>
    <Row align="middle">
      <Col span={19} className={styles.userDescription}>
        <Skeleton loading={isFetching} avatar active title={false} paragraph={{rows: 2}}>
          <Meta
            avatar={
              <NavLink to={`/profile/${user.id}`}>
                <Avatar data-testid={`UserItem.Avatar.${user.id}`} src={user.photos.small || userPhoto} className={styles.userAvatar} />
              </NavLink>
            }
            title={user.name}
            description={user.status || 'Italy, Milano'}
          />
        </Skeleton>
      </Col>
      <Col span={5}>
        <div>
          <FollowButton user={user} followingInProgress={followingInProgress} />
        </div>
      </Col>
    </Row>
  </Card>
);

export default User;
