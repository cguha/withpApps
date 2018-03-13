import { USERS_AT_SELECTED_PLACE, PLACE_DETAILS} from './types';
import axios from 'axios';
import usersAtSelectedPlace from '../stubdata/GetUsersByPlace.json';

export const getUsersAtSelectedPlace = (selectedPlaceDetails, callback) => async (dispatch) => {
  try {
    //console.log('selectedPlaceDetails: ', selectedPlaceDetails);
    //console.log('***getUsersAtSelectedPlace callback: ');
    dispatch({ type: PLACE_DETAILS, payload: selectedPlaceDetails });

    //call other users at this place
    const usersAtPoiURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/pois/others';
    let usersAtPoiURLInput = { poiId: selectedPlaceDetails.poiId };
    usersAtPoiResponse = await axios.post(usersAtPoiURL, usersAtPoiURLInput);
    console.log('usersAtPoiResponse: ', usersAtPoiResponse);

    dispatch({ type: USERS_AT_SELECTED_PLACE, payload: usersAtPoiResponse.data.list });
    callback();
  } catch(e) {
    console.error(e);
  }

};
