import React from 'react';

import preloader from './../../assets/images/wait.gif';

let Preloader = () => {
  return (
    <div style={{backgroundColor: ''}}>
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
