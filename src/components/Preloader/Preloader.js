import React from 'react';
import preloader from './../../assets/images/wait.gif';

let Preloader = props => {
  return (
    <div style={{ backgroundColor: '' }}>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;
