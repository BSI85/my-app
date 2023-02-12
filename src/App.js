import './App.css';
import Profile from './components/Profile';
import Header from './components/Header';
import Navbar from './components/Navbar';
// import Main from './Main';
// import Footer from './Footer';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <Profile />
    </div>
  );
};

export default App;
