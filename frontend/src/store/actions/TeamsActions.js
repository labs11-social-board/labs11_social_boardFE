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

export const GET_TEAM_DISCUSSION_POSTS_LOADING = 'GET_TEAM_DISCUSSION_POSTS_LOADING';
export const GET_TEAM_DISCUSSION_POSTS_SUCCESS = 'GET_TEAM_DISCUSSION_POSTS_SUCCESS';
export const GET_TEAM_DISCUSSION_POSTS_FAILURE = 'GET_TEAM_DISCUSSION_POSTS_FAILURE';

export const UPDATE_TEAM_LOADING = 'UPDATE_TEAM_LOADING';
export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_FAILURE = 'UPDATE_TEAM_FAILURE';

export const ADD_TEAM_LOADING = 'ADD_TEAM_LOADING';
export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS';
export const ADD_TEAM_FAILURE = 'ADD_TEAM_FAILURE';

export const JOIN_TEAM_LOADING = 'JOIN_TEAM_LOADING';
export const JOIN_TEAM_SUCCESS = 'JOIN_TEAM_SUCCESS';
export const JOIN_TEAM_FAILURE = 'JOIN_TEAM_FAILURE';

export const LEAVE_TEAM_LOADING = 'LEAVE_TEAM_LOADING';
export const LEAVE_TEAM_SUCCESS = 'LEAVE_TEAM_SUCCESS';
export const LEAVE_TEAM_FAILURE = 'LEAVE_TEAM_FAILURE';

export const GET_TEAM_MEMBERS_LOADING = 'GET_TEAM_MEMBERS_LOADING';
export const GET_TEAM_MEMBERS_SUCCESS = 'GET_TEAM_MEMBERS_SUCCESS';
export const GET_TEAM_MEMBERS_FAILURE = 'GET_TEAM_MEMBERS_FAILURE';

export const DELETE_TEAM_LOADING = 'DELETE_TEAM_LOADING';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

export const GET_USERS_TEAMS_LOADING = 'GET_USERS_TEAMS_LOADING';
export const GET_USERS_TEAMS_SUCCESS = 'GET_USERS_TEAMS_SUCCESS';
export const GET_USERS_TEAMS_FAILURE= 'GET_USERS_TEAMS_FAILURE';

export const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE'; 
export const UPDATE_USER_ROLE_SUCCESS = 'UPDATE_USER_ROLE_SUCCESS';
export const UPDATE_USER_ROLE_FAILURE = 'UPDATE_USER_ROLE_FAILURE';

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
};

export const addTeam = team => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: ADD_TEAM_LOADING });
  return axios
    .post(`${backendUrl}/team/${user_id}`, team, headers)
    .then(res => dispatch({ type: ADD_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, ADD_TEAM_FAILURE)(dispatch));
};

// get a discussion by its id within a team by the discussions id
export const getTeamDiscussionsById = (discussion_id, order, orderType) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token, order, orderType } };
  dispatch({ type: GET_TEAM_DISCUSSION_POSTS_LOADING });
  return axios
    .get(`${backendUrl}/team/discussion/posts/${user_id}/${discussion_id}`, headers)
    .then(res => dispatch({ type: GET_TEAM_DISCUSSION_POSTS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_TEAM_DISCUSSION_POSTS_FAILURE)(dispatch));
};

export const joinTeam = team_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: JOIN_TEAM_LOADING });
  return axios
    .post(`${backendUrl}/team/team_members/${user_id}/${team_id}`, {}, headers)
    .then(res => dispatch({ type: JOIN_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, JOIN_TEAM_FAILURE)(dispatch));
};

export const leaveTeam = team_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: LEAVE_TEAM_LOADING });
  return axios
    .delete(`${backendUrl}/team/team_members/${user_id}/${team_id}`, headers)
    .then(res => dispatch({ type: LEAVE_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, LEAVE_TEAM_FAILURE)(dispatch));
};

export const getTeamMembers = team_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: GET_TEAM_MEMBERS_LOADING });
  return axios
  .get(`${backendUrl}/team/team_members/${user_id}/${team_id}`, headers)
  .then(res => dispatch({ type:GET_TEAM_MEMBERS_SUCCESS, payload: res.data }))
  .catch(err => handleError(err, GET_TEAM_MEMBERS_FAILURE)(dispatch));
};

export const updateTeam = (team_id, changes) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: UPDATE_TEAM_LOADING });
  return axios 
    .put(`${backendUrl}/team/${user_id}/${team_id}`, changes, headers)
    .then(res => dispatch({ type: UPDATE_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, UPDATE_TEAM_FAILURE)(dispatch));
};

export const deleteTeam = team_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: DELETE_TEAM_LOADING });
  return axios 
    .delete(`${backendUrl}/team/${user_id}/${team_id}`, headers)
    .then(res => dispatch({ type: DELETE_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, DELETE_TEAM_FAILURE)(dispatch));
};

export const addTeamMember = (team_member_id, team_id) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: JOIN_TEAM_LOADING });
  return axios
    .post(`${backendUrl}/team/team_members/${user_id}/${team_id}`, {team_member_id}, headers)
    .then(res => dispatch({ type: JOIN_TEAM_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, JOIN_TEAM_FAILURE)(dispatch));
};

export const getUsersTeams = (order, orderType) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token, order, orderType } };
  dispatch({ type: GET_USERS_TEAMS_LOADING });
  return axios.get(`${backendUrl}/users/teams/${user_id}`, headers)
    .then(res => dispatch({ type: GET_USERS_TEAMS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_USERS_TEAMS_FAILURE)(dispatch));
};

export const updateTeamWithLogo = (image_id, team_id) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const post_image = { image_id, team_id  };
	return axios
		.put(`${backendUrl}/posts/images/${user_id}`, post_image, headers)
		.then(res => dispatch({ type: 'UPDATE_TEAM_WITH_LOGO' }))
		.catch(err => handleError(err)(dispatch));
};

export const updateUserRole = (team_id, changing_id, role) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { role }
  dispatch({type: UPDATE_USER_ROLE})
  return axios
    .put(`${backendUrl}/team/update_role/${team_id}/${user_id}/${changing_id}`, body, headers)
    .then(res => dispatch({type: UPDATE_USER_ROLE_SUCCESS, payload: res.data}))
    .catch(err => handleError(err, UPDATE_USER_ROLE_FAILURE)(dispatch));
}
