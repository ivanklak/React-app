import profileReducer from '../reducers';
import {ProfileActions} from '../actions';

const state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 11},
  ],
  profile: null,
  status: '',
  newPostText: '',
};

it('length of posts should be incremented', () => {
  // 1. start data
  const action = ProfileActions.addPost('I am best programmer');
  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  // 1. start data
  const action = ProfileActions.addPost('I am best programmer');

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts[2].message).toBe('I am best programmer');
});
it('after deleting length of messages should be decrement', () => {
  // 1. start data
  const action = ProfileActions.deletePost(1);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(1);
});
it("length of messages shouldn't be decrement if id is incorrect", () => {
  // 1. start data
  const action = ProfileActions.deletePost(4);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(2);
});
