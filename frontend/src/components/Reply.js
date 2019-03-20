import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

// components
import { AddReplyForm, Avatar, VoteCount } from './index.js';

//styles
const ReplyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 50px;
    border-left: 1px solid #ccc;
    padding-left: 10px;
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

    @media (max-width: 675px) {
      width: 50%;
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

const Reply = ({
    reply,
    loggedInUserId,
    historyPush,
    toggleAddReplyForm,
    showAddReplyForm,
    handleReplyVote,
}) => {
    const {
        body, 
        created_at,
        post_id,
        avatar,
        username,
        user_id,
        id,
        discussion_id,
        upvotes,
        downvotes,
        user_vote,
    } = reply;

    const handleAddReply = () => {
       if (showAddReplyForm === id){
         return toggleAddReplyForm()
       } else{
         return toggleAddReplyForm(id)
       }
    };

    const replyVote = (e, type) => handleReplyVote(id, type);

    const handleUserClick = e => {
      e.stopPropagation();
      return historyPush(`/profile/${ user_id }`);
    };

    return(
        <ReplyWrapper>
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
                  handleVote = { replyVote }
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
                  user_id={loggedInUserId}
                  toggleAddReplyForm={toggleAddReplyForm}
                  discussion_id = {discussion_id}
                  post_id={post_id}
                  historyPush={historyPush}
              />
            }
        </ReplyWrapper>
    );
};

const mapStateToProps = state => ({
    loggedInUserId: state.users.user_id,
    avatar: state.users.avatar,
    username: state.users.username,
    user_id: state.users.user_id
  });

  export default connect(mapStateToProps,{})(Reply);