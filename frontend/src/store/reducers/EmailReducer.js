import {
    EMAIL_APPROVAL_SUBMITTED,
    EMAIL_APPROVAL_SUCCESS,
    EMAIL_APPROVAL_FAIL,

    GET_EMAILS,
    GET_EMAILS_SUCCESS,
    GET_EMAILS_FAIL,

    DELETING_EMAIL_APPROVAL,
    EMAIL_REMOVAL_SUCCESS,
    EMAIL_REMOVAL_FAIL,

    KEYRESOURCES_SUBMITTED,
    KEYRESOURCES_SUCCESS,
    KEYRESOURCES_FAIL,
} from '../actions';

const initialState = {
    approvingEmail: false,
    fetchingEmails: false,
    approvedEmails: [],
    deletingEmail: false,
    addingResource: false,
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

        case DELETING_EMAIL_APPROVAL:
            return {
                ...state,
                deletingEmail: true
            }
        case EMAIL_REMOVAL_SUCCESS:
            return {
                ...state,
                deletingEmail: false,
                approvedEmails: action.payload
            }
        case EMAIL_REMOVAL_FAIL:
            return {
                ...state,
                deletingEmail: false,
                error: action.payload
            }

        /////////////////////////////////////////////

        case KEYRESOURCES_SUBMITTED:
            return {
                ...state,
                addingResource: true
            };

        case KEYRESOURCES_SUCCESS:
            return {
                ...state,
                addingResource: false,
                error: null
            }

        case KEYRESOURCES_FAIL:
            return {
                ...state,
                addingResource: false,
                error: action.payload
            }    

        default:
            return state;
    }
}