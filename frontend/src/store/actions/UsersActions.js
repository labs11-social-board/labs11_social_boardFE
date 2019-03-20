import axios from 'axios';

// helpers
import { handleError, handlePusher } from '../../helpers/index.js';

// globals
const {
  backendUrl,
  auth0Domain,
  accountStatusTypes
} = require('../../globals/globals.js');

/***************************************************************************************************
 ********************************************* Actions *******************************************
 **************************************************************************************************/
// Login
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

// Log back in
export const USER_LOG_BACK_IN_LOADING = 'USER_LOG_BACK_IN_LOADING';
export const USER_LOG_BACK_IN_SUCCESS = 'USER_LOG_BACK_IN_SUCCESS';
export const USER_LOG_BACK_IN_FAILURE = 'USER_LOG_BACK_IN_FAILURE';

// Signout
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS';

// changeUserType
export const CHANGE_USER_TYPE_LOADING = 'CHANGE_USER_TYPE_LOADING';
export const CHANGE_USER_TYPE_SUCCESS = 'CHANGE_USER_TYPE_SUCCESS';
export const CHANGE_USER_TYPE_FAILURE = 'CHANGE_USER_TYPE_FAILURE';

// Auth-0 Login
export const USER_AUTH0_LOGIN_LOADING = 'USER_AUTH0_LOGIN_LOADING';
export const USER_AUTH0_LOGIN_SUCCESS = 'USER_AUTH0_LOGIN_SUCCESS';
export const USER_AUTH0_LOGIN_FAILURE = 'USER_AUTH0_LOGIN_FAILURE';

// Register
export const USER_REGISTER_LOADING = 'USER_REGISTER_LOADING';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

// Update password
export const PASSWORD_UPDATE_LOADING = 'PASSWORD_UPDATE_LOADING';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';

// display errors and messages
export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';

// isUsernameTaken
export const USER_EXISTS_LOADING = 'USER_EXISTS_LOADING';
export const USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
export const USER_EXISTS_FAILURE = 'USER_EXISTS_FAILURE';

// isEmailTaken
export const EMAIL_EXISTS_LOADING = 'EMAIL_EXISTS_LOADING';
export const EMAIL_EXISTS_SUCCESS = 'EMAIL_EXISTS_SUCCESS';
export const EMAIL_EXISTS_FAILURE = 'EMAIL_EXISTS_FAILURE';

// upload avatar
export const UPLOAD_AVATAR_LOADING = 'UPLOAD_AVATAR_LOADING';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';

export const UPLOAD_AVATAR_URL_LOADING = 'UPLOAD_AVATAR_URL_LOADING';
export const UPLOAD_AVATAR_URL_SUCCESS = 'UPLOAD_AVATAR_URL_SUCCESS';
export const UPLOAD_AVATAR_URL_FAILURE = 'UPLOAD_AVATAR_URL_FAILURE';

// confirm email
export const EMAIL_CONFIRM_LOADING = 'EMAIL_CONFIRM_LOADING';
export const EMAIL_CONFIRM_SUCCESS = 'EMAIL_CONFIRM_SUCCESS';
export const EMAIL_CONFIRM_FAILURE = 'EMAIL_CONFIRM_FAILURE';

export const UPDATE_EMAIL_LOADING = 'UPDATE_EMAIL_LOADING';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

// stripe pay
export const STRIPE_PAYMENT_LOADING = 'STRIPE_PAYMENT_LOADING';
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE';

export const SEND_PW_RESET_EMAIL_LOADING = 'SEND_PW_RESET_EMAIL_LOADING';
export const SEND_PW_RESET_EMAIL_SUCCESS = 'SEND_PW_RESET_EMAIL_SUCCESS';
export const SEND_PW_RESET_EMAIL_FAILURE = 'SEND_PW_RESET_EMAIL_FAILURE';

export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const DELETE_ACCOUNT_LOADING = 'DELETE_ACCOUNT_LOADING';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';

