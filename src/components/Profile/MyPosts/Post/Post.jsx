import React from 'react';
import classes from './Post.module.css';

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.img}>
            <img src={require('./icons8-customer-50.png')} alt="" />
          </div>
          <div className={classes.item}>{this.props.message}</div>
        </div>
        <div className={classes.like}>
          <button>Like {this.props.likesCount}</button>
        </div>
      </div>
    );
  }
}

export default Post;
