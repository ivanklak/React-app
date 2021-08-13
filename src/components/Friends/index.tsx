import React, {FC} from 'react';

import FriendsItem from './FriendsItem';

import styles from './styles.module.css';

const Friends: FC<any> = props => {
  const friendsElements = props.state.friends.map((f: any) => <FriendsItem key={f.id} name={f.name} />);

  return <div className={styles.friends}>{friendsElements}</div>;
};

export default Friends;