export const REMOVE_NOTIFICATION_LOADING = 'REMOVE_NOTIFICATION_LOADING';
export const REMOVE_NOTIFICATION_SUCCESS = 'REMOVE_NOTIFICATION_SUCCESS';
export const REMOVE_NOTIFICATION_FAILURE = 'REMOVE_NOTIFICATION_FAILURE';

export const GET_NOTIFICATIONS_LOADING = 'GET_NOTIFICATIONS_LOADING';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';

export const UPDATE_LAST_LOGIN_LOADING = 'UPDATE_LAST_LOGIN_LOADING';
export const UPDATE_LAST_LOGIN_SUCCESS = 'UPDATE_LAST_LOGIN_SUCCESS';
export const UPDATE_LAST_LOGIN_FAILURE = 'UPDATE_LAST_LOGIN_FAILURE';

export const MARK_NOTIFICATIONS_AS_READ = 'MARK_NOTIFICATIONS_AS_READ';

export const EDIT_SIGNATURE_LOADING = 'EDIT_SIGNATURE_LOADING';
export const EDIT_SIGNATURE_SUCCESS = 'EDIT_SIGNATURE_SUCCESS';
export const EDIT_SIGNATURE_FAILURE = 'EDIT_SIGNATURE_FAILURE';

export const EDIT_USER_LOADING = 'EDIT_USER_LOADING';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const TOGGLE_THEME = 'TOGGLE_THEME';

/***************************************************************************************************
 ****************************************** Action Creators ****************************************
 **************************************************************************************************/
export const login = creds => dispatch => {
  dispatch({ type: USER_LOGIN_LOADING });
  return axios
    .post(`${backendUrl}/auth/login`, creds)
    .then(response => {
      localStorage.setItem('symposium_token', response.data[0].token);
      localStorage.setItem('symposium_user_id', response.data[0].id);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data[0] });
      handlePusher.subscribeToPusher(response.data[0].uuid)(dispatch);
    })
    .catch(err => handleError(err, USER_LOGIN_FAILURE)(dispatch));
};

export const logBackIn = (id, token) => dispatch => {
  const headers = { headers: { Authorization: token } };
  dispatch({ type: USER_LOG_BACK_IN_LOADING });
  return axios
    .post(`${backendUrl}/auth/log-back-in/${id}`, {}, headers)
    .then(res => {
      localStorage.setItem('symposium_token', res.data[0].token);
      localStorage.setItem('symposium_user_id', res.data[0].id);
      dispatch({ type: USER_LOG_BACK_IN_SUCCESS, payload: res.data[0] });
      handlePusher.subscribeToPusher(res.data[0].uuid)(dispatch);
    })
    .catch(err => handleError(err, USER_LOG_BACK_IN_FAILURE)(dispatch));
};

export const auth0Login = (accessToken, history) => dispatch => {
  const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
  dispatch({ type: USER_AUTH0_LOGIN_LOADING });
  return axios
    .get(`https://${auth0Domain}/userinfo`, headers)
    .then(res => {
      const { email, name, picture } = res.data;
      const body = { email, name, picture };
      return axios
        .post(`${backendUrl}/auth/auth0-login`, body)
        .then(response => {
          localStorage.setItem('symposium_token', response.data[0].token);
          localStorage.setItem('symposium_user_id', response.data[0].id);
          dispatch({ type: USER_AUTH0_LOGIN_SUCCESS, payload: response.data[0] });
          history.push('/home');
          handlePusher.subscribeToPusher(response.data[0].uuid)(dispatch);
        })
        .catch(err => handleError(err, USER_AUTH0_LOGIN_FAILURE)(dispatch));
    })
    .catch(err => handleError(err, USER_AUTH0_LOGIN_FAILURE)(dispatch));
};

