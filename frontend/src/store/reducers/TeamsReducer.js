import {
  GET_TEAMS_LOADING,
  GET_TEAMS_SUCCESS,
} from '../actions/index.js';

const initialState = {
  teams: [],
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
    
    default : 
      return state;
  };
};