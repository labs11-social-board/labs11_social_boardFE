import axios from 'axios';
import { backendUrl } from '../../globals/globals.js';

// helpers
import { handleError } from '../../helpers/index.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Get all profiles
export const GET_PROFILES_LOADING = 'GET_PROFILES_LOADING';
export const GET_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS';
export const GET_PROFILES_FAILURE = 'GET_PROFILES_FAILURE';

// Get single profile
export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';


/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/

// Get all profiles
export const getProfiles = () => dispatch => {
    dispatch({ type: GET_PROFILES_LOADING});
    return axios.get(`${ backendUrl }/users`)
      .then(res => {
      dispatch({ type: GET_PROFILES_SUCCESS, payload: res.data }) }
      )
      .catch(err => handleError(err, GET_PROFILES_FAILURE)(dispatch));
};

// Get single profile
export const getProfile = (user_id, history) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: GET_PROFILE_LOADING });
  return axios.get(`${backendUrl}/users/user/${user_id}`, headers)
    .then(res => dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data }))
    .catch(err => {
      history.push('/home');
      handleError(err, GET_PROFILE_FAILURE)(dispatch);
    });
};
