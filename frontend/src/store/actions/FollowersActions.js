import axios from 'axios'; 

//helpers 
import {handleError} from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;


/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_FOLLOWERS = 'GET_FOLLOWERS';
export const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
export const GET_FOLLOWERS_FAILURE = 'GET_FOLLOWERS_FAILURE';

export const ADD_FOLLOWER = 'ADD_FOLLOWER';
export const ADD_FOLLOWER_SUCCESS = 'ADD_FOLLOWER_SUCCESS';
export const ADD_FOLLOWER_FAILURE = 'ADD_FOLLOWER_FAILURE';

export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'; 
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';


/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/

//GET FOLLOWERS LIST 
export const getFollowers = () => dispatch => {
   const token = localStorage.getItem('symposium_token');
   const userId = localStoarage.getItem('symposium_user_id');
   const headers = {headers: {Authorization: token }};
   dispatch({ type: GET_FOLLOWERS })
   return axios.get(`${backendURL}/followers/${userId}`, headers)
        .then(() => dispatch({type: GET_FOLLOWERS_SUCCESS}))
        .catch(err => handleError(err, GET_FOLLOWERS_FAILURE)(dispatch)); 
}