import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app_wrapper__header">
          <HeaderContainer />
        </div>
        <div className="app_wrapper__navbar">{<NavbarContainer />}</div>
        <div className="app_wrapper__content">
          <Routes>
            <Route exact path="/" element={<ProfileContainer />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
