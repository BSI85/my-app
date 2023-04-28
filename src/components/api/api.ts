import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '24b47d6b-6530-492a-8e67-c175ec8bd72c',
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});
