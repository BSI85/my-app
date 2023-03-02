import React from 'react';
import classes from './Newpost.module.css';

class Newpost extends React.Component {
  constructor(props) {
    super(props);
  }

  onAddpost = () => {
    this.props.addPost();
  };

  onPostChange = (event) => {
    let text = event.target.value;
    this.props.PostChange(text);
  };

  render() {
    return (
      <div>
        <div className={classes.wrapper}>
          <div className={classes.img}>
            <img src={require('./icons8-customer-50.png')} alt="" />
          </div>
          <form className={classes.wrapper_ins}>
            <textarea onChange={this.onPostChange} className={classes.text} value={this.props.newPostText} />
          </form>
        </div>
        <div className={classes.button}>
          <button onClick={this.onAddpost}>Send message</button>
        </div>
      </div>
    );
  }
}

// const Newpost = (props) => {
//   let onAddpost = () => {
//     props.addPost();
//   };

//   let onPostChange = (event) => {
//     let text = event.target.value;
//     props.PostChange(text);
//   };

//   return (
//     <div>
//       <div className={classes.wrapper}>
//         <div className={classes.img}>
//           <img src={require('./icons8-customer-50.png')} alt="" />
//         </div>
//         <form className={classes.wrapper_ins}>
//           <textarea onChange={onPostChange} className={classes.text} value={props.newPostText} />
//         </form>
//       </div>
//       <div className={classes.button}>
//         <button onClick={onAddpost}>Send message</button>
//       </div>
//     </div>
//   );
// };

export default Newpost;
