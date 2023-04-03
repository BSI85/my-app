import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import Online from './Online/Online';

class Navbar extends React.Component {
  aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.item);

  render() {
    return (
      <nav className={classes.navbar}>
        <div className={classes.item_box}>
          <NavLink to="/profile" className={this.aIa}>
            Profile
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/users" className={this.aIa}>
            Users
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/dialogs" className={this.aIa}>
            Messages
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/news" className={this.aIa}>
            News
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/music" className={this.aIa}>
            Music
          </NavLink>
        </div>
        <div className={classes.item_box}>
          <NavLink to="/settings" className={this.aIa}>
            Settings
          </NavLink>
        </div>
        <div className={classes.item_box}>
          Online
          <div className={classes.online__wrapper}>
            {this.props.usersData.map((f) => (
              <Online key={f.id} id={f.id} name={f.name} online={f.online} />
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

// const Navbar = (props) => {
//   const aIa = ({ isActive }) => (isActive ? classes.activeLink : classes.item);
//   let onlineUsers = props.usersData.map((f) => <Online key={f.id} id={f.id} name={f.name} online={f.online} />);

//   return (
//     <nav className={classes.navbar}>
//       <div className={classes.item_box}>
//         <NavLink to="/profile" className={aIa}>
//           Profile
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         <NavLink to="/users" className={aIa}>
//           Users
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         <NavLink to="/dialogs" className={aIa}>
//           Messages
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         <NavLink to="/news" className={aIa}>
//           News
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         <NavLink to="/music" className={aIa}>
//           Music
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         <NavLink to="/settings" className={aIa}>
//           Settings
//         </NavLink>
//       </div>
//       <div className={classes.item_box}>
//         Online
//         <div className={classes.online__wrapper}>{onlineUsers}</div>
//       </div>
//     </nav>
//   );
// };

export default Navbar;
