import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

// globals
import { backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_TEAMS_LOADING = 'GET_TEAMS_LOADING';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';

export const GET_TEAMS_FOLLOWED_LOADING = 'GET_TEAMS_FOLLOWED_LOADING';
export const GET_TEAMS_FOLLOWED_SUCCESS = 'GET_TEAMS_FOLLOWED_SUCCESS';
export const GET_TEAMS_FOLLOWED_FAILURE = 'GET_TEAMS_FOLLOWED_FAILURE';

export const ADD_TEAM_LOADING = 'ADD_TEAM_LOADING';
export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS';
export const ADD_TEAM_FAILURE = 'ADD_TEAM_FAILURE';


/***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

 export const getTeams = (order, orderType) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token, order, orderType } };
  dispatch({ type: GET_TEAMS_LOADING });
  return axios.get(`${backendUrl}/team/teams/${user_id}`, headers)
    .then(res => dispatch({ type: GET_TEAMS_SUCCESS, payload: res.data.teams }))
    .catch(err => handleError(err, GET_TEAMS_FAILURE)(dispatch));
 }