import {
  GET_TEAMS_LOADING,
  GET_TEAMS_SUCCESS,
  GET_TEAM_DISCUSSIONS_LOADING,
  GET_TEAM_DISCUSSIONS_SUCCESS,
  IS_TEAM,
  RESET_IS_TEAM,
  GET_TEAM_DISCUSSION_POSTS_LOADING,
  GET_TEAM_DISCUSSION_POSTS_SUCCESS
} from '../actions/index.js';

const initialState = {
  teams: [],
  teamDiscussions: [],
  posts: [],
  isGettingTeams: false,
  isGettingTeamDiscussions: false,
  isGettingPosts: false,
  isTeam: false
};

export const TeamsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_TEAMS_LOADING: 
      return {
        ...state, 
        isGettingTeams: true
      };
    
    case GET_TEAMS_SUCCESS: 
      return {
        ...state,
        isGettingTeams: false,
        teams: action.payload
      };
    
    case GET_TEAM_DISCUSSIONS_LOADING:
      return {
        ...state,
        isGettingTeamDiscussions: true
      };
    
    case GET_TEAM_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        isGettingTeamDiscussions: false,
        teamDiscussions: action.payload
      };
    
    case IS_TEAM: 
      return {
        ...state,
        isTeam: true
      };
    
    case RESET_IS_TEAM:
      return {
        ...state,
        isTeam: false
      };
    
    case GET_TEAM_DISCUSSION_POSTS_LOADING: 
      return {
        ...state,
        isGettingPosts: true
      };
      
    case GET_TEAM_DISCUSSION_POSTS_SUCCESS:
      return {
        ...state,
        isGettingPosts: false,
        posts: action.payload
      }
    default : 
      return state;
  };
};