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

// UPDATE_PROFILE,
// UPDATE_PROFILE_SUCCESSFUL,
// UPDATE_PROFILE_FAILURE,
// updateProfile
 

 /***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/

 export  const updateProfile = (userId, bio, twitter, github, linkedin) => dispatch => {
    console.log("updatingProfile");
    const token = localStorage.getItem("symposium_token");
    const headers = { headers: { Authorization: token } };
    dispatch({type: UPDATE_PROFILE});
    let body = { bio };
    return axios
    .put(`${backendUrl}/users/bio/${userId}`, body, headers)
    .then (response => {
        body = { twitter }
        return axios 
        .put(`${backendUrl}/users/twitter/${userId}`, body, headers)
        .then(response => {
            body = { github }
            return axios 
            .put(`${backendUrl}/users/github/${userId}`, body, headers)
            .then (response => {
                body = { linkedin }
                return axios 
                .put(`${backendUrl}/users/linkedin/${userId}`, body, headers)
                .then (response => {
                    dispatch({type: UPDATE_PROFILE_SUCCESSFUL})
                })
                .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
            })
            .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
        })
        .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));

    })
    .catch(err => handleError(err, UPDATE_PROFILE_FAILURE)(dispatch));
 }