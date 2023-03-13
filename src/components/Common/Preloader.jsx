import React from 'react';
import preloader from '../../pictures/loading_wheel.gif';

const Preloader = (props) => {
  return (
    <div>
      <img src={preloader} style={{ maxWidth: '100px' }} />
    </div>
  );
};

export default Preloader;
