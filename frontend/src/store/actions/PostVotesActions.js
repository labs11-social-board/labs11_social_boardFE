import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const HANDLE_POST_VOTE_LOADING = 'HANDLE_POST_VOTE_LOADING';
export const HANDLE_POST_VOTE_SUCCESS = 'HANDLE_POST_VOTE_SUCCESS';
export const HANDLE_POST_VOTE_FAILURE = 'HANDLE_POST_VOTE_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const handlePostVote = (post_id, type) => dispatch => {
	const user_id = localStorage.getItem('symposium_user_id');
	const token = localStorage.getItem('symposium_token');
	const headers = { headers: { Authorization: token } };
    const body = { post_id, type };
	dispatch({ type: HANDLE_POST_VOTE_LOADING });
    //Sends the post request back to postVotesRouter.js
	return axios.post(`${ backendURL }/post-votes/${ user_id }`, body, headers)
		.then(() => dispatch({ type: HANDLE_POST_VOTE_SUCCESS }))
		.catch(err => handleError(err, HANDLE_POST_VOTE_FAILURE)(dispatch));
};
