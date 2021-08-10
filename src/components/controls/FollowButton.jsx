import React from 'react';

const FollowButton = ({text, onClick, userId, disabled}) => {
  const onButtonClick = () => {
    onClick(userId);
  };

  return (
    <>
      <button onClick={onButtonClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
};

export default FollowButton;