export const register = creds => dispatch => {
  dispatch({ type: USER_REGISTER_LOADING });
  const backendCreds = {
    username: creds.username,
    password: creds.password,
    email: creds.email,
    status: accountStatusTypes[1],
    signature: creds.signature,
    avatarURL: creds.avatarURL,
    avatarData: creds.avatarData,
    subPlan: creds.subPlan
  };
  return axios
    .post(`${backendUrl}/auth/register`, backendCreds)
    .then(response => {
      return Promise.resolve(response.data[0]); // user and user settings added, but still need to set avatar
    })
    .then(regData => {

      if (backendCreds.avatarData) { // avatar from file on pc
        const headers = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: regData.token,
          }
        };
        const avatarData = backendCreds.avatarData;

        return axios
          .put(`${backendUrl}/users/avatar/${regData.id}`, avatarData, headers)
          .then(avatarRes => {
            regData.avatar = avatarRes.data;
            localStorage.setItem('symposium_token', regData.token);
            localStorage.setItem('symposium_user_id', regData.id);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: regData });
            handlePusher.subscribeToPusher(regData.uuid)(dispatch);
          })
          .catch(err => handleError(err, UPLOAD_AVATAR_FAILURE)(dispatch));
      } else if (backendCreds.avatarURL) { // avatar from url
        const headers = { headers: { Authorization: regData.token } };
        const avatarUrl = { avatarUrl: backendCreds.avatarURL };

        return axios
          .put(`${backendUrl}/users/avatar-url/${regData.id}`, avatarUrl, headers)
          .then(avatarRes => {
            regData.avatar = avatarRes.data;
            localStorage.setItem('symposium_token', regData.token);
            localStorage.setItem('symposium_user_id', regData.id);
            dispatch({ type: USER_REGISTER_SUCCESS, payload: regData });
            handlePusher.subscribeToPusher(regData.uuid)(dispatch);
          })
          .catch(err => handleError(err, UPLOAD_AVATAR_URL_FAILURE)(dispatch));
      } else { // no avatar given, use default
        localStorage.setItem('symposium_token', regData.token);
        localStorage.setItem('symposium_user_id', regData.id);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: regData });
        handlePusher.subscribeToPusher(regData.uuid)(dispatch);
      }
    })
    .catch(err => handleError(err, USER_REGISTER_FAILURE)(dispatch));
};

export const updatePassword = (oldPassword, newPassword, toggleForm) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { oldPassword, newPassword };
  dispatch({ type: PASSWORD_UPDATE_LOADING });
  // prettier-ignore
  return axios
    .put(`${backendUrl}/users/password/${user_id}`, body, headers)
    .then(() => displayMessage('Password has been updated.')(dispatch))
    .then(() => toggleForm(''))
    .catch(err => handleError(err, PASSWORD_UPDATE_FAILURE)(dispatch));
};

export const signout = (uuid, history) => dispatch => {
  localStorage.removeItem('symposium_token');
  localStorage.removeItem('symposium_user_id');
  localStorage.removeItem('symposium_auth0_access_token');
  localStorage.removeItem('symposium_auth0_expires_at');
  if (uuid) handlePusher.unsubscribeToPusher(uuid);
  dispatch({ type: USER_SIGNOUT_SUCCESS });
  history.push('/');
  return Promise.resolve();
};

export const changeUserType = (user_id, user_type) => dispatch => {
  dispatch({ type: CHANGE_USER_TYPE_LOADING })
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };

  axios
    .put(`${backendUrl}/users/type/${user_id}`, { user_type }, headers)
    .then(res => dispatch({ type: CHANGE_USER_TYPE_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, CHANGE_USER_TYPE_FAILURE)(dispatch));
  return Promise.resolve();
}

