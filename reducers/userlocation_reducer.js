import { USER_CURRENT_LOCATION, USER_NEARBY_PLACES, USER_DETAILS } from '../actions/types';

const INITIAL_STATE = {
  userCurrentLocation: null,
  userNearByPlaces: null,
  userDetails: null
};

export default function ( state=INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAILS:
      return {...state, userDetails: action.payload};
    case USER_CURRENT_LOCATION:
      //console.log('reducer userCurrentLocation: ', action.payload);
      //console.log('current location reducer: ',action.payload);
      return { ...state, userCurrentLocation: action.payload };
    case USER_NEARBY_PLACES:
      //console.log('reducer userNearByPlaces: ', action.payload);
      return { ...state, userNearByPlaces: action.payload};
    default:
      return state;
  }
};
