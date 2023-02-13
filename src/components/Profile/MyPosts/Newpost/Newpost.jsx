import React from 'react';
import classes from './Newpost.module.css';

const Newpost = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.img}>
          <img src={require('./icons8-customer-50.png')} alt="" />
        </div>
        <form className={classes.wrapper_ins} id="novoe">
          <textarea className={classes.text} name="newpost" id="" cols="" rows=""></textarea>
        </form>
      </div>
      <div className={classes.button}>
        <button type="submit" form="novoe">
          Send message
        </button>
      </div>
    </div>
  );
};

export default Newpost;
