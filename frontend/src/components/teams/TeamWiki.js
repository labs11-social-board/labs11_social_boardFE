import React from 'react';
import styled from 'styled-components';

class TeamWiki extends React.Component {
  state = {
    isEditting: false,
    updatedWiki: this.props.wiki
  };
  handleInput = e => {
    e.preventDefault();

    this.setState({ updatedWiki: e.target.value })
  }
  toggleEditting = e => {
    e.preventDefault();
    this.setState({ isEditting: true });
  };

  conditionalRender = isTeamOwner => {
    if(this.state.isEditting){
      return (
        <form>
          <textarea value={this.state.updatedWiki} onChange={this.handleInput}></textarea>
        </form>
      );
    } else {
      return (
        <div id='wiki' className='wiki tab-content '>
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

export default TeamWiki;
