import React, {FC} from 'react';
import {Avatar, Card, Col, Row} from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import {useSelector} from 'react-redux';

import selector from '../../../selectors';

import styles from './styles.module.css';

interface IPostProps {
  id: number;
  message: string;
  likesCount: number;
}

const {Meta} = Card;

const Post: FC<IPostProps> = ({id, message, likesCount}) => {
  const {profile} = useSelector(selector);

  return (
    <Card data-testid={`NewPost.Message.${id}`} className={styles.postItem}>
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
