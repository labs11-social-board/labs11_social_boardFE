import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followCategory, joinTeam, leaveTeam } from '../store/actions/index.js';

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
		border: 1px solid #418DCF;
		background-color: ${ ({ isFollowing }) => isFollowing ? 'lightsteelblue' : '#418DCF' };
    color: white;
    
    &:hover {
      background-color: white;
      color: #418DCF;
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
        return joinTeam(team_id);
      } else {
        return followCategory(category_id, user_id, historyPush, onCategoriesPage);
      }
	  };
    handleLeaveTeam = e => {
      e.preventDefault();
      this.props.leaveTeam(this.props.team_id);
    }
    conditionalRender = () => {
      const { onCategoriesPage, team_id } = this.props;

      if(team_id){
        const isTeamMember = this.props.team_members.some( member => member.user_id === this.props.user_id);
        console.log(isTeamMember)
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
                <i className={isFollowing ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>&nbsp;&nbsp;Unfollow
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
                <i className={isFollowing ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>&nbsp;&nbsp;Follow
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

export default connect(mapStateToProps, { followCategory, displayError, joinTeam, leaveTeam })(FollowCat);

