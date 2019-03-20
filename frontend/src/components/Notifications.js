import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// globals
import { phoneL } from '../globals/globals.js';

// action creators
import { removeNotification } from '../store/actions/index.js';

// components
import { Notification } from './index.js';

const DivNotificationsContainer = styled.div`
  display: ${props => props.isNotificationsModalRaised === 'true' ? 'flex' : 'none'};
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

const NotificationsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	z-index: 9998;
	position: fixed;
	border: 1px solid ${props => props.theme.borderColor};
	border-radius: 5px;
	background-color: ${props => props.theme.notificationBackgroundColor};
	color: ${props => props.theme.notificationFontColor};
	padding: 5px;
	width: 310px;
	top: 63px;
	right: 110px;
`;

class Notifications extends Component {

  goTo = (ev, url) => {
    ev.preventDefault();
    this.props.setNotificationsModalRaised(ev, false);
    this.props.history.push(url);
  }

  render() {
    const { notifications, removeNotification, isNotificationsModalRaised, setNotificationsModalRaised } = this.props;
    return (
      <DivNotificationsContainer isNotificationsModalRaised={isNotificationsModalRaised.toString()}>
        <DivModalCloser onClick={(ev) => setNotificationsModalRaised(ev, false)} />
        <NotificationsWrapper>
          {
            notifications.length ?
              notifications.map((notification, i) =>
                <Notification
                  key={i}
                  notification={notification}
                  goTo={this.goTo}
                  removeNotification={removeNotification}
                />
              ) :
              <p>No notifications.</p>
          }
        </NotificationsWrapper>
      </DivNotificationsContainer>
    );
  }
};

const mapStateToProps = state => ({
  notifications: state.users.notifications
});

export default connect(
  mapStateToProps,
  { removeNotification }
)(Notifications);
