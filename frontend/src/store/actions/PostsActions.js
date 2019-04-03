import axios from 'axios';

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

export const UPLOAD_IMAGE_LOADING = 'UPLOAD_IMAGE_FAILURE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/

// .then(() => historyPush('/'))
// .then(() => historyPush(`/discussion/${ discussion_id }`))

// add a post
export const addPost = (
  discussion_id,
  postBody,
  team_id,
  repliedPostID
) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { discussion_id, postBody, repliedPostID, team_id };
  dispatch({ type: ADD_POST_LOADING });
  return axios
    .post(`${backendURL}/posts/${user_id}`, body, headers)
    .then(res => dispatch({ type: ADD_POST_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, ADD_POST_FAILURE)(dispatch));
};

// edit a post
export const editPost = (
  user_id,
  post_id,
  postBody,
  historyPush,
  discussion_id
) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { post_id, postBody };
  dispatch({ type: EDIT_POST_LOADING });
  return axios
    .put(`${backendURL}/posts/${user_id}`, body, headers)
    .then(() => dispatch({ type: EDIT_POST_SUCCESS }))
    .then(() => historyPush('/'))
    .then(() => historyPush(`/discussion/${discussion_id}`))
    .catch(err => handleError(err, EDIT_POST_FAILURE)(dispatch));
};

// remove a post
export const removePost = post_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: REMOVE_POST_LOADING });
  return axios
    .delete(`${backendURL}/posts/${user_id}/${post_id}`, headers)
    .then(() => dispatch({ type: REMOVE_POST_SUCCESS }))

    .catch(err => handleError(err, REMOVE_POST_FAILURE)(dispatch));
};

export const uploadImage = imageData => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  let headers;

  if (imageData) {
    // avatar will be updated with given image
    headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token
      }
    };
  } else {
    // avatar will be reset to default
    headers = { headers: { Authorization: token } };
    imageData = { imageData };
  }

  dispatch({ type: UPLOAD_IMAGE_LOADING });

  return axios
    .post(`${backendURL}/posts/images/${user_id}`, imageData, headers)
    .then(res => dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, UPLOAD_IMAGE_FAILURE)(dispatch));
};

export const updatePostWithImage = (image_id, post_id) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const post_image = { image_id, post_id };
  return axios
    .put(`${backendURL}/posts/images/${user_id}`, post_image, headers)
    .then(res => console.log(res.data))
    .catch(err => handleError(err)(dispatch));
};

export const removeUpload = image_id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  return axios
    .delete(`${backendURL}/posts/images/${user_id}/${image_id}`, headers)
    .then(res => console.log(res.data))
    .catch(err => handleError(err)(dispatch));
};
