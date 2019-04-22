import axios from 'axios';

// helpers
import {
    handleError,
} from '../../helpers/index.js';

// globals
// const {
//     backendUrl,
//     auth0Domain,
//     accountStatusTypes
// } = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/


export const PAVEVIEWS_STARTED = 'PAVEVIEWS_STARTED';
export const PAVEVIEWS_SUCCESS = 'PAVEVIEWS_SUCCESS';
export const PAVEVIEWS_FAIL = 'PAVEVIEWS_FAIL';

export const GUSERS_STARTED = 'GUSERS_STARTED';
export const GUSERS_SUCCESS = 'GUSERS_SUCCESS';
export const GUSERS_FAIL = 'GUSERS_FAIL';

export const PAVEv30_STARTED = 'PAVEv30_STARTED';
export const PAVEv30_SUCCESS = 'PAVEv30_SUCCESS';
export const PAVEv30_FAIL = 'PAVEv30_FAIL';

export const GUSERSv30_STARTED = 'GUSERSv30_STARTED';
export const GUSERSv30_SUCCESS = 'GUSERSv30_SUCCESS';
export const GUSERSv30_FAIL = 'GUSERSv30_FAIL';



/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/

export const getPageViews = () => dispatch => {
    dispatch({
        type: PAVEVIEWS_STARTED
    });

    return axios
        .get(`https://social-board-3-back-end.herokuapp.com/analytics/pageviews`)
        .then(res => {
            dispatch({
                type: PAVEVIEWS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err, 
            PAVEVIEWS_FAIL
        )(dispatch));
}

export const getUsersAna = () => dispatch => {
    dispatch({
        type: GUSERS_STARTED
    });

    return axios
        .get(`https://social-board-3-back-end.herokuapp.com/analytics/users`)
        .then(res => {
            dispatch({
                type: GUSERS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err, 
            GUSERS_FAIL
        )(dispatch));
}


export const getPageViews30 = () => dispatch => {
    dispatch({
        type: PAVEv30_STARTED
    });

    return axios
        .get(`https://social-board-3-back-end.herokuapp.com/analytics/pageviewsAt30`)
        .then(res => {
            dispatch({
                type: PAVEv30_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err, 
            PAVEv30_FAIL
        )(dispatch));
}


export const getUsersAna30 = () => dispatch => {
    dispatch({
        type: GUSERSv30_STARTED
    });

    return axios
        .get(`https://social-board-3-back-end.herokuapp.com/analytics/usersAt30`)
        .then(res => {
            dispatch({
                type: GUSERSv30_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err, 
            GUSERSv30_FAIL
        )(dispatch));
}
