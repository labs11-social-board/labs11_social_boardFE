import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

// globals
import { backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_CATEGORIES_LOADING = 'GET_CATEGORIES_LOADING';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export const GET_CATEGORIES_FOLLOWED_LOADING = 'GET_CATEGORIES_FOLLOWED_LOADING';
export const GET_CATEGORIES_FOLLOWED_SUCCESS = 'GET_CATEGORIES_FOLLOWED_SUCCESS';
export const GET_CATEGORIES_FOLLOWED_FAILURE = 'GET_CATEGORIES_FOLLOWED_FAILURE';

export const FOLLOW_CATEGORY_LOADING = 'FOLLOW_CATEGORY_LOADING';
export const FOLLOW_CATEGORY_SUCCESS = 'FOLLOW_CATEGORY_SUCCESS';
export const FOLLOW_CATEGORY_FAILURE = 'FOLLOW_CATEGORY_FAILURE';

export const ADD_CATEGORY_LOADING = 'ADD_CATEGORY_LOADING';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';


/***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

export const getCategories = (order, orderType) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token, order, orderType } };
  dispatch({ type: GET_CATEGORIES_LOADING });
  return axios.get(`${backendUrl}/categories/${user_id}`, headers)
    .then(res => dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_CATEGORIES_FAILURE)(dispatch));
};

export const getCategoriesFollowed = () => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: GET_CATEGORIES_FOLLOWED_LOADING });
  return axios.get(`${backendUrl}/categories/followed/${user_id}`, headers)
    .then(res => dispatch({ type: GET_CATEGORIES_FOLLOWED_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_CATEGORIES_FOLLOWED_FAILURE)(dispatch));
};

export const followCategory = (category_id, user_id, historyPush, onCategoriesPage) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: FOLLOW_CATEGORY_LOADING });
  return axios.post(`${backendUrl}/category-follows/${user_id}/${category_id}`, {}, headers)
    .then(res => dispatch({ type: FOLLOW_CATEGORY_SUCCESS, payload: res.data }))
    .then(() => !onCategoriesPage && historyPush('/'))
    .then(() => !onCategoriesPage && historyPush(`/discussions/category/${category_id}`))
    .catch(err => handleError(err, FOLLOW_CATEGORY_FAILURE)(dispatch));
};

export const addCategory = (newCategory, historyPush) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { newCategory };
  dispatch({ type: ADD_CATEGORY_LOADING });
  return axios.post(`${backendUrl}/categories/${user_id}`, body, headers)
    .then(async res => {
      dispatch({ type: ADD_CATEGORY_SUCCESS });
      await followCategory(res.data, user_id, historyPush)(dispatch);
      historyPush(`/discussions/category/${res.data}`);
    })
    .catch(err => handleError(err, ADD_CATEGORY_FAILURE)(dispatch));
};
