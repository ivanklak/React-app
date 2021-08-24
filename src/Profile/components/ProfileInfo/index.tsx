import React, {FC} from 'react';

import {useSelector} from 'react-redux';

import {Card, Col, Row} from 'antd';

import Preloader from '../../../App/components/Preloader';
import selector from '../../selectors';
import ProfileLogo from '../../../App/images/people-profile.png';

import Status from './Status';

const ProfileInfo: FC = () => {
  const {Meta} = Card;
  const {profile} = useSelector(selector);
  const {isLoading} = useSelector(selector);

  return profile ? (
    <Row justify="center" style={{marginTop: '15px'}}>
      <Col>
        <Card
          bordered={false}
          style={{width: 250}}
          cover={
            <img
              alt="avatar"
              src={profile.photos.small ? profile.photos.small : ProfileLogo}
              style={{height: '160px', width: '160px', marginRight: 'auto', marginLeft: 'auto'}}
            />
          }
        >
          <Meta title={profile.fullName} description={<Status />} />
        </Card>
      </Col>
    </Row>
  ) : // <>
  //   <div className={styles.descriptionBlock}>
  //     <img src={profile.photos.small ? profile.photos.small : ProfileLogo} alt="photo" style={{height: '120px', width: '120px'}} />
  //     <div className={styles.fullName}>
  //       <strong>{profile.fullName}</strong>
  //     </div>
  //   </div>
  //   <div className={styles.profile_status}>
  //     <Status />
  //   </div>
  // </>
  isLoading ? (
    <Preloader />
  ) : null;
};

export default ProfileInfo;
