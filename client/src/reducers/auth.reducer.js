import {userConstants} from '../constants/user.constants';

let user;
try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (e) {
  user = undefined
}

const initialState = user ? { loggedIn: true, user } : {};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}