import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { getAllDiscussionsByFollowedCategories, handleDiscussionVote } from '../store/actions/index.js';

// components
import { DiscussionByFollowedCats, AddDiscussionForm } from './index.js';

// globals
import { tabletP } from '../globals/globals.js';

const DiscussionsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 10px;
	position: relative;
	justify-content: center;
	align-items: center;

	hr {
		width: 100%;
		border: 1px solid #d3d3d3;
	}

	.content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    width: 95%;
    color: ${props => props.theme.discussionPostColor};
    @media ${ tabletP} {
			width: 100%;
		}
	}
`;

const DiscussionHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.all-posts {
		font-size: 24px;
		flex-grow: 2;
    color: ${props => props.theme.discussionPostColor};
		@media ${ tabletP} {
			flex-grow: 0;
		}
	}

	.filter-wrapper {
		i {
      margin-right: 5px;
      color: ${props => props.theme.discussionPostColor};
		}
		.filter-by{
			color: ${props => props.theme.discussionPostColor};
		}

		.filter {
			border: none;
      background-color: rgba(0, 0, 0, 0);
      padding: 6px;
      border-radius: 5px;
      color: ${props => props.theme.discussionPostColor};
      option {
        color: black;
      }
			&:focus {
				outline: none;
			}
		}
	}

	.add-post-btn {
		margin-left: 10px;
		padding: 10px 15px;
		border-radius: 5px;
    border: 1px solid #418DCF;
		background-color: #418DCF;
		color: white;

		@media (max-width: 530px) {
      width: 100%;
      margin-left: 0;
		}

		&:hover {
			cursor: pointer;
			background-color: white;
			color: #418DCF;
		}
	}
`;

const newest = 'newest';
const oldest = 'oldest';
const mostUpvotes = 'most upvotes';
const mostViews = 'most views';
const mostComments = 'most comments';

class AllDiscussionsByFollowedCats extends Component {
  state = { filter: newest, followedDiscussions: [], showAddDiscussionForm: false };
  toggleAddDiscussionForm = () => this.setState({
    showAddDiscussionForm: !this.state.showAddDiscussionForm,
  });
  handleFilterChange = () => {
    const { filter, followedDiscussions } = this.state;
    let newFollowedDiscussions;
    switch (filter) {
      case newest: {
        newFollowedDiscussions = followedDiscussions.sort((a, b) => b.created_at - a.created_at);
        return this.setState({ followedDiscussions: newFollowedDiscussions });
      }
      case oldest: {
        newFollowedDiscussions = followedDiscussions.sort((a, b) => a.created_at - b.created_at);
        return this.setState({ followedDiscussions: newFollowedDiscussions });
      }
      case mostUpvotes: {
        newFollowedDiscussions = followedDiscussions.sort((a, b) => b.upvotes - a.upvotes);
        return this.setState({ followedDiscussions: newFollowedDiscussions });
      }
      case mostViews: {
        newFollowedDiscussions = followedDiscussions.sort((a, b) => b.views - a.views);
        return this.setState({ followedDiscussions: newFollowedDiscussions });
      }
      case mostComments: {
        newFollowedDiscussions = followedDiscussions.sort((a, b) => b.post_count - a.post_count);
        return this.setState({ followedDiscussions: newFollowedDiscussions });
      }
      default:
        return;
    }
  };
  handleSelectChange = e => this.setState({
    [e.target.name]: e.target.value,
  }, () => this.handleFilterChange());
  getDiscussions = () => this.props.getAllDiscussionsByFollowedCategories()
    .then(() => this.setState({ followedDiscussions: this.props.followedDiscussions }));
  voteOnDiscussion = (id, type) => this.props.handleDiscussionVote(id, type)
    .then(() => this.getDiscussions())
    .then(() => this.handleFilterChange());
  componentDidMount = () => this.getDiscussions();
  render() {
    const { followedDiscussions, showAddDiscussionForm } = this.state;
    const { history, match } = this.props;
    return (
      <DiscussionsWrapper>
        <DiscussionHeader>
          <h2 className='all-posts'>All Posts</h2>
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
              <option value={mostViews}>{mostViews}</option>
              <option value={mostComments}>{mostComments}</option>
            </select>
          </div>
          <button onClick={this.toggleAddDiscussionForm} className='add-post-btn'>
            <i className='fas fa-plus-circle' />&nbsp;Add Post
          </button>
        </DiscussionHeader>
        <hr />
        <div className='content'>
          {followedDiscussions.map((discussion, i) =>
            <DiscussionByFollowedCats
              key={i}
              discussion={discussion}
              history={history}
              voteOnDiscussion={this.voteOnDiscussion}
            />)
          }
        </div>
        {
          showAddDiscussionForm &&
          <AddDiscussionForm
            toggleAddDiscussionForm={this.toggleAddDiscussionForm}
            getDiscussions={this.getDiscussions}
            category_id={match.params.category_id}
          />
        }
      </DiscussionsWrapper>
    );
  }
};

const mapStateToProps = state => ({
  followedDiscussions: state.discussions.followedDiscussions,
});

export default connect(mapStateToProps, { getAllDiscussionsByFollowedCategories, handleDiscussionVote })(AllDiscussionsByFollowedCats);