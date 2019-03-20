import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//globals
import { phoneL, tabletP } from '../globals/globals.js'

// components
import {
  // AddReplyForm,
  AddPostForm,
  Follow,
  // PostCount,
  // VoteCount,
  // Deleted,
  DiscussionByFollowedCats,
} from './index.js';

// views
import { PostsView } from '../views/index.js';

// action creators
import { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote } from '../store/actions/index.js';

/***************************************************************************************************
 ********************************************* Styles *********************************************
 **************************************************************************************************/
//Example: how to use themes
// ${props => props.theme.discussionAvatarUsernameColor};
// display: flex;
// flex-direction: column;
// border-radius: 15px;
// border-bottom: 16px;
// padding: 10px;
// box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
// background-color: ${props => props.theme.topDiscussionWrapperBgHov};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-left: 10px;

  .back-follow-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
      font-size: 30px;
      margin-right: 35px;
      margin-top: 15px;
      color: ${props => props.theme.defaultColor};

      &:hover{
        cursor: pointer;
        color: #418DCF;
      }
    }
  }
`;

const DiscussionWrapper = styled.div`
  color: ${props => props.theme.discussionPostColor};

  @media ${phoneL}{
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  }
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;

  @media ${tabletP} { 
  }

  @media ${phoneL}{
    text-align: left;
  }
