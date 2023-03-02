import React from 'react';
import classes from './Online.module.css';

class Online extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.online)
      return (
        <div className={classes.ava}>
          <img src={require(`../../../pictures/user_${this.props.id}.png`)} alt="avatar" />
        </div>
      );
  }
}

// const Online = (props) => {
//   if (props.online)
//     return (
//       <div className={classes.ava}>
//         <img src={require(`../../../pictures/user_${props.id}.png`)} alt="avatar" />
//       </div>
//     );
// };

export default Online;
