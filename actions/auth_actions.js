import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, FACEBOOK_USER_DETAILS } from './types';
import { Facebook } from 'expo';
import axios from 'axios';


export const facebookLogin = (callback) => async (dispatch) => {

  let token = await AsyncStorage.getItem('fb_token');
  let fb_user_id = await AsyncStorage.getItem('fb_user_id');
  let fb_user_name = await AsyncStorage.getItem('fb_user_name');

  console.log('facebookLogin token: ' + token + ' fb_user_id: ' + fb_user_id + ' fb_user_name: ' + fb_user_name);


  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    dispatch({ type: FACEBOOK_USER_DETAILS, payload: {id: fb_user_id, name: fb_user_name } });

    if (callback) {
      callback();
    }
  } else {
    doFacebookLogin(dispatch, callback);
  }
};


const doFacebookLogin = async (dispatch, callback) => {
  //let result = await Facebook.logInWithReadPermissionsAsync('2054606067899136', { permissions: ['public_profile'] } );
  let result = { type: 'success', token: 'fake-token' };

  let { type, token } = result;

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  if (type === 'success') {
    //let responseFB = await axios.get(`https://graph.facebook.com/v2.11/me?access_token=${token}`);

    let responseFB = {
      data: { id: 'Profile1', name: 'fake-name'}
    };

    dispatch({ type: FACEBOOK_USER_DETAILS, payload: responseFB.data});
    const {id, name } = responseFB.data;

    /*
    console.log('token: ', token);
    console.log('id: ', id);
    console.log('name: ', name);
    */
    
    AsyncStorage.removeItem('fb_token');
    AsyncStorage.removeItem('fb_user_id');
    AsyncStorage.removeItem('fb_user_name');

    await AsyncStorage.setItem('fb_token', token);
    await AsyncStorage.setItem('fb_user_id', id );
    await AsyncStorage.setItem('fb_user_name', name );

    if (callback) {
      callback();
    }
  }

}
