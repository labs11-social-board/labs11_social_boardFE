import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESSFUL,
  UPDATE_PROFILE_FAILURE,
  UPDATE_BIO, 
  UPDATE_BIO_SUCCESSFUL,
  UPDATE_BIO_FAILURE,

  UPDATE_LINKEDIN, 
  UPDATE_LINKEDIN_SUCCESSFUL,
  UPDATE_LINKEDIN_FAILURE,

  UPDATE_GITHUB, 
  UPDATE_GITHUB_SUCCESSFUL,
  UPDATE_GITHUB_FAILURE,

  UPDATE_TWITTER, 
  UPDATE_TWITTER_SUCCESSFUL,
  UPDATE_TWITTER_FAILURE,

  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESSFUL,
  UPDATE_LOCATION_FAILURE,
} from "../actions/index.js";

export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
    case UPDATE_PROFILE_SUCCESSFUL:
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state
      }
    
    case UPDATE_BIO:
    case UPDATE_BIO_SUCCESSFUL:
    case UPDATE_BIO_FAILURE:
      return {
        ...state
      }

    case UPDATE_LINKEDIN: 
    case UPDATE_LINKEDIN_SUCCESSFUL:
    case UPDATE_LINKEDIN_FAILURE:
      return {
        ...state
      }

    case UPDATE_GITHUB: 
    case UPDATE_GITHUB_SUCCESSFUL:
    case UPDATE_GITHUB_FAILURE:
      return {
        ...state
      }

    case UPDATE_TWITTER: 
    case UPDATE_TWITTER_SUCCESSFUL:
    case UPDATE_TWITTER_FAILURE:
    case UPDATE_LOCATION:
    case UPDATE_LOCATION_SUCCESSFUL:
    case UPDATE_LOCATION_FAILURE:
    default:
      return state;
  }
};
