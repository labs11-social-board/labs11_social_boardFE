import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { followCategory } from '../store/actions/index.js';

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
      const { followCategory, displayError, category_id, user_id, historyPush, onCategoriesPage } = this.props;
      if (!user_id) {
        return displayError('You must be logged in to follow a category.');
      }
      return followCategory(category_id, user_id, historyPush, onCategoriesPage);
	  };
    
    render() {
      const { onCategoriesPage } = this.props;
        const isFollowing = this.props.categoriesFollowed.some(follow => follow.id === Number(this.props.category_id));
        return (
          <>
            {
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
            }
          </>
        );
    }
};

const mapStateToProps = state => ({
    categoriesFollowed: state.categories.categoriesFollowed,
    user_id: state.users.user_id
});

export default connect(mapStateToProps, { followCategory, displayError })(FollowCat);

