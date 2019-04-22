import axios from 'axios';

// helpers
import {
    handleError,
} from '../../helpers/index.js';

// globals
const {
    backendUrl,
} = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/

//  Approve Email
export const EMAIL_APPROVAL_SUBMITTED = 'EMAIL_APPROVAL_SUBMITTED';
export const EMAIL_APPROVAL_SUCCESS = 'EMAIL_APPROVAL_SUCCESS';
export const EMAIL_APPROVAL_FAIL = 'EMAIL_APPROVAL_FAIL';


// Get Emails
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAILS_SUCCESS = 'GET_EMAIL_SUCCESS';
export const GET_EMAILS_FAIL = 'GET_EMAILS_FAIL';

export const DELETING_EMAIL_APPROVAL = 'DELETING_EMAIL_APPROVAL';
export const EMAIL_REMOVAL_SUCCESS = 'EMAIL_REMOVAL_SUCCESS';
export const EMAIL_REMOVAL_FAIL = 'EMAIL_REMOVAL_FAIL';

// Key Resources Puts
export const KEYRESOURCES_SUBMITTED = 'KEYRESOURCES_SUBMITTED';
export const KEYRESOURCES_SUCCESS = 'KEYRESOURCES_SUCCESS';
export const KEYRESOURCES_FAIL = 'KEYRESOURCES_FAIL';

// Key Resources Get
export const GET_KEYRESOURCES_LOADING = 'GET_KEYRESOURCES_SUBMITTED';
export const GET_KEYRESOURCES_SUCCESS = 'GET_KEYRESOURCES_SUCCESS';
export const GET_KEYRESOURCES_FAIL = 'GET_KEYRESOURCES_FAIL';

// Key Resources Delete
export const DELETING_KEYRESOURCE = 'DELETING_KEYRESOURCE';
export const DELETE_KEYRESOURCE_SUCCESS = 'DELETE_KEYRESOURCE_SUCCESS';
export const DELETE_KEYRESOURCE_FAIL = 'DELETE_KEYRESOURCE_FAIL';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/

export const approveEmail = emailInfo => dispatch => {
    dispatch({
        type: EMAIL_APPROVAL_SUBMITTED
    });

    return axios
        .post(`${backendUrl}/emails/`, emailInfo)
        .then(res => {
            dispatch({
                type: EMAIL_APPROVAL_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err,
            EMAIL_APPROVAL_FAIL
        )(dispatch));
}

export const getEmails = () => dispatch => {
    dispatch({
        type: GET_EMAILS
    });

    return axios
        .get(`${backendUrl}/emails`)
        .then(res => {
            dispatch({
                type: GET_EMAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err,
            GET_EMAILS_FAIL
        ));
}

export const denyEmail = id => async dispatch => {
    dispatch({
        type: DELETING_EMAIL_APPROVAL
    });

    return axios
        .delete(`${backendUrl}/emails/${id}`)
        .then(async res => {
            dispatch({
                type: EMAIL_REMOVAL_SUCCESS,
                payload: res
            });
        })
        .catch(err => {
            dispatch({
                type: EMAIL_REMOVAL_FAIL,
                payload: err
            });
        });
}

/////////////////////////////////////////////////// KEY RESOURCES

export const putKeyResource = resourceInfo => dispatch => {
    const user = localStorage.getItem('symposium_user_id')
    dispatch({
        type: KEYRESOURCES_SUBMITTED
    });

    return axios
        .post(`${backendUrl}/resources/insert-resources/${user}`, resourceInfo)
        .then(res => {
            dispatch({
                type: KEYRESOURCES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => handleError(
            err,
            KEYRESOURCES_FAIL
        )(dispatch));
}

//Get Key Resources
export const getKeyResources = () => dispatch => {
    dispatch({ type: GET_KEYRESOURCES_LOADING })
    return axios
        .get(`${backendUrl}/resources`)
        .then(res => {
            dispatch({ type: GET_KEYRESOURCES_SUCCESS, payload: res.data })
        })
        .catch(err => handleError(err, GET_KEYRESOURCES_FAIL)(dispatch))
}

export const deleteResource = id => async dispatch => {
    dispatch({
        type: DELETING_KEYRESOURCE
    });

    return axios
        .delete(`${backendUrl}/resources/delete-resources/${id}`)
        .then(async res => {
            dispatch({
                type: DELETE_KEYRESOURCE_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            handleError(err, DELETE_KEYRESOURCE_FAIL)(dispatch)
        });
}
