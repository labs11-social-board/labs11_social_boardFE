import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import auth0 from 'auth0-js';
import { Auth0Lock } from 'auth0-lock';
import { login, auth0Login, displayError } from '../store/actions/index.js';

//globals
import { phoneL } from '../globals/globals.js';

// globals
import {
  auth0Domain,
  auth0ClientID,
  auth0RedirectUri
} from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/

const DivWrapper = styled.div`
  display: ${props => props.isLoginDropdownModalRaised === 'true' ? 'flex' : 'none'};
`;

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: fixed;
  right: 0;
  width: 270px;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.isDay ? 'white' : '#555' };
  border-radius: 5px;
  padding: 20px;

  input {
    height: 22px;
    margin-bottom: 5px;
    border-radius: 5px;
    width: 100%;
    background-color: ${props => props.theme.borderColor};
    color: black;
    padding: 5px;

    &:focus {
      outline: none;
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;

    .btn {
      padding: 10px 15px;
      border-radius: 5px;
      border: none;
      background-color: #418DCF;
      color: white;
      border: 1px solid #418DCF;
      width: 100%;
      margin-bottom: 5px;

      &:hover {
        cursor: pointer;
        background-color: white;
        color: #418DCF;
        border: 1px solid #418DCF;
      }
    }
  }
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9997;

  @media ${phoneL} {
    display: none;
  }
`;

const LinkForgotUserPass = styled(Link)`
  text-align: center;
  color: ${props => props.theme.defaultColor};
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LoginDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.webAuth.parseHash((err, authResult) => {
      if (authResult) {
        const { accessToken, expiresIn } = authResult;
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem('symposium_auth0_access_token', accessToken);
        localStorage.setItem('symposium_auth0_expires_at', expiresAt);
        return this.props.auth0Login(accessToken, this.props.history);
      } else if (err) this.props.displayError(err);
    });
  };

  authLockOptions = {
    rememberLastLogin: false,
    theme: {
      logo: 'https://i.imgur.com/yrFJL5z.png',
      primaryColor: '#418DCF',
    },
  };

  lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);

  webAuth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientID,
    redirectUri: auth0RedirectUri
  });

  //---------------- Form Methods --------------

  handleInputChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  normalLogin = ev => {
    ev.preventDefault();
    const pathname = this.props.history.location.pathname;
    const creds = { ...this.state };
    this.props.setLoginDropdownModalRaised(ev, false);
    Promise.resolve(this.setState({ username: '', password: '' }))
      .then(() => this.props.login(creds))
      .then(() => pathname === '/' ? this.props.history.push('/home') : this.props.history.push(pathname));
  };

  handleAuth0Login = () => {
    if (this.props.history.location.pathname !== '/') {
      this.props.history.push('/');
      this.authLockOptions = {
        rememberLastLogin: false
      };
      this.lock = new Auth0Lock(auth0ClientID, auth0Domain, this.authLockOptions);
      this.webAuth = new auth0.WebAuth({
        domain: auth0Domain,
        clientID: auth0ClientID,
        redirectUri: auth0RedirectUri
      });
    };
    this.lock.show();
  };

  render() {
    return (
      <DivWrapper isLoginDropdownModalRaised={this.props.isLoginDropdownModalRaised.toString()}>
        <DivModalCloser onClick={(ev) => this.props.setLoginDropdownModalRaised(ev, false)} />
        <FormLogin isDay = { this.props.isDay }>
          <input
            onChange={this.handleInputChange}
            placeholder='Name'
            value={this.state.username}
            name='username'
            autoComplete='off'
          />
          <input
            type='password'
            onChange={this.handleInputChange}
            placeholder='Password'
            value={this.state.password}
            name='password'
            autoComplete='off'
          />
          <div className = 'buttons'>
            <button
              type='submit'
              className = 'btn'
              onClick={ev => this.normalLogin(ev)}
            >
              Login
            </button>
            <button type='button' className = 'btn' onClick={this.handleAuth0Login}>Login with social media</button>
          </div>
          <LinkForgotUserPass to='/request-reset-pw'>Forgot your username/password?</LinkForgotUserPass>
        </FormLogin>
      </DivWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.users.loggingInLoadingMessage,
    isDay: state.users.isDay,
  };
};

export default connect(
  mapStateToProps,
  { auth0Login, login, displayError }
)(LoginDropdown);