// prettier-ignore
export const uploadAvatar = (user_id, avatarData, onUploadAvatarSuccess) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  let headers;

  if (avatarData) {
    // avatar will be updated with given image
    headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      }
    };
  } else {
    // avatar will be reset to default
    headers = { headers: { Authorization: token } };
    avatarData = { avatarData };
  }

  dispatch({ type: UPLOAD_AVATAR_LOADING });

  return axios
    .put(`${backendUrl}/users/avatar/${user_id}`, avatarData, headers)
    .then(res => dispatch({ type: UPLOAD_AVATAR_SUCCESS, payload: res.data }))
    .then(() => onUploadAvatarSuccess())
    .catch(err => handleError(err, UPLOAD_AVATAR_FAILURE)(dispatch));
};

// prettier-ignore
export const uploadAvatarUrl = (user_id, avatarUrl, onUploadAvatarSuccess) => dispatch => {
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  avatarUrl = { avatarUrl };

  dispatch({ type: UPLOAD_AVATAR_URL_LOADING });

  return axios
    .put(`${backendUrl}/users/avatar-url/${user_id}`, avatarUrl, headers)
    .then(res => dispatch({ type: UPLOAD_AVATAR_URL_SUCCESS, payload: res.data }))
    .then(() => onUploadAvatarSuccess())
    .catch(err => handleError(err, UPLOAD_AVATAR_URL_FAILURE)(dispatch));
};

export const displayError = errMsg => dispatch => {
  dispatch({
    type: DISPLAY_ERROR,
    payload: errMsg
  });
  return Promise.resolve();
};

export const displayMessage = message => dispatch => {
  dispatch({
    type: DISPLAY_MESSAGE,
    payload: message
  });
  return Promise.resolve();
};

export const isUsernameTaken = username => dispatch => {
  dispatch({ type: USER_EXISTS_LOADING });

  return axios
    .get(`${backendUrl}/users/username/${username}`)
    .then(res => dispatch({ type: USER_EXISTS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, USER_EXISTS_FAILURE)(dispatch));
};

export const isEmailTaken = email => dispatch => {
  dispatch({ type: EMAIL_EXISTS_LOADING });

  return axios
    .get(`${backendUrl}/users/email/${email}`)
    .then(res => dispatch({ type: EMAIL_EXISTS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, EMAIL_EXISTS_FAILURE)(dispatch));
};

export const confirmEmail = (email_confirm_token, historyPush) => dispatch => {
  const body = { email_confirm_token };
  dispatch({ type: EMAIL_CONFIRM_LOADING });
  return axios
    .post(`${backendUrl}/users/confirm-email`, body)
    .then(res => dispatch({ type: EMAIL_CONFIRM_SUCCESS, payload: res.data.message }))
    .then(() => historyPush('/home'))
    .catch(err => handleError(err, EMAIL_CONFIRM_FAILURE)(dispatch));
};

export const updateEmail = (email, history) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { email };

  dispatch({ type: UPDATE_EMAIL_LOADING });

  return axios
    .put(`${backendUrl}/users/update-email/${user_id}`, body, headers)
    .then(res => dispatch({
      type: UPDATE_EMAIL_SUCCESS,
      payload: res.data,
    }))
    .then(() => history.push(`/settings/${user_id}`))
    .catch(err => handleError(err, UPDATE_EMAIL_FAILURE)(dispatch));
};

export const stripePayment = (headersObj) => dispatch => {
  dispatch({ type: STRIPE_PAYMENT_LOADING });
  return axios
    .post(`${backendUrl}/auth/stripe`, headersObj)
    .then(res => dispatch({ type: STRIPE_PAYMENT_SUCCESS, payload: res.data[0] }))
    .catch(err => handleError(err, STRIPE_PAYMENT_FAILURE, true)(dispatch));
};

export const sendPWResetEmail = (email, historyPush) => dispatch => {
  dispatch({ type: SEND_PW_RESET_EMAIL_LOADING });
  const body = { email };
  return axios
    .post(`${backendUrl}/users/send-reset-pw-email`, body)
    .then(res => dispatch({ type: SEND_PW_RESET_EMAIL_SUCCESS, payload: res.data.message }))
    .then(() => historyPush('/home'))
    .catch(err => handleError(err, SEND_PW_RESET_EMAIL_FAILURE)(dispatch));
};

export const resetPassword = (password, token) => dispatch => {
  const headers = { headers: { Authorization: token } };
  dispatch({ type: RESET_PASSWORD_LOADING });
  const body = { password };
  return axios
    .put(`${backendUrl}/users/reset-password`, body, headers)
    .then(response => {
      localStorage.setItem('symposium_token', response.data[0].token);
      localStorage.setItem('symposium_user_id', response.data[0].id);
      return dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: response.data[0]
      });
    })
    .catch(err => handleError(err, RESET_PASSWORD_FAILURE)(dispatch));
};

