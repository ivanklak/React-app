import React, {FC} from 'react';

interface IPagesProps {
  onPageClick: (page: number) => void;
  currentPage: number;
  page: number;
}

const Pages: FC<IPagesProps> = ({currentPage, onPageClick, page}) => {
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
