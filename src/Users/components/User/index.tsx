import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

import {Avatar, Card, Col, Row} from 'antd';

import userPhoto from '../../../App/images/people-profile.png';
import FollowButton from '../controls/FollowButton';

import {IUser} from '../../types';

interface IUserProps {
  user: IUser;
  followingInProgress: Array<number>;
}

const User: FC<IUserProps> = ({user, followingInProgress}) => {
  const {Meta} = Card;

  return (
    <Card style={{width: '100%', marginBottom: '10px'}}>
      <Row align="middle">
        <Col span={19}>
          <Meta
            avatar={
              <NavLink to={'/profile/' + user.id}>
                <Avatar src={user.photos.small != null ? user.photos.small : userPhoto} style={{height: '60px', width: '60px'}} />
              </NavLink>
            }
            title={user.name}
            description={user.status ? user.status : 'Italy, Milano'}
          />
        </Col>
        <Col span={2}>
          <div>
            <FollowButton user={user} followingInProgress={followingInProgress} />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default User;
