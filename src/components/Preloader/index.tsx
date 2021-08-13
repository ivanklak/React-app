import React, {FC} from 'react';

import preloader from './../../assets/images/wait.gif';

const Preloader: FC = () => (
  <div style={{backgroundColor: ''}}>
    <img src={preloader} alt="preloader" />
  </div>
);

export default Preloader;
