import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// globals
import {
  // phoneP,
  phoneL,
  // tabletP,
} from '../globals/globals.js';

// components
import { Avatar } from './index.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 55%;
  @media ${phoneL}{
    display: flex;
    justify-content: space-between;
    width: 70%;
  }
`;

const DivUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 750px){
      width: 70%;
    }
    @media (max-width: 450px){
      width: 70%;
    }
`;

const DivAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    transform: ${props => props.isAvatarModalRaised === 'true' && 'rotate(180deg)'};
  }
`;

const PWelcomeMessage = styled.p`
    margin-right: 20px;
    font-size: 20px;
    .notifications-icon-wrapper {
      position: relative;
      .notifications-count {
        position: absolute;
        top: 0;
        right: -10px;
        font-size: 0.7rem;
        background-color: #418DCF;
        color: white;
        border-radius: 50%;
        padding: 0 5px;
      }
      .notifications-icon {
        ${ ({ newNotifications }) => newNotifications && 'color: red;'}
        &:hover {
          color: #ddd;
          cursor: pointer;
        }
      }
      i {
        color: ${props => props.theme.notificationFontColor};
      }
    }
    @media (max-width: 750px){
      width: 40%;
      margin-right: 0px;
    }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class DisplayUser extends Component {
  render() {
    const { newNotifications, newNotificationCount, setNotificationsModalRaised, setAvatarModalRaised, isAvatarModalRaised, avatar } = this.props;
    return (
      <DivWrapper>
        <PWelcomeMessage newNotifications={newNotifications}>
          <span className='notifications-icon-wrapper'>
            <span className='notifications-count'>{newNotifications ? newNotificationCount : null}</span>
            <i
              onClick={(ev) => setNotificationsModalRaised(ev, true)}
              className='fas fa-bell'
            />
          </span>
        </PWelcomeMessage>
        <DivUser>
          <DivAvatar
            onClick={(ev) => setAvatarModalRaised(ev, true)}
            isAvatarModalRaised={isAvatarModalRaised.toString()}
          >

            <Avatar height={'40px'} width={'40px'} src={avatar} />
          </DivAvatar>
        </DivUser>
      </DivWrapper>
    );
  }
}


const mapStateToProps = state => ({
  avatar: state.users.avatar,
  newNotifications: state.users.newNotifications,
  newNotificationCount: state.users.newNotificationCount
});

export default connect(mapStateToProps, {})(DisplayUser);