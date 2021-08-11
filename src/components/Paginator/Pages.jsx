import React from 'react';

const Pages = ({key, onPageClick, page, style}) => {
  const handleClick = () => {
    onPageClick(page);
  };

  return (
    <span key={key} onClick={handleClick} className={style}>
      {page + ' '}
    </span>
  );
};

export default React.memo(Pages);
