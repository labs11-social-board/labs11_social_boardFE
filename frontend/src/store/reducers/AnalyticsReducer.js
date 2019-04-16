import {
    PAVEVIEWS_STARTED,
    PAVEVIEWS_SUCCESS,
    PAVEVIEWS_FAIL,
    GUSERS_STARTED,
    GUSERS_SUCCESS,
    GUSERS_FAIL,
    PAVEv30_STARTED,
    PAVEv30_SUCCESS,
    PAVEv30_FAIL,
    GUSERSv30_STARTED,
    GUSERSv30_SUCCESS,
    GUSERSv30_FAIL,
} from '../actions';

const initialState = {
    gettingGPdata: false,
    gettingGUdata: false,
    gPageviews: [],
    gUsers: [],
    gettingGPdata30: false,
    gettingGUdata30: false,
    gPageviews30: [],
    gUsers30: [],
    gError: null
}

export const AnalyticsReducer = (state = initialState, action) => {
    switch(action.type){

        case PAVEVIEWS_STARTED:
            return {
                ...state,
                gettingGPdata: true
            };

        case PAVEVIEWS_SUCCESS:
            return {
                ...state,
                gettingGPdata: false,
                gPageviews: action.payload, 
            }

        case PAVEVIEWS_FAIL:
            return {
                ...state,
                gettingGPdata: false,
                gError: action.payload
            }

        case PAVEv30_STARTED:
            return {
                ...state,
                gettingGPdata30: true
            };

        case PAVEv30_SUCCESS:
            return {
                ...state,
                gettingGPdata30: false,
                gPageviews30: action.payload, 
            }

        case PAVEv30_FAIL:
            return {
                ...state,
                gettingGPdata30: false,
                gError: action.payload
            }            


        case GUSERS_STARTED:
            return {
                ...state,
                gettingGUdata: true
            };

        case GUSERS_SUCCESS:
            return {
                ...state,
                gettingGUdata: false,
                gUsers: action.payload
            }

        case GUSERS_FAIL:
            return {
                ...state,
                gettingGUdata: false,
                gUsers: action.payload
            }

        case GUSERSv30_STARTED:
            return {
                ...state,
                gettingGUdata30: true
            };

        case GUSERSv30_SUCCESS:
            return {
                ...state,
                gettingGUdata30: false,
                gUsers30: action.payload
            }

        case GUSERSv30_FAIL:
            return {
                ...state,
                gettingGUdata30: false,
                gUsers30: action.payload
            }
        


        default:
            return state;
    }
}