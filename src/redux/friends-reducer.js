let initialState = {
  friendsData: [
    { id: 1, name: 'Zhiroslav', age: 26, online: 1 },
    { id: 2, name: 'Prol', age: 37, online: 1 },
    { id: 3, name: 'Fyodor', age: 31, online: 0 },
    { id: 4, name: 'Snezhana', age: 33, online: 1 },
    { id: 5, name: 'Balamut', age: 23, online: 0 },
    { id: 6, name: 'Alyona', age: 41, online: 1 },
    { id: 7, name: 'Valera', age: 29, online: 1 },
  ],
};

const friendsReducer = (state = initialState, action) => {
  return state;
};

export default friendsReducer;
