import { USERS_AT_SELECTED_PLACE, PLACE_DETAILS} from '../actions/types';

INITIAL_STATE = {
  usersAtSelectedPlace: null,
  selectedPlaceDetails: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_AT_SELECTED_PLACE:
      //console.log('usersAtSelectedPlace:', usersAtSelectedPlace);
      return { ...state, usersAtSelectedPlace: action.payload };
    case PLACE_DETAILS:
      //console.log('selectedPlaceDetails: ', placeDetails);
      return { ...state, selectedPlaceDetails: action.payload};
    default:
      return state;
  }
};
