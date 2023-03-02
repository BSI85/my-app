import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app_wrapper__header">
          <Header />
        </div>
        <div className="app_wrapper__navbar">{<NavbarContainer />}</div>
        <div className="app_wrapper__content">
          <Routes>
            <Route exact path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
