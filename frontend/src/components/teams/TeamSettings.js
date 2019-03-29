import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam } from '../../store/actions/index.js';

class TeamSettings extends React.Component{
  state = {
    team_name: this.props.team.team_name,
    isPrivate: this.props.team.isPrivate
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
    this.props.updateTeam(this.props.team.id, changes);
    setTimeout(() => this.props.getDiscussions(), 150);
  };
  render() {
    console.log(this.state.isPrivate)
    return(
      <div id='settings' className='team-settings tab-content'>
        <h1>Settings</h1>
        <form>
          <label htmlFor='isPrivate'>Private? </label>
          <input id='isPrivate' type='checkbox' name='isPrivate' checked={this.state.isPrivate} onChange={this.handleToggle} />
          <label htmlFor='team_name'>Team Name: </label>
          <input id='team_name' type='text' name='team_name' value={this.state.team_name} onChange={this.handleInput} />
          <button onClick={this.updateTeam}>Update Team</button>
        </form>
      </div>
    );
  };
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { updateTeam })(TeamSettings);