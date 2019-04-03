import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { DiscussionByFollowedCats, AddDiscussionForm, FollowCat, Avatar, TeamWiki, UsersListModal } from '../index.js';

// action creators
import { getTeamDiscussions, handleDiscussionVote, getTeamMembers } from '../../store/actions/index.js';

// globals
import { tabletP } from '../../globals/globals.js';
import TeamSettings from './TeamSettings.js';

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
    flex-direction: column;
    width: 95%;
    margin-top: 5%;

    .edit-wiki{
      display: flex;
      justify-content: flex-end;
      padding-right: 5%;

      button {
        padding: 13px 25px;
      }
    }
  }

  .team-members {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    width: 95%;
    margin-top: 2%;

    .member-wrapper {
      display:flex;
      align-items: center;
      width: 40%;
      margin-bottom: 2%;
      cursor: pointer;

      &:hover {
        background: lightgrey;
        border-radius: 3px;
      }

      h2 {
        margin: 0% 5% 0% 5%;
        width: 60%;
      }
      .member_role {
        margin-right: 5%;
      }
    }
  }

  .team-settings {
    display:none;
    flex-direction: column;
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
    width: 31%;

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
    isTeamMembersTab: false,
    isAddTeamMemberModalRaised: false,
    isMember: false
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

    if(e.target.textContent === 'Team Members'){
      this.setState({ isTeamMembersTab: true })
    } else {
      this.setState({ isTeamMembersTab: false })
    }

    content.forEach(item => {
      item.classList.remove('selected');
      if(item.id === e.target.textContent.toLowerCase()){
        item.classList.add('selected');
      }
      }
    );
  }
  handleUserClick = (e, user_id)=> {
		e.stopPropagation();
		return this.props.history.push(`/profile/${ user_id }`);
	};
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
  setTeamMemberModal = (e, status) => {
    e.stopPropagation();
    this.setState({ isAddTeamMemberModalRaised: status });
  }
  componentDidMount = () => {
    this.getDiscussions().then(() => window.scrollTo(0, 0));
    this.props.getTeamMembers(this.props.match.params.team_id);
  };
  componentDidUpdate(prevProps) {
    const { match, getTeamDiscussions, getTeamMembers } = this.props;
    const { team_id } = match.params;
    const { order, orderType } = this.state;
    
    if (prevProps.match.params.team_id !== team_id) {
      getTeamDiscussions(team_id, order, orderType);
      getTeamMembers(team_id);
    };
  };
  render() {
    const { discussions, history, team, match, team_members, user_id} = this.props;
    const { showAddDiscussionForm, isTeamMembersTab, isAddTeamMemberModalRaised } = this.state;
    const member = this.props.team_members.filter(member => member.user_id === user_id);
    let isTeamOwner;
    let isMember;
    if(member.length === 0 ){
      isMember = false;
    } else {
      isMember = true;
      if(member[0].role === 'team_owner'){
        isTeamOwner=true;
      } else {
        isTeamOwner=false;
      }
    }
    console.log(isTeamOwner, member[0])
    if(!team){
      return (<h1>Loading..</h1>)
    } else {
      return (
        <DiscussionsWrapper>
          {isAddTeamMemberModalRaised && <UsersListModal setTeamMemberModal={this.setTeamMemberModal} team_id={team.id}/> }
          <DiscussionHeader>
            <div className='name-follow-wrapper'>
              <h2 className='name'>{team.team_name}</h2>
              <FollowCat
                team_id={match.params.team_id}
                historyPush={history.push}
                team_members={team_members}
              />
              {!isMember ? null : isTeamMembersTab ? <button onClick={e => this.setTeamMemberModal(e, true)}>Invite</button> : null}
            </div>
            <div className = 'team-tabs'>
              <h3 className='tab tab-selected' onClick={this.handleTab}>Discussions</h3>
              <h3 className='tab' onClick={this.handleTab}>Wiki</h3>
              <h3 className='tab' onClick={this.handleTab}>Team Members</h3>
              {isTeamOwner ? <h3 className='tab' onClick={this.handleTab}>Settings</h3> : null}
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
          <TeamWiki wiki={team.wiki} isTeamOwner={isTeamOwner} team_id={team.id} getDiscussions={this.getDiscussions}/>
          <div id='team members' className='team-members tab-content'>
            {team_members.map( (member, i)=> {
              return (
                <div key={i} className='member-wrapper' onClick={e => this.handleUserClick(e, member.user_id)}>
                  <Avatar height='70px' width='70px' src={ member.avatar }/>
                  <h2>{member.username}</h2>
                  <p className='member_role'>{member.role}</p>
                </div>
              );
            })}
          </div>
          {isTeamOwner ? 
            <TeamSettings team={team} getDiscussions={this.getDiscussions} history={history} /> : null
          }
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
  team_members: state.teams.team_members,
  user_id: state.users.user_id
});

export default connect(mapStateToProps, { getTeamDiscussions, handleDiscussionVote, getTeamMembers })(TeamBoard);
