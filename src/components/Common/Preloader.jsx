import React from 'react';
import preloader from '../../pictures/loading_wheel.gif';

const Preloader = (props) => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'grey', opacity: '10%' }}>
      <img
        src={preloader}
        style={{ maxWidth: '100px', position: 'absolute', top: '50%', left: '50%' }}
        alt="preloader"
      />
    </div>
  );
};

export default Preloader;
