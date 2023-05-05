import React, { Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import './App.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useParams } from 'react-router-dom';
import { initializeApp } from './redux/app-reduser';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/Common/Preloader';
import Users from './components/Users/Users';
import Dialogs from './components/Dialogs/Dialogs';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs'));

type MSTPType = ReturnType<typeof mapStateToProps>;
type MDTPType = {
  initializeApp: () => void;
};

class App extends React.Component<MSTPType & MDTPType> {
  catchAllUnhandledErrors = () => {
    alert('Some error occured');
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app_wrapper">
        <div className="app_wrapper__header">
          <HeaderContainer />
        </div>
        <div className="app_wrapper__navbar">{<Navbar />}</div>
        <div className="app_wrapper__content">
          <Routes>
            <Route path="/*" element={<Navigate to={'/profile/'} />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users/:term?/:friend?/:page?" element={<Users />} />
            <Route
              path="/dialogs/*"
              element={
                <Suspense fallback={<Preloader />}>
                  <Dialogs />
                </Suspense>
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({ initialized: state.app.initialized });

export function withRouter(Children: any) {
  return (props: any) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MyApp: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default MyApp;