export const deleteAccount = () => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: DELETE_ACCOUNT_LOADING });
  return axios.delete(`${backendUrl}/users/${user_id}`, headers)
    .then(() => {
      localStorage.removeItem('symposium_token');
      localStorage.removeItem('symposium_user_id');
      localStorage.removeItem('symposium_auth0_access_token');
      localStorage.removeItem('symposium_auth0_expires_at');
      displayMessage('You\'ve successfully deleted your account. We are sorry to see you go!')(dispatch);
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    })
    .catch(err => handleError(err, DELETE_ACCOUNT_FAILURE)(dispatch));
};

export const removeNotification = id => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: REMOVE_NOTIFICATION_LOADING });
  return axios
    .delete(`${backendUrl}/user-notifications/${id}/${user_id}`, headers)
    .then(res => dispatch({ type: REMOVE_NOTIFICATION_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, REMOVE_NOTIFICATION_FAILURE)(dispatch));
};

export const getNotifications = () => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: GET_NOTIFICATIONS_LOADING });
  return axios.get(`${backendUrl}/user-notifications/user/${user_id}`, headers)
    .then(res => dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.data }))
    .catch(err => handleError(err, GET_NOTIFICATIONS_FAILURE)(dispatch));
};

export const markNotificationsAsRead = () => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  dispatch({ type: UPDATE_LAST_LOGIN_LOADING });
  return axios.put(`${backendUrl}/users/last-login/${user_id}`, {}, headers)
    .then(res => {
      dispatch({ type: MARK_NOTIFICATIONS_AS_READ });
      dispatch({ type: UPDATE_LAST_LOGIN_SUCCESS, payload: res.data[0] });
    })
    .catch(err => handleError(err, UPDATE_LAST_LOGIN_FAILURE)(dispatch));
};

export const editSignature = signature => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { signature };
  dispatch({ type: EDIT_SIGNATURE_LOADING });
  return axios
    .put(`${backendUrl}/users/edit-signature/${user_id}`, body, headers)
    .then(res => dispatch({ type: EDIT_SIGNATURE_SUCCESS, payload: res.data[0] }))
    .catch(err => handleError(err, EDIT_SIGNATURE_FAILURE)(dispatch));
};

export const editUser = (username, email, oldPassword, newPassword) => dispatch => {
  const user_id = localStorage.getItem('symposium_user_id');
  const token = localStorage.getItem('symposium_token');
  const headers = { headers: { Authorization: token } };
  const body = { username, email, oldPassword, newPassword };
  dispatch({ type: EDIT_USER_LOADING });
  return axios
    .put(`${backendUrl}/users/user/${user_id}`, body, headers)
    .then(res => {
      localStorage.setItem('symposium_token', res.data);
      dispatch({ type: EDIT_USER_SUCCESS });
      return displayMessage('You have successfully updated your profile.')(dispatch);
    })
    .catch(err => handleError(err, EDIT_USER_FAILURE)(dispatch))
};

export const toggleTheme = () => dispatch => {
  dispatch({ type: TOGGLE_THEME });
  return Promise.resolve();
};
