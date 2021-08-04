import React from 'react';

import FriendsItem from './FriendsItem';

import s from './Friends.module.css';

const Friends = props => {
  const friendsElements = props.state.friends.map(f => <FriendsItem key={f.id} name={f.name} />);

  return <div className={s.friends}>{friendsElements}</div>;
};

export default Friends;
