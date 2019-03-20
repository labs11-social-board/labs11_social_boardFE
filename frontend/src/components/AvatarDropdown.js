import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// action creators
import { signout } from '../store/actions';

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
  width: 140px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 2px solid ${props => props.theme.borderColor};
  border-top: 2px solid white;
  padding: 10px 0;

  @media (max-width: 450px){
    padding-right: 15px;
    padding-top: 0px;
  }
`;

const LinkItem = styled(Link)`
  margin-bottom: 5px;
  user-select: none;
  width: 100%;
  text-decoration: none;
  color: ${props => props.theme.notificationFontColor};
  background-color: ${props => props.theme.notificationBackgroundColor};
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
  }
`;

const Item = styled.a`
  margin-bottom: 5px;
  user-select: none;
  width: 100%;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: black;
    background-color: ${props => props.theme.borderColor};
  }

  @media(max-width: 750px){
    font-size: 16px;
  }
  @media (max-width: 450px){
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
          <LinkItem to={`/profile/${this.props.user_id}`} onClick={(ev) => this.props.setAvatarModalRaised(ev, false)}>Profile</LinkItem>
          <LinkItem to={`/settings/${this.props.user_id}`} onClick={(ev) => this.props.setAvatarModalRaised(ev, false)}>Settings</LinkItem>
          <Item onClick={ev => this.clickSignout(ev)}>Sign Out</Item>
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