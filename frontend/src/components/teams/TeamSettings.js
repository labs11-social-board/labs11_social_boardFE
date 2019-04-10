import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam, deleteTeam, displayMessage, getUsersTeams, updateTeamWithLogo, resetImageState } from '../../store/actions/index.js';

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
        margin-left: 1%;
        height: 20px;
        border-radius: 5px;
        padding: 5px;
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
        cursor: pointer;

        &:hover {
          color: #418DCF;
          border: 1px solid #418DCF;
          background-color: white;
        }
      }

      .delete {
        background: red;
        border: none;

        &:hover {
          color: red;
          border: 1px solid red;
          background-color: white;
        }
      }
    }

    .settings-upload {
      @media (max-width: 1440px){
        .drag-zone-t-wrapper {
          left: 12.5%;
          width: 11.8%;
        }
      }
      @media (max-width: 1024px){
        .drag-zone-t-wrapper {
          left: 16.5%;
          width: 18%;
        }
      }
      @media (max-width: 480px){
        .drag-zone-t-wrapper {
          bottom: 22.5%;
          left: 7%;
          width: 25%;
        }
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
    const { team, updateTeam, displayMessage, resetImageState } = this.props;

    updateTeam(team.id, changes)
      .then(() => {
        displayMessage('Team Settings Updated!');
        resetImageState();
      })
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
      this.setState({ image: this.props.image });
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
          <div className='settings-upload'>
           <UploadImage isTeam={isTeam} imagePreviewUrl={this.props.team.logo}/>
          </div>
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

export default connect(mapStateToProps, { updateTeam, deleteTeam, displayMessage, getUsersTeams, resetImageState })(TeamSettings);