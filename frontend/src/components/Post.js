import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// components
import {
  AddReplyForm,
  // EditPostForm,
  VoteCount,
  // Deleted,
  // Avatar,
  // Quote,
  Avatar,
  Reply,
} from './index.js';

import { handlePostVote, handleReplyVote } from '../store/actions/index.js';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 16px;
    margin-top: 16px;
  }

`;

const BodyWrapper = styled.p`
  text-align: justify;
  margin-bottom: 20px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 0.9rem;
  color: #a7a7a7;

  .user-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;

    .user {
      width: fit-content;
      color: black;

      &:hover {
        cursor: pointer;
      }
    }

    @media (max-width: 530px) {
      width: 100%;
    }
  }

  .discussion-info {
    display: flex;
    width: 75%;

    .reply {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
        color: #418DCF;
      }

      @media (max-width: 530px) {
        margin-left: 10px;
      }
    }

    .votes-wrapper {
      margin-right: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      i {
        padding-left: 10px;
        padding-right: 5px;
        padding-top: 2px;
      }
    }

    .date {
      display: flex;
    }

    @media (max-width: 830px) {
      justify-content: center;

      .desktop {
        display: none;
      }
    }

    @media (max-width: 630px) {
      .tablet {
        display: none;
      }
    }

    @media (max-width: 530px) {
      width: 100%;
      justify-content: flex-start;
      padding-top: 10px;
      margin-left: -10px;
    }
  }

  @media (max-width: 830px) {
    .desktop {
      display: none;
    }
  }

  @media (max-width: 630px) {
    .tablet, .desktop {
      display: none;
    }
  }

  @media (max-width: 530px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UsernameWrapper = styled.span`
  color: ${props => props.theme.discussionPostColor};

  &:hover {
		cursor: pointer;
		color: #418DCF;
	}
`;

const Post = ({
  post,
  // loggedInUserId,
  historyPush,
  // showEditPostForm,
  // updateEditPostForm,
  // handleRemovePost,
  showAddReplyForm,
  handlePostVote,
  toggleAddReplyForm,
  handleFilterChange,
  handleReplyVote,
  scrollTo,
}) => {

  const {
    body,
    created_at,
    discussion_id,
    id,
    // last_edited_at,
    downvotes,
    replies,
    user_id,
    username,
    user_vote,
    avatar,
    upvotes,
    // signature,
  } = post;

  const handleVote = (e, type) => handlePostVote(post.id, type)
    .then(() => handleFilterChange())
    .then(() => scrollTo());

  const handleReplyVoting = (reply_id, type) => handleReplyVote(reply_id, type)
    .then(() => handleFilterChange())
    .then(() => scrollTo());

  const handleAddReply = () => {
    if (showAddReplyForm === id){
      return toggleAddReplyForm()
    } else{
      return toggleAddReplyForm(id)
    }
  };

  const handleUserClick = e => {
    e.stopPropagation();
    return historyPush(`/profile/${ user_id }`);
  };

  return (
    <PostWrapper>
      <BodyWrapper>{ body }</BodyWrapper>
      <InfoWrapper>
        <div className = 'user-info'>
          <div className = 'user' onClick = { handleUserClick }>
            <Avatar
              height = '20px'
              width = '20px'
              src = { avatar }
            />
            &nbsp;
            <UsernameWrapper>{ username }</UsernameWrapper>
          </div>
        </div>
        <div className = 'discussion-info'>
          <span className = 'reply' onClick = { handleAddReply }>Reply</span>
          <div className = 'votes-wrapper'>
            <VoteCount
              upvotes = { upvotes }
              downvotes = { downvotes }
              user_vote = { user_vote }
              handleVote = { handleVote }
            />
          </div>
          <div className = 'date tablet'>
            <span>{moment(new Date(Number(created_at))).fromNow()}</span>
          </div>
        </div>
      </InfoWrapper>
      {
        showAddReplyForm === id &&
        <AddReplyForm
          post_id = { id }
          historyPush = { historyPush }
          discussion_id = { discussion_id }
          toggleAddReplyForm = { toggleAddReplyForm }
        />
      }
      <div>
        {
          replies.map((reply, i) =>
            <Reply
              key = { i }
              reply = { reply }
              historyPush = { historyPush }
              toggleAddReplyForm = { toggleAddReplyForm }
              showAddReplyForm = { showAddReplyForm }
              handleReplyVote = { handleReplyVoting }
            />
          )
        }
      </div>
  </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
  avatar: state.users.avatar,

});

export default connect(
  mapStateToProps,
  { handlePostVote, handleReplyVote }
)(Post);
