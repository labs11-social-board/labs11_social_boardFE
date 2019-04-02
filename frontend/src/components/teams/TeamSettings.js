import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam, deleteTeam, displayMessage } from '../../store/actions/index.js';

// components
import { ToggleSwitch } from '../index.js';

class TeamSettings extends React.Component{
  state = {
    team_name: this.props.team.team_name,
    isPrivate: this.props.team.isPrivate,
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
    this.props.updateTeam(this.props.team.id, changes).then(() => this.props.displayMessage('Team Settings Updated!'));
    setTimeout(() => this.props.getDiscussions(), 150);
  };
  deleteTeam = e => {
    e.preventDefault();
    this.props.deleteTeam(this.props.team.id).then(() => {
      this.props.displayMessage('Team Deleted!');
      this.props.history.push('/teams');
    });
  };
  componentDidUpdate(prevProps){
    if( prevProps.team.team_name !== this.props.team.team_name){
      this.setState({ team_name: this.props.team.team_name, isPrivate: this.props.team.isPrivate });
    }
  }
  render() {
    return(
      <div id='settings' className='team-settings tab-content'>
        <h1>Settings</h1>
        <form>
          <ToggleSwitch isPrivate={this.state.isPrivate} handleToggle={this.handleToggle} />
          <label htmlFor='team_name'>Team Name: </label>
          <input id='team_name' type='text' name='team_name' value={this.state.team_name} onChange={this.handleInput} />
          <button onClick={this.updateTeam}>Update Team</button>
          <button onClick={this.deleteTeam}>Delete Team</button>
        </form>
      </div>
    );
  };
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { updateTeam, deleteTeam, displayMessage })(TeamSettings);