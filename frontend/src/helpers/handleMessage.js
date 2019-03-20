// action creators
import { displayMessage } from '../store/actions/index.js';

const handleMessage = (msg, msgAction) => dispatch => {
	dispatch({ type: msgAction, payload: msg });
	return displayMessage(msg)(dispatch);
};

export default handleMessage;
