import { ProfileType } from '../components/types/ProfileType';
import profileReducer, { profileActions } from './profile-reducer';

let state = {
  postsData: [
    { id: 1, post: 'Hi, how are you', likes: 35 },
    { id: 2, post: "It's my first post", likes: 28 },
    { id: 3, post: 'Hello!', likes: 5 },
  ],
  profile: null as unknown as ProfileType,
  status: '',
};

test('length of posts should be incremented', () => {
  //1. test data
  let action = profileActions.addPostCreator('hui');

  //2. expectation
  let newState = profileReducer(state, action);

  //3. expectation
  expect(newState.postsData.length).toBe(4);
});

test('message should be correct', () => {
  //1. test data
  let action = profileActions.addPostCreator('hui');

  //2. expectation
  let newState = profileReducer(state, action);

  //3. expectation

  expect(newState.postsData[0].post).toBe('hui');
});

// test('after deleting length of messages should be decremented', () => {
//   //1. test data
//   let action = deletePostCreator(1);

//   //2. expectation
//   let newState = profileReducer(state, action);

//   //3. expectation

//   expect(newState.postsData.length).toBe(2);
// });

// test('after deleting wrong id, number of messages should not be decremented', () => {
//   //1. test data
//   let action = deletePostCreator(1000);

//   //2. expectation
//   let newState = profileReducer(state, action);

//   //3. expectation

//   expect(newState.postsData.length).toBe(3);
// });
