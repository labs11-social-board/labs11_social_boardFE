// action creators
import { displayError, signout } from '../store/actions/index.js';

const handleError = (err, errAction, stripeError) => dispatch => {
  let errMsg;
  if (stripeError) {
    errMsg = err.response.data.err.raw.message
  } else {
    errMsg = err.response ? err.response.data.error : err.toString();
  }
  if (errMsg === 'Failed to findById(): User with ID 506 does not exist.' || errMsg === 'You need to delete localStorage.') {
    return signout()(dispatch);
  }
  dispatch({ type: errAction, payload: errMsg });
  return displayError(errMsg)(dispatch);
};

export default handleError;
