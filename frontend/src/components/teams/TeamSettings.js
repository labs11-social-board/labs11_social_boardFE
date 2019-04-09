import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam, deleteTeam, displayMessage, getUsersTeams, updateTeamWithLogo } from '../../store/actions/index.js';

// components
import { ToggleSwitch, UploadImage } from '../index.js';

const Settings = styled.div `
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

    .team-name-wrapper {
      width: 100%;
      margin-bottom: 3%;

      input {
        width: 30%;
      }
    }

    .toggle-switch {
      margin: 0 0 3% 4%;
    }

    form {
      width: 50%;

      button {
        margin-right: 5%;
        margin-left: 10px;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #418DCF;
        background-color: #418DCF;
        color: white;
      }

      .delete {
        background: red;
        border: none;
      }
    }
`; 
class TeamSettings extends React.Component{
  state = {
    team_name: this.props.team.team_name,
    isPrivate: this.props.team.isPrivate,
    image: ''
  };
  handleInput = e => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value })
  };
  handleToggle = e => {
    this.setState({ isPrivate: !this.state.isPrivate });
  };
  updateTeam = e => {
    e.preventDefault();
    const changes = { ...this.state };
    const { team, updateTeam, displayMessage } = this.props;

    updateTeam(team.id, changes)
      .then(() => displayMessage('Team Settings Updated!'))
      .then(() => setTimeout(() => this.props.getDiscussions(), 150));
  };
  deleteTeam = e => {
    e.preventDefault();
    this.props.deleteTeam(this.props.team.id).then(() => {
      this.props.displayMessage('Team Deleted!');
      this.props.history.push('/teams');
      this.props.getUsersTeams();
    });
  };
  componentDidUpdate(prevProps){
    if( prevProps.team.team_name !== this.props.team.team_name){
      this.setState({ team_name: this.props.team.team_name, isPrivate: this.props.team.isPrivate });
    }

    if(prevProps.image !== this.props.image){
      this.setState({ image: this.props.image.image });
    }
  }
  render() {
    let isTeam = true;
    return(
      <div id='settings' className='team-settings tab-content'>
        <h1>Settings</h1>
        <Settings>
          <div className='team-name-wrapper'> 
            <label htmlFor='team_name'>Team Name: </label>
            <input id='team_name' type='text' name='team_name' value={this.state.team_name} onChange={this.handleInput} />
          </div>
          <UploadImage isTeam={isTeam} imagePreviewUrl={this.props.team.logo}/>
          <div className='toggle-switch'>
            <ToggleSwitch isPrivate={this.state.isPrivate} handleToggle={this.handleToggle} />
          </div>
          <form>
            <button onClick={this.updateTeam}>Update Team</button>
            <button className='delete' onClick={this.deleteTeam}>Delete Team</button>
          </form>
        </Settings>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  image: state.posts.images
});

export default connect(mapStateToProps, { updateTeam, deleteTeam, displayMessage, getUsersTeams })(TeamSettings);