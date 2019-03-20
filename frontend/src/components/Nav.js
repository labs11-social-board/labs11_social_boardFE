import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DisplayUser from './DisplayUser.js';
import Auth from './Auth.js';

//globals

import { phoneP, phoneL, tabletP, tabletL } from '../globals/globals.js'


// components
import { Search } from './index.js';

/***************************************************************************************************
 *********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  width: 90%;
  display: flex;
  color: black;
  justify-content: space-between;

  @media ${tabletL}{
    width: 90%;
  }
    @media ${phoneL}{
      width: 95%;
  }
  @media ${phoneP}{
    justify-content: space-between;
  }
`;

const DivAuth = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;


  @media ${tabletL}{
    width: ${ ({ user_id }) => user_id !== 0 ? '50%' : '100%'};
    display: flex;
    justify-content: ${ ({ user_id }) => user_id !== 0 ? 'space-between' : 'flex-end'};
  }

  @media ${phoneL}{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  i {
    color: ${props => props.theme.notificationFontColor};
    margin-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  margin-left: 15px;
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;

  @media ${tabletP}{
    width: 40%;
    margin-left: 10px;
    }
    
    @media ${phoneL}{
      margin-left: 10px;
      width: 45%;
    }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Nav extends Component {
  render() {
    return (
      <DivWrapper>
        {
          this.props.user_id !== 0 &&
          <SearchContainer>
            <Search showSearch={this.props.showSearch} scrollTo={this.props.scrollTo} pathname={this.props.pathname} goTo={this.props.goTo} toggleSearch={this.props.toggleSearch} />
          </SearchContainer>
        }
        <DivAuth user_id={this.props.user_id}>

          {
            this.props.user_id !== 0 && (
              this.props.isDay ?
            <i onClick={this.props.switchTheme} className='fas fa-sun' /> :
            <i onClick={this.props.switchTheme} className='fas fa-moon' />
            )
          }

          {(this.props.isLoggedIn) ? (
            <DisplayUser history={this.props.history} isAvatarModalRaised={this.props.isAvatarModalRaised} setAvatarModalRaised={this.props.setAvatarModalRaised} isNotificationsModalRaised={this.props.isNotificationsModalRaised} setNotificationsModalRaised={this.props.setNotificationsModalRaised} />
          ) : (
              <Auth history={this.props.history} isLoginDropdownModalRaised={this.props.isLoginDropdownModalRaised} setLoginDropdownModalRaised={this.props.setLoginDropdownModalRaised} toggleRegisterModal={this.props.toggleRegisterModal} />
            )}
        </DivAuth>
      </DivWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    user_id: state.users.user_id,
    isLoggedIn: state.users.isLoggedIn,
  };
};

export default connect(mapStateToProps, {})(Nav);