import axios from 'axios';
import { SEARCH_GENDER_CHANGED, AGE_CHANGED, DISTANCE_CHANGED, SHOW_ME_CHANGED, SETTINGS_SUCCESS } from './types';


export const searchGenderChange = (value) => {
  //console.log('ActionCreator searchGenderChanged: ', value)
  return (
    { type: 'SEARCH_GENDER_CHANGED', payload: value }
  );
};

export const ageChange = (value) => {
  //console.log('ActionCreator ageChanged: ', value)
  return (
    { type: 'AGE_CHANGED', payload: value }
  );
};

export const distanceChange = (value) => {
  //console.log('ActionCreator distanceChanged: ', value)
  return (
    { type: 'DISTANCE_CHANGED', payload: value }
  );
};

export const showMeChange = (value) => {
  //console.log('ActionCreator showMeChanged: ', value)
  return (
    { type: 'SHOW_ME_CHANGED', payload: value }
  );
};

export const saveSettings = ({distance, age, searchGender, showMe}) => async(dispatch) => {
  const settingsURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/settings';
  let responseSettings = await axios.post(settingsURL, {
    "profileId":"Profile1",
	   "maxDistance": distance,
	   "searchGender": searchGender,
	   "minSearchAge":18,
	   "maxSearchAge": age,
	   "poiType":"Restaurant"
  });

  //console.log('responseSettings: ', responseSettings.data);
  dispatch({type: SETTINGS_SUCCESS, payload: responseSettings.data});

};
