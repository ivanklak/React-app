import React, {FC} from 'react';

const Pages: FC<any> = ({key, onPageClick, page, style}) => {
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
