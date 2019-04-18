import {
	ADD_POST_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,

	ADD_DELETED_POST_LOADING,
	ADD_DELETED_POST_SUCCESS,
	ADD_DELETED_POST_FAILURE,

	GET_DELETED_POST_LOADING,
	GET_DELETED_POST_SUCCESS,
	GET_DELETED_POST_FAILURE,

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
	deletedPost: [],
	fetchingDeletedPost: false,
	isUploadingImage: false,
	error: null
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
		case ADD_DELETED_POST_LOADING:
		case ADD_DELETED_POST_SUCCESS:
		case ADD_DELETED_POST_FAILURE:
		case GET_DELETED_POST_LOADING:
			return {
				...state,
				fetchingDeletedPost: true
			}
		case GET_DELETED_POST_SUCCESS:
			return {
				...state,
				fetchingDeletedPost: false,
				deletedPost: action.payload
			}
		case GET_DELETED_POST_FAILURE:
			return {
				...state,
				fetchingDeletedPost: false,
				error: action.payload
			}
		case EDIT_POST_LOADING:
		case EDIT_POST_SUCCESS:
		case EDIT_POST_FAILURE:
		case REMOVE_POST_LOADING:
		case REMOVE_POST_SUCCESS:
		case REMOVE_POST_FAILURE:
		case HANDLE_POST_VOTE_LOADING:
			return {
				...state
			}
		case HANDLE_POST_VOTE_SUCCESS:
			return {
				...state
			}
		case HANDLE_POST_VOTE_FAILURE:
			return {
				...state
			}
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
				images: {},
				isUploadingImage: false
			};

		default:
			return state;
	}
};
