import axios from 'axios';

// helpers
import { handleError } from '../../helpers/index.js';

// globals
import { backendUrl } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
export const GET_TEAMS_LOADING = 'GET_TEAMS_LOADING';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';

export const GET_TEAMS_FOLLOWED_LOADING = 'GET_TEAMS_FOLLOWED_LOADING';
export const GET_TEAMS_FOLLOWED_SUCCESS = 'GET_TEAMS_FOLLOWED_SUCCESS';
export const GET_TEAMS_FOLLOWED_FAILURE = 'GET_TEAMS_FOLLOWED_FAILURE';

export const ADD_TEAM_LOADING = 'ADD_TEAM_LOADING';
export const ADD_TEAM_SUCCESS = 'ADD_TEAM_SUCCESS';
export const ADD_TEAM_FAILURE = 'ADD_TEAM_FAILURE';


/***************************************************************************************************
 ********************************************* Action Creators *************************************
 **************************************************************************************************/
