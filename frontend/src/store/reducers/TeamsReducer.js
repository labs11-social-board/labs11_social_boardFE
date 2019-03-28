import {
  GET_TEAMS_LOADING,
  GET_TEAMS_SUCCESS,
  GET_TEAM_DISCUSSIONS_LOADING,
  GET_TEAM_DISCUSSIONS_SUCCESS,
  GET_TEAM_DISCUSSION_POSTS_LOADING,
  GET_TEAM_DISCUSSION_POSTS_SUCCESS,
  JOIN_TEAM_SUCCESS,
  GET_TEAM_MEMBERS_SUCCESS,
  LEAVE_TEAM_SUCCESS,
} from '../actions/index.js';

const initialState = {
  teams: [],
  teamDiscussions: [],
  posts: [],
  userTeams: [],
  team_members: [],
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
      };
    
    case JOIN_TEAM_SUCCESS: 
      return {
        ...state,
        team_members: action.payload
      };

    case GET_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        team_members: action.payload
      };
    
    case LEAVE_TEAM_SUCCESS: 
      return {
        ...state,
        team_members: action.payload.team_members
      };

    default : 
      return state;
  };
};