import {
    ADD_REPLY_LOADING,
	ADD_REPLY_SUCCESS,
    ADD_REPLY_FAILURE,
    
    HANDLE_REPLY_VOTE_LOADING,
    HANDLE_REPLY_VOTE_SUCCESS,
    HANDLE_REPLY_VOTE_FAILURE,
} from '../actions/index.js';

export const RepliesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_REPLY_LOADING:
        case ADD_REPLY_SUCCESS:
        case ADD_REPLY_FAILURE:
        case HANDLE_REPLY_VOTE_LOADING:
        case HANDLE_REPLY_VOTE_SUCCESS:
        case HANDLE_REPLY_VOTE_FAILURE:
        default:
        return state;
    }
};
