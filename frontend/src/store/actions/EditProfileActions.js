import axios from 'axios'; 

//helpers 
import { handleError } from '../../helpers/index.js';

//globals
import { backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const UPDATE_PROFILE  = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESSFUL = "UPDATE_PROFILE_SUCCESSFUL";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const UPDATE_BIO  = "UPDATE_BIO"; 
export const UPDATE_BIO_SUCCESSFUL = "UPDATE_BIO_SUCCESSFUL";
export const UPDATE_BIO_FAILURE = "UPDATE_BIO_FAILURE";

export const UPDATE_TWITTER = "UPDATE_TWITTER";
export const UPDATE_TWITTER_SUCCESSFUL = "UPDATE_TWITTER_SUCCESSFUL";
export const UPDATE_TWITTER_FAILURE = "UPDATE_TWITTER_FAILURE";

export const UPDATE_LINKEDIN = "UPDATE_LINKEDIN";
export const UPDATE_LINKEDIN_SUCCESSFUL = "UPDATE_LINKEDIN_SUCCESSFUL";
export const UPDATE_LINKEDIN_FAILURE = "UPDATE_LINKEDIN_FAILURE";

export const UPDATE_GITHUB = "UPDATE_GITHUB";
export const UPDATE_GITHUB_SUCCESSFUL = "UPDATE_GITHUB_SUCCESSFUL";
export const UPDATE_GITHUB_FAILURE = "UPDATE_GITHUB_FAILURE";

// UPDATE_PROFILE,
// UPDATE_PROFILE_SUCCESSFUL,
// UPDATE_PROFILE_FAILURE,

// UPDATE_BIO, 
// UPDATE_BIO_SUCCESSFUL,
// UPDATE_BIO_FAILURE,

// UPDATE_LINKEDIN, 
// UPDATE_LINKEDIN_SUCCESSFUL,
// UPDATE_LINKEDIN_FAILURE,

// UPDATE_GITHUB, 
// UPDATE_GITHUB_SUCCESSFUL,
// UPDATE_GITHUB_FAILURE,

// UPDATE_TWITTER, 
// UPDATE_TWITTER_SUCCESSFUL,
// UPDATE_TWITTER_FAILURE,

// updateProfile
 

 /***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

//  export  const updateProfile = (userId, bio, twitter, github, linkedin) => dispatch => {
//     const token = localStorage.getItem("symposium_token");
//     const headers = { headers: { Authorization: token } };
//     dispatch({type: UPDATE_PROFILE});
//     let body = { bio };
//     return axios
//     .put(`${backendUrl}/users/bio/${userId}`, body, headers)
//     .then (response => {
//         body = { twitter }
//         return axios 
//         .put(`${backendUrl}/users/twitter/${userId}`, body, headers)
//         .then(response => {
//             body = { github }
//             return axios 
//             .put(`${backendUrl}/users/github/${userId}`, body, headers)
//             .then (response => {
//                 body = { linkedin }
//                 return axios 
//                 .put(`${backendUrl}/users/linkedin/${userId}`, body, headers)
//                 .then (response => {
//                     dispatch({type: UPDATE_PROFILE_SUCCESSFUL})
//                 })
//                 .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
//             })
//             .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
//         })
//         .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));

//     })
//     .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
//  }

/*Checks to make sure the paramater is not null if it is not calls the function associated with the paramater*/
export const updateProfile = async (userId, bio, twitter, github, linkedin) => async dispatch => {
  const token = localStorage.getItem("symposium_token");
  const headers = { headers: { Authorization: token } };
  dispatch({type: UPDATE_PROFILE})
  if(bio !== null){
    await updateBio(headers, userId, bio);
  }
  if (twitter !== null){
    await updateTwitter(headers, userId, twitter); 
  }

  if (github !== null){
    await updateGithub(headers, userId, github);
  }

  if (linkedin !== null){
    await updateLinkedin(headers, userId, linkedin);
  }
  dispatch({type: UPDATE_PROFILE_SUCCESSFUL});
}

 export const updateBio = (headers, userId, bio) => dispatch => {
    const body = { bio }
    dispatch({type: UPDATE_BIO})
    return axios 
    .put(`${backendUrl}/users/bio/${userId}`, body, headers)
    .then(response => {
        dispatch({type: UPDATE_BIO_SUCCESSFUL})
    })
    .catch(err => handleError(err, UPDATE_BIO_FAILURE)(dispatch))
 }

 export const updateTwitter = (headers, userId, twitter) => dispatch => {
    const body = { twitter }
    dispatch({type: UPDATE_TWITTER})
    return axios
    .put(`${backendUrl}/users/twitter/${userId}`, body, headers)
    .then(response => {
        dispatch({type : UPDATE_TWITTER_SUCCESSFUL})
    })
    .catch(err => handleError(err, UPDATE_TWITTER_FAILURE)(dispatch))
 }

 export const updateGithub = (headers, userId, github) => dispatch => {
    const body = { github }
    dispatch({type : UPDATE_GITHUB})
    return axios
    .put(`${backendUrl}/users/github/${userId}`, body, headers)
    .then(response => {
        dispatch({type : UPDATE_GITHUB_SUCCESSFUL})
    })
    .catch(err => handleError(err, UPDATE_GITHUB_FAILURE)(dispatch))
 }

 export const updateLinkedin = ( headers, userId, linkedin) => dispatch => {
    const body = { linkedin }
    dispatch({type : UPDATE_LINKEDIN_SUCCESSFUL})
    return axios
    .put(`${backendUrl}/users/linkedin/${userId}`, body, headers)
    .then(response => {
        dispatch({type : UPDATE_LINKEDIN_SUCCESSFUL})
    })
    .catch(err => handleError(err, UPDATE_LINKEDIN_FAILURE)(dispatch))
 }