import React, {FC} from 'react';

interface IProps {
  onPageClick: (page: number) => void;
  currentPage: number;
  page: number;
}

const Pages: FC<IProps> = ({currentPage, onPageClick, page}) => {
  const handleClick = () => {
    onPageClick(page);
  };

  return (
    <span onClick={handleClick} style={currentPage === page ? {fontWeight: 'bold'} : undefined}>
      {page + ' '}
    </span>
  );
};

export default React.memo(Pages);
