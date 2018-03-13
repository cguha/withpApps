import { SEARCH_GENDER_CHANGED, AGE_CHANGED, DISTANCE_CHANGED, SHOW_ME_CHANGED, SETTINGS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  searchGender: '',
  age: 40,
  distance: 5,
  showMe: true,
  userSettings: null
};

export default function (state=INITIAL_STATE, action) {
  switch (action.type) {
    /*
    console.log('settings reducer type: ', action.type);
    console.log('settings reducer data: ', action.payload);
    console.log('settings reducer state: ', state);
    */
    case AGE_CHANGED:
      return ({ ...state, age: action.payload});
    case DISTANCE_CHANGED:
      return ( { ...state, distance: action.payload} );
    case SEARCH_GENDER_CHANGED:
      return ( { ...state, searchGender: action.payload} );
    case SHOW_ME_CHANGED:
     return ( { ...state, showMe: action.payload} );
    case SETTINGS_SUCCESS:
     return ( {...state, userSettings: action.payload} );
    default:
      return state;
  }
};
