import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const HANDLE_REPLY_VOTE_LOADING = 'HANDLE_REPLY_VOTE_LOADING';
export const HANDLE_REPLY_VOTE_SUCCESS = 'HANDLE_REPLY_VOTE_SUCCESS';
export const HANDLE_REPLY_VOTE_FAILURE = 'HANDLE_REPLY_VOTE_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const handleReplyVote = (reply_id, type) => dispatch => {
	const user_id = localStorage.getItem('symposium_user_id');
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
	const body = { reply_id, type };
	dispatch({ type: HANDLE_REPLY_VOTE_LOADING });
	return axios.post(`${ backendURL }/reply-votes/${ user_id }`, body, headers)
		.then(() => dispatch({ type: HANDLE_REPLY_VOTE_SUCCESS }))
		.catch(err => handleError(err, HANDLE_REPLY_VOTE_FAILURE)(dispatch));
};
