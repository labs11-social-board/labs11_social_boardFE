import {
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	EDIT_POST_LOADING,
	EDIT_POST_SUCCESS,
	EDIT_POST_FAILURE,

	REMOVE_POST_LOADING,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,

	HANDLE_POST_VOTE_LOADING,
	HANDLE_POST_VOTE_SUCCESS,
	HANDLE_POST_VOTE_FAILURE,

	UPLOAD_IMAGE_LOADING,
	UPLOAD_IMAGE_SUCCESS,

	RESET_IMAGE_STATE

} from '../actions/index.js';

const initialState = {
	images: {},
	post_id: {},
	isUploadingImage: false
};

export const PostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_LOADING:
		case ADD_POST_SUCCESS:
			return {
				...state,
				post_id: action.payload
			};
		case ADD_POST_FAILURE:
		case EDIT_POST_LOADING:
		case EDIT_POST_SUCCESS:
		case EDIT_POST_FAILURE:
		case REMOVE_POST_LOADING:
		case REMOVE_POST_SUCCESS:
		case REMOVE_POST_FAILURE:
		case HANDLE_POST_VOTE_LOADING:
		case HANDLE_POST_VOTE_SUCCESS:
		case HANDLE_POST_VOTE_FAILURE:
		case UPLOAD_IMAGE_LOADING:
			return {
				...state,
				isUploadingImage: true
			};

		case UPLOAD_IMAGE_SUCCESS:
			return {
				...state,
				images: action.payload,
				isUploadingImage: false
			};
		
		case RESET_IMAGE_STATE: 
			return {
				...state,
				images: {}
			};
			
		default:
		return state;
	}
};
