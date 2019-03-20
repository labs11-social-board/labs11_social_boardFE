import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { DiscussionsByFollowedCats } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const LandingViewWrapper = styled.div`
  background-color: ${props => props.theme.landingViewWrapperBgColor};
  width: 95%;
  border-radius: 5px;

  @media ${tabletP}{
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  @media ${phoneP}{
    display: flex;
    flex-direction: column;
    width: 90%;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const LandingView = ({ history, match }) => {
  return (
    <LandingViewWrapper>
      <DiscussionsByFollowedCats history = { history } match = { match } />
    </LandingViewWrapper>
  );
};

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.loggingInLoadingMessage
  };
};

export default connect(
  mapStateToProps,
  {}
)(LandingView);