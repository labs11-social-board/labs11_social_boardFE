import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { displayError, followDiscussion } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const FollowWrapper = styled.div`
  display: flex;
`;

const Followed = styled.div`
  width: 100%;
  position: relative;

  // .follow-btn {
  //   margin-left: 10px;
  //   padding: 10px 15px;
  //   border-radius: 5px;
  //   border: none;
  //   background-color: #418DCF;
  //   border: 1px solid #418DCF;
  //   color: white;
  //   width: 100%;

  //   &:hover {
  //     cursor: pointer;
  //     background-color: white;
  //     color: #418DCF;
  //     border: 1px solid #418DCF;
  //   }
  // }

  @media (max-width: 525px) {
    width: 100%;
  }

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

 class Follow extends Component {
	  handleChange = e => this.setState({ [e.target.name]: e.target.value });
	  handleFollowClick = e => {
      e.preventDefault();
      const { followDiscussion,discussion_id, user_id, historyPush } = this.props;
      return followDiscussion(discussion_id, user_id, historyPush);
	  };

    render() {
        const isFollowing = this.props.discussionFollows.some(follow => follow.discussion_id === Number(this.props.discussion_id));
        return (
          <FollowWrapper>
            <Followed isFollowing = { isFollowing }>
              <button
                className = 'follow'
                onClick={this.handleFollowClick}
                onChange = { this.handleChange }
              >
              {
                isFollowing ?
                <>
                  <i className='fas fa-minus-circle' />&nbsp;Unfollow Post
                </> :
                <>
                  <i className='fas fa-plus-circle' />&nbsp;Follow Post
                </>
              }
              </button>
            </Followed>
          </FollowWrapper>
        );
    }
};

const mapStateToProps = state => ({
  discussionFollows: state.users.discussionFollows,
  user_id: state.users.user_id,
});

export default connect(mapStateToProps, { followDiscussion, displayError })(Follow);

