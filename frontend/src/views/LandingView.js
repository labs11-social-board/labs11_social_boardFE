import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {phoneP, tabletP, } from '../globals/globals';
import { getUsers, verifyEmail } from './../store/actions/UsersActions';
import NoGo from './NoGo.js';




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

const tammy = {
  email: null,
}

// const user_id = localStorage.getItem('symposium_user_id');
// const token = localStorage.getItem('symposium_token');



/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class LandingView extends React.Component {

  
  componentDidMount() {
    // setTimeout( () => {
    //   this.props.verifyEmail(this.state.verify.email);
    // }, 200);
    const token = localStorage.getItem('symposium_token');
    this.props.verifyEmail(token);
    
    // console.log('mount',this.props.verified)
  }

  conditionalRender(){
    if (!this.props.verified) {
      return(
        <NoGo />
      )
    } else {
      return(
        <LandingViewWrapper>
        <DiscussionsByFollowedCats history = { this.props.history } match = { this.props.match } />
        </LandingViewWrapper>
      )
    }
  }
  render() {
    return (
      <>
        {this.props.isVerifyingEmail ? <div>...Loading</div> : this.conditionalRender()}
      </>
    );
  }


}

//  const LandingView = ({ history, match }) => {
//   return (
    
//     <LandingViewWrapper>
//       <DiscussionsByFollowedCats history = { history } match = { match } />
//     </LandingViewWrapper>
//   );
// };

// LandingView.propTypes = {
//   propertyName: PropTypes.string
// }

const mapStateToProps = state => {
  return {
    loggingInLoadingMessage: state.loggingInLoadingMessage,
    users: state.users,
    verified: state.users.verified,
    isVerifyingEmail: state.users.isVerifyingEmail
  };
};

export default connect(
  mapStateToProps,
  { getUsers, verifyEmail }
)(LandingView);