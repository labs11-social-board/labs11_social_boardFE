import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import DeleteComment from './DeleteComment';

// components
import {
  AddReplyForm,
  // EditPostForm,
  VoteCount,
  // Deleted,
  // Avatar,
  // Quote,
  Avatar,
  Reply
} from './index.js';

import {
  handlePostVote,
  handleReplyVote,
  removePost,
  displayMessage
} from '../store/actions/index.js';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
  overflow-wrap: break-word;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 16px;
    margin-top: 16px;
  }

  .show-image-wrapper {
		.show-image {
			border: 1px solid;
			display: flex;
			width: 20px;
			height: 20px;
		}
		img {
			max-width: 100%;
			height: auto;
		}
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
        color: #418dcf;
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

    .delete {
      margin-left: 10px;
      cursor:pointer;

      &:hover {
        color: #418dcf;
      }
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
    .tablet,
    .desktop {
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
    color: #418dcf;
  }
`;

const Post = ({
  post,
  loggedInUserId,
  historyPush,
  user_type,
  // showEditPostForm,
  // updateEditPostForm,
  removePost,
  showAddReplyForm,
  handlePostVote,
  toggleAddReplyForm,
  handleFilterChange,
  handleTeamFilter,
  handleReplyVote,
  //deleteReply,
  scrollTo,
  team_id, 
  displayMessage,
  isShowImage,
  handleImageShow
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
    image
    // signature,
  } = post;

  const handleVote = (e, type) =>
    handlePostVote(post.id, type)
      .then(() => {
        if (team_id) {
          handleTeamFilter();
        } else {
          handleFilterChange();
        }
      })
      .then(() => scrollTo());

  const handleReplyVoting = (reply_id, type) =>
    handleReplyVote(reply_id, type)
      .then(() => {
        if (team_id) {
          handleTeamFilter();
        } else {
          handleFilterChange();
        }
      })
      .then(() => scrollTo());

  const handleAddReply = () => {
    if (showAddReplyForm === id) {
      return toggleAddReplyForm();
    } else {
      return toggleAddReplyForm(id);
    }
  };

  const handleUserClick = e => {
    e.stopPropagation();
    return historyPush(`/profile/${user_id}`);
  };

  const handleRemovePost = (e, id) => {
    // e.preventDefault();
    removePost(id);
    displayMessage('Comment deleted');
    if (team_id) {
      handleTeamFilter();
    } else {
      handleFilterChange();
    }
  };
console.log(user_type)
  return (
    <PostWrapper>
      <div>
        <BodyWrapper>{body}</BodyWrapper>
        {image ? 
          <div className='show-image-wrapper'>
            <a className='show-image' onClick={handleImageShow}/>
            {isShowImage ? <img src={image} alt="uploaded image"/> : null}
          </div> : null}
      </div>
      <InfoWrapper>
        <div className="user-info">
          <div className="user" onClick={handleUserClick}>
            <Avatar height="20px" width="20px" src={avatar} />
            &nbsp;
            <UsernameWrapper>{username}</UsernameWrapper>
          </div>
        </div>
        <div className="discussion-info">
          <span className="reply" onClick={handleAddReply}>
            Reply
          </span>
          <div className="votes-wrapper">
            <VoteCount
              upvotes={upvotes}
              downvotes={downvotes}
              user_vote={user_vote}
              handleVote={handleVote}
            />
          </div>
          <div className="date tablet">
            <span>{moment(new Date(Number(created_at))).fromNow()}</span>
          </div>
          {/* {(loggedInUserId === user_id || user_type === 'admin' || user_type === 'moderator') ? 
            (<div className='delete'>
              <a onClick={e => handleRemovePost(e, id)}>Delete comment</a>
            </div>) 
            : null} */}
            <DeleteComment 
            handleRemovePost={handleRemovePost} 
            handleTeamFilter={handleTeamFilter} 
            handleFilterChange={handleFilterChange}
            id={id} 
            teamId={team_id} 
            user_id={user_id}
            />
        </div>
      </InfoWrapper>
      {showAddReplyForm === id && (
        <AddReplyForm
          post_id={id}
          historyPush={historyPush}
          discussion_id={discussion_id}
          toggleAddReplyForm={toggleAddReplyForm}
          team_id={team_id}
          handleFilterChange={handleFilterChange}
          handleTeamFilter={handleTeamFilter}
        />
      )}
      <div>
        {replies.map((reply, i) => ( 
          
          <Reply
            key={i}
            reply={reply}
            historyPush={historyPush}
            toggleAddReplyForm={toggleAddReplyForm}
            showAddReplyForm={showAddReplyForm}
            handleReplyVote={handleReplyVoting}
            team_id={team_id}
            handleFilterChange={handleFilterChange}
            handleTeamFilter={handleTeamFilter}
            isShowImage={isShowImage}
            handleImageShow={handleImageShow}
          />
        ))}
        
      </div>
    </PostWrapper>
  );
};

const mapStateToProps = state => ({
  loggedInUserId: state.users.user_id,
  avatar: state.users.avatar,
  user_type: state.users.user_type
});

export default connect(
  mapStateToProps,
  { handlePostVote, handleReplyVote, removePost, displayMessage }
)(Post);
