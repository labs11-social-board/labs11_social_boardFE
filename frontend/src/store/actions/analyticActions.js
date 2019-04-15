import axios from 'axios';

// helpers
import {
    handleError,
} from '../../helpers/index.js';

// globals
const {
    backendUrl,
    auth0Domain,
    accountStatusTypes
} = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/


export const PAVEVIEWS_STARTED = 'PAVEVIEWS_STARTED';
export const PAVEVIEWS_SUCCESS = 'PAVEVIEWS_SUCCESS';
export const PAVEVIEWS_FAIL = 'PAVEVIEWS_FAIL';

export const GUSERS_STARTED = 'GUSERS_STARTED';
export const GUSERS_SUCCESS = 'GUSERS_SUCCESS';
export const GUSERS_FAIL = 'GUSERS_FAIL';



/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/

export const getPageViews = () => dispatch => {
    dispatch({
        type: PAVEVIEWS_STARTED
    });

    return axios
        .post(`${backendUrl}/analytics/pageviews`)
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
        .post(`${backendUrl}/analytics/users`)
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
