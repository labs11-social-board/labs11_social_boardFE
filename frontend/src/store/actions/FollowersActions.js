import axios from "axios";

//helpers
import { handleError } from "../../helpers/index.js";

const backendURL = process.env.REACT_APP_BACKEND_URL;

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_FOLLOWERS = "GET_FOLLOWERS";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";

export const ADD_FOLLOWER = "ADD_FOLLOWER";
export const ADD_FOLLOWER_SUCCESS = "ADD_FOLLOWER_SUCCESS";
export const ADD_FOLLOWER_FAILURE = "ADD_FOLLOWER_FAILURE";

export const REMOVE_FOLLOWER = "REMOVE_FOLLOWER";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/

//GET FOLLOWERS LIST
export const getFollowers = (userId) => dispatch => {
  const token = localStorage.getItem("symposium_token");
  const headers = { headers: { Authorization: token } };
  dispatch({ type: GET_FOLLOWERS });
  return axios
    .get(`${backendURL}/followers/${userId}`, headers)
    // .get(`${backendURL}/followers/${userId}`)
    .then((res) => dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: res.data}))
    .catch(err => handleError(err, GET_FOLLOWERS_FAILURE)(dispatch));
};
//REMOVE FOLLOWER FROM LIST
export const removeFollower = following_id => dispatch => {
  const token = localStorage.getItem("symposium_token");
  const userId = localStorage.getItem("symposium_user_id");
  const headers = { headers: { Authorization: token } };
  dispatch({ type: REMOVE_FOLLOWER });
  return axios
    .delete(`${backendURL}/followers/${userId}/${following_id}`, headers)
    .then(() => dispatch({ type: REMOVE_FOLLOWER_SUCCESS }))
    .catch(err => handleError(err, REMOVE_FOLLOWER_FAILURE)(dispatch));
};

//ADD TO FOLLOWER LIST
export const addFollower = following_id => dispatch => {
  const token = localStorage.getItem("symposium_token");
  const userId = localStorage.getItem("symposium_user_id");
  const headers = { headers: { Authorization: token } };
  const body = {};
  dispatch({type: ADD_FOLLOWER})
  //userId has to be different than the following_id; 
  if(userId !== following_id){
      return axios
        .post(`${backendURL}/followers/${userId}/${following_id}`, body, headers)
        .then(() => dispatch({type: ADD_FOLLOWER_SUCCESS}))
        .catch(err => handleError(err, ADD_FOLLOWER_FAILURE)(dispatch));
  } else {
      dispatch({type: ADD_FOLLOWER_FAILURE, err: "A user cannot follow themselves"});
  }
};
