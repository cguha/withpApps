import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, FACEBOOK_USER_DETAILS } from '../actions/types';

const INITIAL_STATE = {
  fbToken: '',
  fbUserDtails: null
};

export default function ( state=INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, fbToken: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { fbToken: null };
    case FACEBOOK_USER_DETAILS:
      console.log('**** auth reducer: ', action.payload)
      return {...state, fbUserDtails: action.payload};
    default:
      return state;
  }
}
