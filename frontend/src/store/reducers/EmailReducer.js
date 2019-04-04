import {
    EMAIL_APPROVAL_SUBMITTED,
    EMAIL_APPROVAL_SUCCESS,
    EMAIL_APPROVAL_FAIL,

    GET_EMAILS,
    GET_EMAILS_SUCCESS,
    GET_EMAILS_FAIL
} from '../actions';

const initialState = {
    approvingEmail: false,
    fetchingEmails: false,
    approvedEmails: [],
    error: null
}

export const EmailReducer = (state = initialState, action) => {
    switch(action.type){
        case EMAIL_APPROVAL_SUBMITTED:
            return {
                ...state,
                approvingEmail: true
            };

        case EMAIL_APPROVAL_SUCCESS:
            return {
                ...state,
                approvingEmail: false,
                error: null
            }

        case EMAIL_APPROVAL_FAIL:
            return {
                ...state,
                approvingEmail: false,
                error: action.payload
            }

        case GET_EMAILS:
            return {
                ...state,
                fetchingEmails: true
            };

        case GET_EMAILS_SUCCESS:
            return {
                ...state,
                fetchingEmails: false,
                approvedEmails: action.payload,
                error: null
            }

        case GET_EMAILS_FAIL:
            return {
                ...state,
                fetchingEmails: false,
                error: action.payload
            }
        default:
            return state;
    }
}