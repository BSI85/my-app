// import React from 'react';
// import classes from './User.module.css';

// const User = (props) => {
//   return (
//     <div className={classes.user__wrapper}>
//       <div className={classes.user__header}>
//         <div className={classes.status}>{props.status}</div>
//         {props.online ? <div className={classes.online}>online</div> : <div className={classes.offline}></div>}
//       </div>
//       <div className={classes.ava}>
//         <img src={props.avatar} alt="avatar" />
//         {/* <img src={require(`../../../pictures/user_${props.id}.png`)} alt="avatar" /> */}
//       </div>
//       <div className={classes.bottom}>
//         <div>
//           <div className={classes.name__age}>
//             {props.name}, {props.age}
//           </div>
//           <div className={classes.country__city}>
//             {props.country}, {props.city}
//           </div>
//         </div>
//         <div className={classes.button}>
//           {props.followed ? (
//             <button
//               onClick={() => {
//                 props.unfollow(props.id);
//               }}
//             >
//               Unfollow
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 props.follow(props.id);
//               }}
//             >
//               Follow
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

//export default User;
