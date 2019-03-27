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

export const GET_TEAM_DISCUSSIONS_LOADING = 'GET_TEAM_DISCUSSIONS_LOADING';
export const GET_TEAM_DISCUSSIONS_SUCCESS = 'GET_TEAM_DISCUSSIONS_SUCCESS';
export const GET_TEAM_DISCUSSIONS_FAILURE = 'GET_TEAM_DISCUSSIONS_FAILURE';

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
 };

 export const getTeamDiscussions = (team_id, order, orderType) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token, order, orderType } };
  dispatch({ type: GET_TEAM_DISCUSSIONS_LOADING });
  return axios.get(`${backendUrl}/team/discussions/${user_id}/${team_id}`, headers)
    .then(res => dispatch({ type: GET_TEAM_DISCUSSIONS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_TEAM_DISCUSSIONS_FAILURE)(dispatch));
 }