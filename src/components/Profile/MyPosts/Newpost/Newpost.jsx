import React from 'react';
import classes from './Newpost.module.css';
import { addPostCreator, updateNewPostTextCreator } from '../../../../redux/profile-reducer';

const Newpost = (props) => {
  let newPostElement = React.createRef();

  let addNewPost = () => {
    props.dispatch(addPostCreator());
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.dispatch(updateNewPostTextCreator(text));
  };

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.img}>
          <img src={require('./icons8-customer-50.png')} alt="" />
        </div>
        <form className={classes.wrapper_ins}>
          <textarea
            onChange={onPostChange}
            className={classes.text}
            ref={newPostElement}
            value={props.state.newPostText}
          />
        </form>
      </div>
      <div className={classes.button}>
        <button onClick={addNewPost}>Send message</button>
      </div>
    </div>
  );
};

export default Newpost;
