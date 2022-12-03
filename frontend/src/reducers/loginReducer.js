import * as types from '../actions';

export default function(state = [], action) {
  const response = action.response;
    console.log("loginREducer")
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...state, response };
    case types.LOGIN_USER_ERROR:
      return { ...state, response };
    case types.LOGOUT_USER_SUCCESS:
        return { ...state, response };
    case types.LOGOUT_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
};