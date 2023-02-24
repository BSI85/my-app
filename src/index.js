import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/redux-store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)} />
    </React.StrictMode>
  );
};
rerenderEntireTree(store.getState());
store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
});