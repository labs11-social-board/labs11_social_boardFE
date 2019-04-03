import axios from "axios";

//helpers
import { handleError } from "../../helpers/index.js";

//globals
import { backendUrl } from "../../globals/globals.js";

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESSFUL = "UPDATE_PROFILE_SUCCESSFUL";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";

export const UPDATE_BIO = "UPDATE_BIO";
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



export const updateProfile = (
  userId,
  bio,
  twitter,
  github,
  linkedin
) => dispatch => {
  const token = localStorage.getItem("symposium_token");
  const headers = { headers: { Authorization: token } };
  console.log(bio, twitter, github, linkedin);
  dispatch({ type: UPDATE_PROFILE });
  if (bio !== null) {
    const body = { bio };
    dispatch({ type: UPDATE_BIO });
    axios
      .put(`${backendUrl}/users/bio/${userId}`, body, headers)
      .then(response => {
        dispatch({ type: UPDATE_BIO_SUCCESSFUL });
      })
      .catch(err => handleError(err, UPDATE_BIO_FAILURE)(dispatch));
  }

  if (twitter !== null) {
    const body = { twitter };
    dispatch({ type: UPDATE_TWITTER });
    axios
      .put(`${backendUrl}/users/twitter/${userId}`, body, headers)
      .then(response => {
        dispatch({ type: UPDATE_TWITTER_SUCCESSFUL });
      })
      .catch(err => handleError(err, UPDATE_TWITTER_FAILURE)(dispatch));
  }

  if (github !== null) {
    const body = { github };
    dispatch({ type: UPDATE_GITHUB });
    axios
      .put(`${backendUrl}/users/github/${userId}`, body, headers)
      .then(response => {
        dispatch({ type: UPDATE_GITHUB_SUCCESSFUL });
      })
      .catch(err => handleError(err, UPDATE_GITHUB_FAILURE)(dispatch));
  }

  if (linkedin !== null) {
    const body = { linkedin };
    dispatch({ type: UPDATE_LINKEDIN_SUCCESSFUL });
    axios
      .put(`${backendUrl}/users/linkedin/${userId}`, body, headers)
      .then(response => {
        dispatch({ type: UPDATE_LINKEDIN_SUCCESSFUL });
      })
      .catch(err => handleError(err, UPDATE_LINKEDIN_FAILURE)(dispatch));
  }
};


