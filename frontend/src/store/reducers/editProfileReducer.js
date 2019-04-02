import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESSFUL,
  UPDATE_PROFILE_FAILURE
} from "../actions/index.js";

export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
    case UPDATE_PROFILE_SUCCESSFUL:
    case UPDATE_PROFILE_FAILURE:
    default:
      return state;
  }
};
