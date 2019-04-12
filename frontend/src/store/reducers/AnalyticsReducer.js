import {
    PAVEVIEWS_STARTED,
    PAVEVIEWS_SUCCESS,
    PAVEVIEWS_FAIL,
    GUSERS_STARTED,
    GUSERS_SUCCESS,
    GUSERS_FAIL,
} from '../actions';

const initialState = {
    gettingGPdata: false,
    gettingGUdata: false,
    gPageviews: {},
    gUsers: {},
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
                gPageViews: action.payload
            }

        case PAVEVIEWS_FAIL:
            return {
                ...state,
                gettingGPdata: false,
                error: action.payload
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
        


        default:
            return state;
    }
}