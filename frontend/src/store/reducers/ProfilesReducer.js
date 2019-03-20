import {
    GET_PROFILES_SUCCESS,
    GET_PROFILES_LOADING,
    GET_PROFILES_FAILURE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_LOADING,
    GET_PROFILE_FAILURE,
  } from '../actions/index';
  
const initialState = {
    allProfiles: {
      loading: true,
      profiles: [],
    },
    singleProfileData: [
      {
        id: 0,
        username: '',
        email: '',
        status: '',
        discussions: [],
        posts: [],
        replies: [],
        discussionFollows: [],
        categoryFollows: [],
      }
    ],
};

export const ProfilesReducer = (state = initialState, action) =>{
  switch (action.type) {
    // Get all profiles
    case GET_PROFILES_SUCCESS:
        return {
        ...state,
        allProfiles: {
          loading: false,
          profiles: action.payload
        }
      };
    // Get single profile  
    case GET_PROFILE_SUCCESS:
        return {
        ...state,
        singleProfileData: action.payload
      };
    case GET_PROFILES_LOADING: 
    case GET_PROFILES_FAILURE: 
    case GET_PROFILE_LOADING:  
    case GET_PROFILE_FAILURE:
		default:
      return state;
  } 
}