import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam } from '../../store/actions/index.js';

const Toggle = styled.div `

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  label{
    cursor: pointer;
    text-indent: -65px;
    width: 65px;
    height: 30px;
    background: grey;
    display: flex;
    border-radius: 100px;
    position: relative;
    align-items: center;
    margin-left: 18%;
  }

  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 25px;
    height: 24px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  
  input:checked + label {
    background: green;
  }
  
  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  
  label:active:after {
    width: 30px;
  }
`;
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
    return(
      <div id='settings' className='team-settings tab-content'>
        <h1>Settings</h1>
        <form>
          <Toggle>
            <input id='isPrivate' type='checkbox' name='isPrivate' checked={this.state.isPrivate} onChange={this.handleToggle} />
            <label htmlFor='isPrivate'>Private? </label>
          </Toggle>
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