`;

const Posts = styled.div``;

const CommentSort = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;

  .comment-sort-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .title-add-wrapper {
    display: flex;
    width: 30%;
    justify-content: flex-start;
    align-items: center;
    width: 50%;

    @media (max-width: 530px) {
      width: 30%;
    }
  }

  .add-post-btn {
    margin-left: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    background-color: #418DCF;
    color: white;
    border: 1px solid #418DCF;

    &:hover {
      cursor: pointer;
      background-color: white;
      color: #418DCF;
      border: 1px solid #418DCF;
    }
  }

  .tablet, .tablet-btn {
    display: none;
  }

  @media (max-width: 590px) {
    align-items: center;
    .desktop {
      display: none;
    }

    .tablet-btn {
      display: inline-block;
      width: 100%;
      margin-left: 0;
      margin-top: 10px;
    }
  }

  .sort {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;

    .filter-wrapper {
      i {
        margin-right: 5px;
        color: ${props => props.theme.defaultColor};
      }
      .filter-by{
        color: ${props => props.theme.defaultColor};
      }
  
      .filter {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding: 6px;
        border-radius: 5px;
        color: ${props => props.theme.defaultColor};
        option {
          color: black;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }

  @media (max-width: 590px) {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const newest = 'newest';
const oldest = 'oldest';
const mostUpvotes = 'most upvotes';

class Discussion extends Component {
  state = {
    showAddPostForm: false, // boolean
    showEditDiscussionForm: false, // boolean
    showEditPostForm: null, // post_id
    showAddReplyForm: null, // post_id
    filter: newest,
  };
  handleSelectChange = e => this.setState({
    [e.target.name]: e.target.value,
  }, () => this.handleFilterChange());
  handleFilterChange = () => {
    const { filter } = this.state;
    const { getDiscussionById, id } = this.props;
    switch (filter) {
      case newest: {
        return getDiscussionById(id, 'created_at', 'desc');
      }
      case oldest: {
        return getDiscussionById(id, 'created_at', 'asc');
      }
      case mostUpvotes: {
        return getDiscussionById(id, 'upvotes', 'desc');
      }
      default:
        return;
    }
  };
  toggleAddPostForm = () => this.setState({ showAddPostForm: !this.state.showAddPostForm });
  toggleEditDiscussionForm = () => this.setState({ showEditDiscussionForm: !this.state.showEditDiscussionForm });
  toggleAddReplyForm = (id) => this.setState({ showAddReplyForm: id || null });
  updateEditPostForm = post_id => this.setState({ showEditPostForm: post_id });
  handleRemovePost = (user_id, post_id, historyPush, discussion_id) => {
    return this.props.removePost(user_id, post_id, historyPush, discussion_id);
  };
  handleRemoveDiscussion = () => {
    const {
      removeDiscussion,
      id,
      historyPush,
      discussion,
    } = this.props;
    const { category_id } = discussion;
    return removeDiscussion(id, category_id, historyPush);
  };
  handleDiscussionVote = (discussion_id, type) => {
    const { handleDiscussionVote } = this.props;
    return handleDiscussionVote(discussion_id, type)
      .then(() => this.handleFilterChange());
  };
  componentDidMount = () => {
    const { scrollTo } = this.props;
    return this.handleFilterChange().then(() => scrollTo());
  };
  componentDidUpdate = prevProps => {
    const { id, scrollTo } = this.props;
    if (prevProps.id !== id) return this.handleFilterChange().then(() => scrollTo());
  };
  handleVote = (id, type) => {
    this.handleDiscussionVote(id, type);
  };
  render() {
    const {
      showAddPostForm,
      showEditPostForm,
      showAddReplyForm,
    } = this.state;
    const { discussion, history, historyPush, loggedInUserId, scrollTo } = this.props;
    const {
      // body,
      // created_at,
      // last_edited_at,
      // upvotes,
      // downvotes,
      // avatar,
      // category_name,
      category_id,
      // category_icon,
      id,
      posts,
      // post_count,
      // user_id,
      // username,
      // user_vote,
    } = discussion;
    return (
      <Wrapper>
        <div className='back-follow-wrapper'>
          <Link className='back' to={`/discussions/category/${category_id}`}><i className="far fa-arrow-alt-circle-left"></i></Link>
          <Follow
            discussion_id={id}
            historyPush={historyPush}
          />
        </div>
        <DiscussionWrapper>
          <SubWrapper>
            <DiscussionByFollowedCats
              discussion={discussion}
              history={history}
              voteOnDiscussion={this.handleVote}
              singleDiscussion={true}
            />
            <CommentWrapper>
              <CommentSort>
                <div className='comment-sort-wrapper'>
                  <div className='title-add-wrapper'>
                    <span className='title'>Comments</span>
                    <button onClick={this.toggleAddPostForm} className='add-post-btn desktop'>
                      <i className='fas fa-plus-circle' />&nbsp;Add Comment
                    </button>
                  </div>
                  <div className='sort'>
                    <div className='filter-wrapper'>
                      <i className='fab fa-mix' />
                      <span className='filter-by'>Filter by &nbsp;</span>
                      <select
                        className='filter'
                        onChange={this.handleSelectChange}
                        name='filter'
                      >
                        <option value={newest}>{newest}</option>
                        <option value={oldest}>{oldest}</option>
                        <option value={mostUpvotes}>{mostUpvotes}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button onClick={this.toggleAddPostForm} className='add-post-btn tablet-btn'>
                  <i className='fas fa-plus-circle' />&nbsp;Add Comment
                </button>
              </CommentSort>
              {showAddPostForm && (
                <AddPostForm
                  user_id={loggedInUserId}
                  discussion_id={id}
                  historyPush={historyPush}
                  toggleAddPostForm={this.toggleAddPostForm}
                />
              )}
              <Posts>
                <PostsView
                  posts={posts}
                  showEditPostForm={showEditPostForm}
                  updateEditPostForm={this.updateEditPostForm}
                  handleRemovePost={this.handleRemovePost}
                  showAddReplyForm={showAddReplyForm}
                  toggleAddReplyForm={this.toggleAddReplyForm}
                  discussion_id={id}
                  historyPush={historyPush}
                  repliedPost={posts.find(post => post.id === showAddReplyForm)}
                  handleFilterChange={this.handleFilterChange}
                  scrollTo={scrollTo}
                />
              </Posts>
            </CommentWrapper>
          </SubWrapper>
        </DiscussionWrapper>
      </Wrapper>
    );
  }
};

const mapStateToProps = state => ({
  discussion: state.discussions.discussion,
  loggedInUserId: state.users.user_id
});

export default connect(
  mapStateToProps,
  { getDiscussionById, removePost, removeDiscussion, handleDiscussionVote }
)(Discussion);
