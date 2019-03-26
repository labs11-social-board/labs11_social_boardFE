import {
GET_FOLLOWERS,
GET_FOLLOWERS_SUCCESS,
GET_FOLLOWERS_FAILURE,
ADD_FOLLOWER,
ADD_FOLLOWER_SUCCESS,
ADD_FOLLOWER_FAILURE,
REMOVE_FOLLOWER,
REMOVE_FOLLOWER_SUCCESS,
REMOVE_FOLLOWER_FAILURE 
} from '../actions/index.js';

export const FollowersReducer = (state = {}, action) => {
    switch(action.type){
        case GET_FOLLOWERS:
        case GET_FOLLOWERS_SUCCESS:
        case GET_FOLLOWERS_FAILURE:
        case ADD_FOLLOWER:
        case ADD_FOLLOWER_SUCCESS:
        case ADD_FOLLOWER_FAILURE:
        case REMOVE_FOLLOWER:
        case REMOVE_FOLLOWER_SUCCESS:
        case REMOVE_FOLLOWER_FAILURE:
        default:
          return state; 
    }
}