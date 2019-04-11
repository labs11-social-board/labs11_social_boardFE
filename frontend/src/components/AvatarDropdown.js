import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// action creators
import { signout } from '../store/actions';

// components 
import { ToggleSwitch } from './index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivAvatarModal = styled.div`
  display: ${props => props.isAvatarModalRaised === 'true' ? 'flex' : 'none'};
`;

const DivModalCloser = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9997;
`;

const DivAvatarDropdown = styled.div`
  color: ${props => props.theme.notificationFontColor};
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: fixed;
  right: 0;
  background-color: ${props => props.theme.notificationBackgroundColor};
  margin-top: -2px;
  width: 220px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid ${props => props.theme.borderColor};
  border-top: 2px solid white;
  padding: 10px 0;

  .spacer {
    font-size: .7rem;
    margin: 0 0 5px 10px;
    color: grey;
  }
  .line-break {
    border: .5px solid lightgrey;
    margin: 10px 15px;
  }
  @media (max-width: 450px){
    padding-right: 15px;
    padding-top: 0px;
  }
`;

const LinkItem = styled(Link)`
  display: flex;
  align-items: baseline;
  margin-top: 5px;
  user-select: none;
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.notificationFontColor};
  background-color: ${props => props.theme.notificationBackgroundColor};
  width: 100%;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }

  i {
    margin: 0 7px 0px 15px;
  }

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
  }
`;

const Item = styled.a`
  display: flex;
  align-items: baseline;
  user-select: none;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }

  i {
    margin: 0 7px 0px 15px;
  }

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
  }
`;

const NightModeToggle = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  cursor:pointer;

  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }
  &:hover i {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }

  i {
    color: ${props => props.theme.notificationFontColor};
    margin-left: -33px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0 0 0 6px;
  }

 #isDay-wrapper {
  display: flex;
  margin: 0;

  label {
    width: 45px;
    height: 20px;
    
    &:after {
      top: 4px;
      width: 12px;
      height: 12px;
    }
  }

  label:active:after {
    width: 20px;
  }
 }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class AvatarDropdown extends Component {
  clickSignout = ev => {
    ev.preventDefault();
    this.props.setAvatarModalRaised(ev, false);
    localStorage.removeItem('symposium_auth0_access_token');
    localStorage.removeItem('symposium_auth0_expires_at');
    return this.props.signout(this.props.uuid, this.props.history);
  };

  render() {
    return (
      <DivAvatarModal isAvatarModalRaised={this.props.isAvatarModalRaised.toString()}>
        <DivModalCloser onClick={(ev) => this.props.setAvatarModalRaised(ev, false)} />
        <DivAvatarDropdown>
          <p className='spacer'>VIEW OPTIONS</p>
          <NightModeToggle onClick={this.props.switchTheme}>
            {
            this.props.user_id !== 0 && (
              this.props.isDay ?
            <i className='fas fa-sun'/> :
            <i className='fas fa-moon' />
            )
          }
            <p>Night Mode</p>
            <ToggleSwitch isDay={!this.props.isDay} handleSwitch={this.props.switchTheme}/>
          </NightModeToggle>
          <p className='spacer'>MORE STUFF</p>
          <LinkItem to={`/profile/${this.props.user_id}`} onClick={(ev) => this.props.setAvatarModalRaised(ev, false)}><i className="fas fa-user"/>Profile</LinkItem>
          <LinkItem to={`/settings/${this.props.user_id}`} onClick={(ev) => this.props.setAvatarModalRaised(ev, false)}><i className="fas fa-cog"/>Settings</LinkItem>
          <span className='line-break'/>
          <Item onClick={ev => this.clickSignout(ev)}><i className="fas fa-sign-out-alt"/>Sign Out</Item>
        </DivAvatarDropdown>
      </DivAvatarModal>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  uuid: state.users.uuid
});

export default connect(
  mapStateToProps,
  { signout }
)(AvatarDropdown);


