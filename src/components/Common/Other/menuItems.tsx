import React from 'react';
import { NavLink } from 'react-router-dom';
import type { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    label: <NavLink to="/profile">Profile</NavLink>,
    key: 'profile',
    icon: null,
  },
  {
    label: <NavLink to="/users">Users</NavLink>,
    key: 'users',
    icon: null,
  },
  {
    label: <NavLink to="/dialogs">Dialogs</NavLink>,
    key: 'dialogs',
    icon: null,
  },
  {
    label: <NavLink to="/chat">Chat</NavLink>,
    key: 'chat',
    icon: null,
  },
  {
    label: <NavLink to="/news">News</NavLink>,
    key: 'news',
    icon: null,
  },
  {
    label: <NavLink to="/github">GitHub</NavLink>,
    key: 'github',
    icon: null,
  },
  {
    label: <NavLink to="/music">Music</NavLink>,
    key: 'music',
    icon: null,
  },
  {
    label: <NavLink to="/settings">Settings</NavLink>,
    key: 'settings',
    icon: null,
  },
];
