import {
  TOP_DISCUSSIONS_LOADING,
  TOP_DISCUSSIONS_SUCCESS,
  TOP_DISCUSSIONS_FAILURE,

  GET_DISCUSSIONS_LOADING,
  GET_DISCUSSIONS_SUCCESS,
  GET_DISCUSSIONS_FAILURE,

  GET_DISCUSSION_BY_ID_LOADING,
  GET_DISCUSSION_BY_ID_SUCCESS,
  GET_DISCUSSION_BY_ID_FAILURE,

  GET_ALL_DISCS_BY_FOLLOWED_CATS_LOADING,
  GET_ALL_DISCS_BY_FOLLOWED_CATS_SUCCESS,
  GET_ALL_DISCS_BY_FOLLOWED_CATS_FAILURE,

  FOLLOW_DISCUSSION_LOADING,
  FOLLOW_DISCUSSION_FAILURE,
  FOLLOW_CATEGORY_LOADING,
  FOLLOW_CATEGORY_FAILURE,

  ADD_DISCUSSION_LOADING, 
  ADD_DISCUSSION_SUCCESS, 
  ADD_DISCUSSION_FAILURE,

  EDIT_DISCUSSION_LOADING,
  EDIT_DISCUSSION_SUCCESS,
  EDIT_DISCUSSION_FAILURE,

  REMOVE_DISCUSSION_LOADING,
  REMOVE_DISCUSSION_SUCCESS,
  REMOVE_DISCUSSION_FAILURE,

  HANDLE_DISCUSSION_VOTE_LOADING,
  HANDLE_DISCUSSION_VOTE_SUCCESS,
  HANDLE_DISCUSSION_VOTE_FAILURE,
} from '../actions/index.js';

const initialState = {
  topDiscussions: [],
  discussion: {
    avatar: '',
    body: '',
    category_icon: '',
    category_id: 0,
    category_name: '',
    created_at: '',
    downvotes: '',
    id: 0,
    post_count: '',
    upvotes: '',
    user_vote: '',
    username: '',
    user_id: 0,
    views: '',
    posts: [],
  },
  category: '',
  discussions: [{
    body: '',
    category_id: 0,
    category_name: '',
    created_at: '',
    downvotes: '',
    id: 0,
    post_count: '',
    upvotes: '',
    user_id: 0,
    user_vote: null,
    username: '',
    views: 0,
  }],
  follows: {
    discussionId: []
  },
  followedDiscussions: [
    {
      avatar: '',
      body: '',
      category_icon: '',
      category_id: 0,
      category_name: '',
      created_at: '',
      downvotes: '',
      id: 0,
      post_count: '',
      upvotes: '',
      user_vote: null,
      username: '',
      views: 0,
    }
  ],
};

export const DiscussionsReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_DISCUSSION_BY_ID_SUCCESS:
      return {
        ...state,
        discussion: action.payload
      };

    case TOP_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        topDiscussions: action.payload
      };

    case GET_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload.discussions,
        category: action.payload.category,
      };

    case GET_ALL_DISCS_BY_FOLLOWED_CATS_SUCCESS:
      return {
        ...state,
        followedDiscussions: action.payload,
      };

    case GET_ALL_DISCS_BY_FOLLOWED_CATS_LOADING:
    case GET_ALL_DISCS_BY_FOLLOWED_CATS_FAILURE:
    case HANDLE_DISCUSSION_VOTE_LOADING:
    case HANDLE_DISCUSSION_VOTE_SUCCESS:
    case HANDLE_DISCUSSION_VOTE_FAILURE:
    case REMOVE_DISCUSSION_LOADING:
    case REMOVE_DISCUSSION_SUCCESS:
    case REMOVE_DISCUSSION_FAILURE:
    case EDIT_DISCUSSION_LOADING:
    case EDIT_DISCUSSION_SUCCESS:
    case EDIT_DISCUSSION_FAILURE:
    case ADD_DISCUSSION_LOADING: 
    case ADD_DISCUSSION_SUCCESS: 
    case ADD_DISCUSSION_FAILURE:
    case GET_DISCUSSION_BY_ID_LOADING:
    case GET_DISCUSSION_BY_ID_FAILURE:
    case TOP_DISCUSSIONS_LOADING:
    case TOP_DISCUSSIONS_FAILURE:
    case FOLLOW_DISCUSSION_LOADING:
    case FOLLOW_DISCUSSION_FAILURE:
    case FOLLOW_CATEGORY_LOADING:
    case FOLLOW_CATEGORY_FAILURE:
    case GET_DISCUSSIONS_LOADING:
    case GET_DISCUSSIONS_FAILURE:
    default:
      return state;
  }
};
