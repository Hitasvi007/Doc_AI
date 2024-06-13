const initialState = {
  username: '',
  password: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password
      };
    default:
      return state;
  }
};

export default authReducer;
