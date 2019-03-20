import axios	from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const ADD_POST_LOADING = 'ADD_POST_LOADING';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_LOADING = 'EDIT_POST_LOADING';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const REMOVE_POST_LOADING = 'REMOVE_POST_LOADING';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
// add a post
export const addPost = (discussion_id, postBody, historyPush, repliedPostID) => dispatch => {
	const user_id = localStorage.getItem('symposium_user_id');
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const body = { discussion_id, postBody, repliedPostID };
	dispatch({ type: ADD_POST_LOADING });
	return axios.post(`${ backendURL }/posts/${ user_id }`, body, headers)
		.then(() => dispatch({ type: ADD_POST_SUCCESS }))
		.then(() => historyPush('/'))
		.then(() => historyPush(`/discussion/${ discussion_id }`))
		.catch(err => handleError(err, ADD_POST_FAILURE)(dispatch));
};

// edit a post
export const editPost = (user_id, post_id, postBody, historyPush, discussion_id) => dispatch => {
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const body = { post_id, postBody };
	dispatch({ type: EDIT_POST_LOADING });
	return axios.put(`${ backendURL }/posts/${ user_id }`, body, headers)
		.then(() => dispatch({ type: EDIT_POST_SUCCESS }))
		.then(() => historyPush('/'))
		.then(() => historyPush(`/discussion/${ discussion_id }`))
		.catch(err => handleError(err, EDIT_POST_FAILURE)(dispatch));
};

// remove a post
export const removePost = (user_id, post_id, historyPush, discussion_id) => dispatch => {
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token, post_id } };
	dispatch({ type: REMOVE_POST_LOADING });
	return axios.delete(`${ backendURL }/posts/${ user_id }`, headers)
		.then(() => dispatch({ type: REMOVE_POST_SUCCESS }))
		.then(() => historyPush('/'))
		.then(() => historyPush(`/discussion/${ discussion_id }`))
		.catch(err => handleError(err, REMOVE_POST_FAILURE)(dispatch));
};
