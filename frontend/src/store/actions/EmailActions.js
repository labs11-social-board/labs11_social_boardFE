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

//  Approve Email
export const EMAIL_APPROVAL_SUBMITTED = 'EMAIL_APPROVAL_SUBMITTED';
export const EMAIL_APPROVAL_SUCCESS = 'EMAIL_APPROVAL_SUCCESS';
export const EMAIL_APPROVAL_FAIL = 'EMAIL_APPROVAL_FAIL';


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