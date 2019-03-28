import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { DiscussionByFollowedCats, AddDiscussionForm, FollowCat } from '../index.js';

// action creators
import { getTeamDiscussions, handleDiscussionVote, getTeamMembers } from '../../store/actions/index.js';

// globals
import { tabletP } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/

const DiscussionsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	padding: 10px;
	position: relative;
	justify-content: flex-start;
	align-items: center;
	width: 95%;
	min-height: 100vh;
	color: ${props => props.theme.discussionPostColor};

	hr {
		width: 100%;
		border: 1px solid #d3d3d3;
	}

	.content {
		display: none;
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

  .wiki {
    display: none;
  }

  .team-members {
    display: none;
  }
    
  .selected {
    display: flex;
  }
`;

const DiscussionHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
  width: 100%;
  
  .name-follow-wrapper {
    display: flex;
    align-items: center;
    .name {
      font-size: 24px;
    }
  }

  .team-tabs {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 25%;

    .tab {
      border: 1px solid black;
      padding: 6px 15px;
      border-radius: 3px;
      box-shadow: 1px 1px 1px 1px black;
      cursor:pointer;

      &:hover {
        background: lightskyblue;
        color: white;
      }
    } 
      
    .tab-selected {
      color: white;
      background: dodgerblue;
    }
  }

  @media (max-width: 910px) {
    flex-direction: column;
  }

	.filter-add-btn-wrapper {
    display: flex;
    .filter-wrapper {
      i {
        margin-right: 5px;
        color: ${props => props.theme.discussionPostColor};
      }
  
      .filter {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        padding: 5px;
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

      &:hover {
        cursor: pointer;
        background-color: white;
        color: #418DCF;
      }
    }
  }
`;

const newest = 'newest';
const oldest = 'oldest';
const mostUpvotes = 'most upvotes';
const mostViews = 'most views';
const mostComments = 'most comments';

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class TeamBoard extends Component {
  state = {
    order: 'created_at', // possible values: 'created_at', 'post_count', 'discussion_votes'
    orderType: '', // possible values: 'desc', 'asc'
    showAddDiscussionForm: false,
    isTeam: true,
  };
  toggleIsTeam = () => this.setState({ isTeam: !this.state.isTeam });
  toggleAddDiscussionForm = () => this.setState({
    showAddDiscussionForm: !this.state.showAddDiscussionForm,
  });
  handleDiscussionVote = (discussion_id, type) => {
    const { order, orderType } = this.state;
    const { getTeamDiscussions, handleDiscussionVote, match } = this.props;
    return handleDiscussionVote(discussion_id, type)
      .then(() => getTeamDiscussions(match.params.team_id, order, orderType));
  };
  handleTab = e => {
    const content = document.querySelectorAll('.tab-content');
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => tab.classList.remove('tab-selected'));

    e.target.classList.add('tab-selected');

    content.forEach(item => {
      item.classList.remove('selected');
      if(item.id === e.target.textContent.toLowerCase()){
        item.classList.add('selected');
      }
      }
    );
  }
  handleSelectChange = e => {
    let order = 'created_at';
    let orderType;
    switch (e.target.value) {
      case newest:
        order = 'created_at';
        orderType = 'desc';
        break;
      case oldest:
        order = 'created_at';
        orderType = 'asc';
        break;
      case mostUpvotes:
        order = 'upvotes';
        orderType = 'desc';
        break;
      case mostViews:
        order = 'views';
        orderType = 'desc';
        break;
      case mostComments:
        order = 'post_count';
        orderType = 'desc';
        break;
      default:
        break;
    };
    return this.setState({ order, orderType }, () => {
      return this.props.getTeamDiscussions(this.props.match.params.team_id, this.state.order, this.state.orderType);
    });
  };
  getDiscussions = () => {
    const { order, orderType } = this.state;
    const { getTeamDiscussions, match } = this.props;
    return getTeamDiscussions(match.params.team_id, order, orderType);
  };
  componentDidMount = () => {
    this.getDiscussions();
    this.props.getTeamMembers(this.props.match.params.team_id);
  }

  componentDidUpdate(prevProps) {
    const { match, getTeamDiscussions, posts } = this.props;
    const { team_id } = match.params;
    const { order, orderType } = this.state;
    
    if (prevProps.match.params.team_id !== team_id) {
      return getTeamDiscussions(team_id, order, orderType);
    };
  };
  render() {
    const { discussions, history, team, match, team_members } = this.props;
    const { showAddDiscussionForm } = this.state;
    if(!team){
      return (<h1>Loading..</h1>)
    } else {
      return (
        <DiscussionsWrapper>
          <DiscussionHeader>
            <div className='name-follow-wrapper'>
              <h2 className='name'>{team.team_name}</h2>
              <FollowCat
                team_id={match.params.team_id}
                historyPush={history.push}
                team_members={team_members}
              />
            </div>
            <div className = 'team-tabs'>
              <h3 className='tab tab-selected' onClick={this.handleTab}>Discussions</h3>
              <h3 className='tab' onClick={this.handleTab}>Wiki</h3>
              <h3 className='tab' onClick={this.handleTab}>Team Members</h3>
            </div>
            <div className='filter-add-btn-wrapper'>
              <div className='filter-wrapper'>
                <i className='fab fa-mix' />
                <span>Filter by</span>
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
            </div>
          </DiscussionHeader>
          <hr />
          <div id='discussions' className='content tab-content selected'>
            {discussions.map((discussion, i) =>
              <DiscussionByFollowedCats
                key={i}
                discussion={discussion}
                history={history}
                voteOnDiscussion={this.handleDiscussionVote}
                isTeam={this.state.isTeam}
                toggleIsTeam={this.toggleIsTeam}
              />)
            }
          </div>
          <div id='wiki' className='wiki tab-content '>
            <p>{team.wiki}</p>
          </div>
          <div id='team members' className='team-members tab-content'>
            {team_members.map( member => {
              return (
                <div key={member.id} className='member-wrapper'>
                  <h2>{member.username}</h2>
                  <p>{member.role}</p>
                </div>
              );
            })}
          </div>
          {
            showAddDiscussionForm &&
            <AddDiscussionForm
              toggleAddDiscussionForm={this.toggleAddDiscussionForm}
              getDiscussions={this.getDiscussions}
              team_id={match.params.team_id}
            />
          }
        </DiscussionsWrapper>
      );
    }
  }
};

const mapStateToProps = state => ({
  discussions: state.teams.teamDiscussions.discussions,
  team: state.teams.teamDiscussions.team,
  team_members: state.teams.team_members
});

export default connect(mapStateToProps, { getTeamDiscussions, handleDiscussionVote, getTeamMembers })(TeamBoard);
