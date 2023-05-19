import React, { Suspense, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import classes from './App.module.css';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { useParams } from 'react-router-dom';
import { initializeApp } from './redux/app-reduser';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/Common/Preloader';
import Users from './components/Users/Users';
//import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
import { items } from './components/Common/Other/menuItems';
import HeaderLogin from './components/Header/HeaderLogin';
import GitHub from './components/GitHub/GitHub';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ChatPageContainer = React.lazy(() => import('./components/pages/Chat/ChatPage'));

const { Header, Content, Footer, Sider } = Layout;

type MSTPType = ReturnType<typeof mapStateToProps>;
type MDTPType = {
  initializeApp: () => void;
};

const catchAllUnhandledErrors = () => {
  alert('Some error occured');
};

const App: React.FC<MSTPType & MDTPType> = (props) => {
  useEffect(() => {
    props.initializeApp();
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
    return () => window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (!props.initialized) {
    return <Preloader />;
  }
  return (
    <div className={classes.app_wrapper}>
      <Layout style={{ minHeight: '100wh', maxWidth: 1400 }}>
        <Header className="header">
          <Row>
            <Col span={1}>
              <img src={require('../src/pictures/Logo.png')} alt="My Social Network" style={{ width: 62 }} />
            </Col>
            <Col span={8}>
              <div className={classes.network_name}>My Social Network</div>
            </Col>
            <Col span={3} offset={12}>
              <HeaderLogin />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'App' }]} />
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['profile']}
                defaultOpenKeys={['profile']}
                style={{ height: '100%' }}
                items={items}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: '70vh' }}>
              <Routes>
                <Route path="/*" element={<Navigate to={'/profile/'} />} />
                <Route path="/profile/:userId?" element={<ProfileContainer />} />
                <Route path="/users/:term?/:friend?/:page?" element={<Users />} />
                <Route
                  path="/dialogs/*"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <DialogsContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/chat/*"
                  element={
                    <Suspense fallback={<Preloader />}>
                      <ChatPageContainer />
                    </Suspense>
                  }
                />
                <Route path="/news" element={<News />} />
                <Route path="/github" element={<GitHub />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Sergey Bityugov ©2023</Footer>
      </Layout>
    </div>
  );
};

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
