import {
  GET_TEAMS_LOADING,
  GET_TEAMS_SUCCESS,
  GET_TEAM_DISCUSSIONS_LOADING,
  GET_TEAM_DISCUSSIONS_SUCCESS,
} from '../actions/index.js';

const initialState = {
  teams: [],
  teamDiscussions: [],
  isGettingTeams: false,
  isGettingTeamDiscussions: false,
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
    
    default : 
      return state;
  };
};