import React, {FC} from 'react';
import {Avatar, Card, Col, Row} from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import {useSelector} from 'react-redux';

import selector from '../../../selectors';

interface IPostProps {
  message: string;
  likesCount: number;
}
const Post: FC<IPostProps> = ({message, likesCount}) => {
  const {Meta} = Card;
  const {profile} = useSelector(selector);

  return (
    <Card data-testid="NewPost" style={{marginTop: 16}}>
      <Row align="middle">
        <Col span={22}>
          <Meta
            avatar={<Avatar src="https://consol-games.com/uploads/posts/2012-12/1356061760_1341555753_00470-01.jpg" />}
            title={profile?.fullName}
            description={message}
          />
        </Col>
        <Col span={2}>
          <HeartTwoTone twoToneColor="#eb2f96" key="like" /> {likesCount}
        </Col>
      </Row>
    </Card>
  );
};

export default Post;
