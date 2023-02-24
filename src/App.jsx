import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app_wrapper">
        <div className="app_wrapper__header">
          <Header />
        </div>
        <div className="app_wrapper__navbar">
          <Navbar state={props.state.friendsPage} />
        </div>
        <div className="app_wrapper__content">
          <Routes>
            <Route exact path="/" element={<Profile state={props.state.profilePage} dispatch={props.dispatch} />} />
            <Route path="/profile" element={<Profile state={props.state.profilePage} dispatch={props.dispatch} />} />
            <Route path="/friends" element={<Friends state={props.state.friendsPage} />} />
            <Route path="/dialogs/*" element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch} />} />
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
