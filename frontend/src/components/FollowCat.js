import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followCategory, joinTeam, leaveTeam, getUsersTeams } from '../store/actions/index.js';

// action creators
import { displayError } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const FollowWrapper = styled.div`
  position: relative;
  height: fit-content;
  
  &:hover {
    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const Followed = styled.div`
  .follow {
    cursor: pointer;
    margin-left: 10px;
    padding: 10px 15px;
		border-radius: 5px;
		border: 1px solid #f66042;
		background-color: ${ ({ isFollowing }) => isFollowing ? 'lightsteelblue' : '#f66042' };
    color: white;
    
    &:hover {
      background-color: white;
      color: #f66042;
      cursor: pointer;
    }
  }
`;


/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class FollowCat extends Component {
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
      e.preventDefault();
      const { followCategory, displayError, category_id, team_id, user_id, historyPush, onCategoriesPage, joinTeam } = this.props;
      if (!user_id) {
        return displayError('You must be logged in to follow a category.');
      }
      if(team_id){
        return joinTeam(team_id).then(() => this.props.getUsersTeams());
      } else {
        return followCategory(category_id, user_id, historyPush, onCategoriesPage);
      }
	  };
    handleLeaveTeam = e => {
      e.preventDefault();
      this.props.leaveTeam(this.props.team_id).then(() => this.props.getUsersTeams());
    }
    conditionalRender = () => {
      const { onCategoriesPage, team_id } = this.props;

      if(team_id){
        let isTeamMember = false;
        const isTeamOwner = this.props.team_members.filter( member => member.user_id === this.props.user_id);

        if(isTeamOwner.length === 0){
         isTeamMember = false;
        } else {
          if(isTeamOwner[0].role === 'team_owner'){
            return null;
          } else if(isTeamOwner.length > 0){
            isTeamMember = true;
          }
        }
        return (
          isTeamMember ?
          <FollowWrapper>
            <Followed isTeamMember = { isTeamMember }>
              <button
                className="follow"
                onClick={this.handleLeaveTeam}
              >
                <i className={isTeamMember ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>&nbsp;&nbsp;Leave Team!
              </button>
            </Followed>
          </FollowWrapper> : 
            <FollowWrapper>
              <Followed>
                <button
                  className="follow"
                  onClick={this.handleFollowClick}
                >
                  <i className={isTeamMember ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>&nbsp;&nbsp;Join!
                </button>
              </Followed>
            </FollowWrapper>
        );
      } else {
        const isFollowing = this.props.categoriesFollowed.some(follow => follow.id === Number(this.props.category_id));
        return (
          isFollowing ?
          onCategoriesPage ?
          <FollowWrapper>
            <Followed isFollowing = { isFollowing }>
              <button
                className="follow"
                onClick={this.handleFollowClick}
                onChange = { this.handleChange }
              >
                &nbsp;Unfollow
              </button>
            </Followed>
        </FollowWrapper> : null :
          <FollowWrapper>
            <Followed>
              <button
                className="follow"
                onClick={this.handleFollowClick}
                onChange = { this.handleChange }
              >
                &nbsp;Follow
              </button>
            </Followed>
          </FollowWrapper>
        );
      }
    };
    render() {        
        return (
          <>
            {this.conditionalRender()}
          </>
        );
    }
};

const mapStateToProps = state => ({
    categoriesFollowed: state.categories.categoriesFollowed,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followCategory, displayError, joinTeam, leaveTeam, getUsersTeams })(FollowCat);

