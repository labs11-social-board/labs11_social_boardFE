import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../assets/gif/spinner/Spinner'; //need to move to assets folder
import { getProfiles } from '../store/actions/index';
import styled from 'styled-components';

// components
import { Deleted } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const ProfilesWrapper = styled.div`
display: flex;
flex-direction: column;
align-self: center;
margin: 1px;
padding: 1px;
border: ${props => props.theme.profilesWrapperBorder};
width: 90%;
border-radius: 30px;
background-color: ${props => props.theme.profilesWrapperBgColor};
box-shadow: #610b07 2px 1px 2px 2px;
@media(max-width: 768px){
  display: flex;
  flex-direction: column;
  width: 90%;
  @media (max-width: 450px){
  }
}
  

	.discussion-title {
		font-weight: bold;
  }
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.profilesWrapperBgColorHov};
  }
`;

const WrappedDiv = styled.div`
  margin: 5px;
  padding: 5px;
  display: flex;
  
  .property-title {
    font-weight: bold;
    display: flex;
    justify-content: space-around;
  }

  .property-content {
    padding: 0 0 0 5%;
    display: flex;
    justify-content: space-around;
    
  }
`;

const ProfilesTitle = styled.div`
  margin: 2px;
  padding: 2px;
  display: flex;
  font-weight: bold;
  justify-content: space-around;
  color: ${props => props.theme.profilesTitleColor};
  font-size: 36px;
`;

// const ProfilesList = styled.div`
//     display: flex;
//     width: 200px;

// `;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class Profiles extends Component {
    componentDidMount() {
      this.props.getProfiles();
    }
    //onClick method to select a single user
    selectUsers = id => {
      this.props.history.push(
        `/profile/${id}`
      )
    }

    // declared profiles and loading to props we receive from state
    render() {
      const { profiles, loading } = this.props.profiles;
      let profileItems;
    
    // if profiles is null, our loading component will be returned via profileItems
    if (profiles === null || loading ) {
        profileItems = <Spinner />;
    } else {
    
    /* if the length of profiles received is more than 0, our profileItems variable
    will map through an array to access its properties, and return that array, 
    then we choose what properties to display via the profile parameter */
        if (profiles.length > 0) {
          profileItems = profiles.map( (profile, index) => 
          <div key= {index} onClick = { () => this.selectUsers(profile.id) } >
          <ProfilesWrapper>
            <WrappedDiv>
              <p className = 'property-title'> Username: </p>
              <p className = 'property-content'> {profile.username ? profile.username : <Deleted />}</p>
            </WrappedDiv>
            <WrappedDiv>
              <p className = 'property-title'> Status: </p>
              <p className = 'property-content'> {profile.status}</p>
            </WrappedDiv>
          </ProfilesWrapper>
          </div>)
        } else {
          profileItems = <h4>No profiles found...</h4>;
        }
    }
  
    return (
            <div className = 'ProfileWrapper'>
              <ProfilesTitle> PROFILES </ProfilesTitle>
              {profileItems}
            </div>
        );
    }
}
  
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      status: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    })
};
  
const mapStateToProps = state => ({
        profiles: state.profilesData.allProfiles
});
  
export default connect(mapStateToProps, { getProfiles })(Profiles);
  