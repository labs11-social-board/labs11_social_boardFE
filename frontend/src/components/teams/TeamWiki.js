import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam } from '../../store/actions/index.js';

class TeamWiki extends React.Component {
  state = {
    isEditting: false,
    updatedWiki: this.props.wiki
  };
  handleInput = e => {
    e.preventDefault();

    this.setState({ updatedWiki: e.target.value })
  };
  toggleEditting = e => {
    e.preventDefault();
    this.setState({ isEditting: !this.state.isEditting });
  };
  updateWiki = e => {
    e.preventDefault();
    const changes = { wiki: this.state.updatedWiki };

    this.props.updateTeam(this.props.team_id, changes);
    this.setState({ isEditting: false }, () => {
      setTimeout(() => this.props.getDiscussions(), 150);
    });
  };
  conditionalRender = isTeamOwner => {
    if(this.state.isEditting){
      return (
       <div id='wiki' className='wiki tab-content'>
          <form onSubmit={this.updateWiki}>
            <textarea value={this.state.updatedWiki} onChange={this.handleInput}></textarea>
            <button>Update Wiki</button>
            <button onClick={this.toggleEditting}>Back</button>
          </form>
       </div>
      );
    } else {
      return (
        <div id='wiki' className='wiki tab-content'>
          <div className='edit-wiki'>
            {isTeamOwner ? <button onClick={this.toggleEditting}>Edit</button> : null}
          </div>
          <div className='wiki-content'>
            <p>{this.props.wiki}</p>
          </div>
        </div>
      );
    }
  }
  
  render(){
  const { team_members, user_id } = this.props;

  const member = team_members.filter(member => member.user_id === user_id);
  let isTeamOwner = false;
  if(member.length === 0 ){
    return <div>...Loading</div>
  } else {
    if(member[0].role === 'team_owner'){
      isTeamOwner = true;
    } else {
      isTeamOwner = false;
    }
  }
  return (
   <>
     {this.conditionalRender(isTeamOwner)}
   </>
  );
  }
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { updateTeam })(TeamWiki);
