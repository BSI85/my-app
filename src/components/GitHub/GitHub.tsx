import React, { useEffect, useState } from 'react';
import classes from './GitHub.module.css';
import { Button, Input } from 'antd';
import axios from 'axios';

type SearchUserType = {
  login: string;
  id: number;
};

type SearchResultType = {
  items: SearchUserType[];
};

type GitUserType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

const GitHub = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

  // const [tempSearch, setTempSearch] = useState('');
  const initialSearchState = '';
  const [searchTerm, setSearchTerm] = useState(initialSearchState);

  useEffect(() => {
    console.log('SYNK title');
    if (selectedUser) {
      console.log('SYNK title IF');
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  const onSubmit = (value: string) => {
    setSearchTerm(value);
  };

  const onUserSelect = (user: SearchUserType) => {
    setSelectedUser(user);
  };

  const onResetClick = () => {
    setSearchTerm(initialSearchState);
  };

  return (
    <div>
      <div className={classes.header}>
        Form to make requests from github in order to practice useState and useEffect
      </div>
      <div className={classes.container}>
        <div>
          <div>
            <GitHubSearch value={searchTerm} onSubmit={onSubmit} />
            <Button onClick={onResetClick}>Reset</Button>
          </div>
          <GitHubUsersList searchTerm={searchTerm} selectedUser={selectedUser} onUserSelect={onUserSelect} />
        </div>
        <div>
          <GitHubUserDetails selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default GitHub;

type GitHubSearchPropsType = {
  value: string;
  onSubmit: (fixedvalue: string) => void;
};

export const GitHubSearch = (props: GitHubSearchPropsType) => {
  const [tempSearch, setTempSearch] = useState('');

  useEffect(() => {
    setTempSearch(props.value);
  }, [props.value]);

  return (
    <div>
      <Input
        type="text"
        className={classes.input}
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {
          props.onSubmit(tempSearch);
        }}
      >
        Find
      </Button>
    </div>
  );
};

type GitHubUserListPropsType = {
  searchTerm: string;
  selectedUser: SearchUserType | null;
  onUserSelect: (user: SearchUserType) => void;
};

export const GitHubUsersList = (props: GitHubUserListPropsType) => {
  const [users, setUsers] = useState<SearchUserType[]>([]);

  useEffect(() => {
    if (!!props.searchTerm) {
      axios.get<SearchResultType>(`https://api.github.com/search/users?q=${props.searchTerm}`).then((res) => {
        setUsers(res.data.items);
      });
    }
  }, [props.searchTerm]);

  return (
    <div>
      <ul className={classes.ul}>
        {props.searchTerm &&
          users.map((u) => (
            <li
              key={u.id}
              className={props.selectedUser === u ? `${classes.selectedUser}  ${classes.li}` : classes.li}
              onClick={() => {
                props.onUserSelect(u);
              }}
            >
              {u.login}
            </li>
          ))}
      </ul>
    </div>
  );
};

type GitHubUserDetailsPropsType = {
  selectedUser: SearchUserType | null;
};

export const GitHubUserDetails = (props: GitHubUserDetailsPropsType) => {
  const [userDetails, setUserDetails] = useState<null | GitUserType>(null);

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    console.log('SYNK USERS DETAILS');
    if (!!props.selectedUser)
      axios.get<GitUserType>(`https://api.github.com/users/${props.selectedUser.login}`).then((res) => {
        setSeconds(10);
        setUserDetails(res.data);
      });
  }, [props.selectedUser]);

  useEffect(() => {
    if (seconds < 1) {
      setUserDetails(null);
    }
  }, [seconds]);

  return (
    <div>
      {' '}
      {userDetails && (
        <div className={classes.details}>
          <h2 className={classes.h2}> {userDetails.login}</h2>
          <Timer seconds={seconds} onTick={setSeconds} timerKey={userDetails.id} />
          <div>
            <img src={userDetails.avatar_url} alt="avatar" style={{ width: '150px' }} />
          </div>
          <div>id: {userDetails.id};</div>
          <div>node_id:{userDetails.node_id};</div>
          <div>url: {userDetails.url};</div>
          <div>type: {userDetails.type};</div>
          <div>site_admin: {userDetails.site_admin ? 'Admin' : 'Not Admin'};</div>
          <div>name: {userDetails.name};</div>
          <div>company: {userDetails.company};</div>
          <div>blog: {userDetails.blog};</div>
          <div>location: {userDetails.location};</div>
          <div>email: {userDetails.email};</div>
          <div>hireable: {userDetails.hireable};</div>
          <div>bio: {userDetails.bio};</div>
          <div>twitter_username: {userDetails.twitter_username}</div>
          <div>public_repos:{userDetails.public_repos}</div>
          <div>public_gists: {userDetails.public_gists}</div>
          <div>followers: {userDetails.followers};</div>
          <div>following: {userDetails.following}</div>
          <div>created_at: {userDetails.created_at}</div>
          <div>updated_at: {userDetails.updated_at}</div>
        </div>
      )}
    </div>
  );
};

type TimerPropsType = {
  seconds: number;
  onTick: (actualSeconds: number) => void;
  timerKey: number;
};

export const Timer = (props: TimerPropsType) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.onTick(seconds);
  }, [seconds]);

  useEffect(() => {
    const intID = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intID);
    };
  }, [props.timerKey]);

  return <div>Time left: {seconds} seconds</div>;
};
