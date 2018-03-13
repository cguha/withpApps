import { USER_CURRENT_LOCATION, USER_NEARBY_PLACES, USER_DETAILS } from './types';
import userNearByPlaces from '../stubdata/GetNearByPlaces.json';
import { AsyncStorage } from 'react-native';
import axios from 'axios';


export const createUserDetails = () => async(dispatch) => {
  //console.log('createUserDetails');
  //let fb_user_id = await AsyncStorage.getItem('fb_user_id');
  //let fb_user_name = await AsyncStorage.getItem('fb_user_name');

  const userURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users';
  userData = {
    profileId: fb_user_id,
    name: fb_user_name,
    gender: 'M'
  };

  let responseUserData = await axios.post(userURL, userData);
  //console.log('responseUserData: ', responseUserData);
  dispatch({type: USER_DETAILS, payload: responseUserData.data});
};


export const getUserCurrentLocation = (profileId) => async(dispatch) => {
  console.log('getUserCurrentLocation profileId: ', profileId);
  navigator.geolocation.getCurrentPosition(
    (position) => {setPosition(position, profileId); dispatch({ type: USER_CURRENT_LOCATION, payload: position })},
    (error) => {console.log(error)},
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

  const setPosition = (position, profileId) => {
    getNearByPlaces(dispatch, position, profileId);
  }

};

const getNearByPlaces = async (dispatch, position, profileId) => {
  //console.log('***** position: ', position);
  const {latitude, longitude} = position.coords;
  const latlonURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/location/latlon';
  let responseLatLon = await axios.post(latlonURL, {
	    "profileId":profileId,
	    "latitude":latitude,
	    "longitude":longitude
  });
  console.log('*** responseLatLon: ', responseLatLon);

  if (responseLatLon.data.poiId === 'NoPlaceId') {
    const URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.417274,-0.947635&radius=10&key=AIzaSyAOGS2GwieA9bw8ZzNtJOgX5CYmi4qPDho';
    let { data } = await axios.get(URL);
    console.log('data', data.results[0]);

    //console.log('action userNearByPlaces: ', userNearByPlaces);

    const locationURL = 'http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/location';
    const locationData = {
	      "profileId": profileId,
	      "latitude": latitude,
	      "longitude":longitude,
	      "poiId": data.results[0].place_id,
	      "poiName": data.results[0].name,
	      "poiType": "Home",
	      "poiAddress": "Shinfield",
	      "poiInterest": 'Y',
	      "poiPhone": "07729187623",
	      "poiWebsite": "www.place1.com",
	      "poiRating": 5.4321
    };
    console.log('locationData', locationData);
    let locationResponse = await axios.post(locationURL, locationData);

    console.log('locationResponse', locationResponse);

    //dispatch({ type: USER_NEARBY_PLACES, payload: userNearByPlaces });
  }


  const nearByPlacesURL = `http://ec2-34-245-2-151.eu-west-1.compute.amazonaws.com:8080/v1/users/nearbyplaces`;
  const nearByPlacesData = { "profileId": profileId };

  //console.log('nearByPlacesURL: ', nearByPlacesURL);
  let nearByPlacesResponse = await axios.post(nearByPlacesURL, nearByPlacesData);
  console.log('nearByPlacesResponse: ', nearByPlacesResponse);
  dispatch({ type: USER_NEARBY_PLACES, payload: nearByPlacesResponse.data.list });



}
