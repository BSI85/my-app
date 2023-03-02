import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import NewpostContainer from './Newpost/NewpostContainer';

class MyPosts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classes.myposts}>
        <NewpostContainer />
        {this.props.postsData.map((p) => (
          <Post key={p.id} message={p.post} likesCount={p.likes} />
        ))}
      </div>
    );
  }
}

export default MyPosts;
