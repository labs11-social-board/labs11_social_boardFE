import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';



// action creators
import { updateTeam } from '../../store/actions/index.js';


/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/

const TextContainer = styled.textarea`
    height: 450px;
    width: 85%;

    @media(max-width: 800px) {
      width: 100%;
    }
 `;

const WikiEditButton = styled.button`
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 50px;

    @media(max-width: 800px) {
      width: 100%;
    }
`;

const TextContainerButtons = styled.button`
    border: 1px solid #418DCF;
    height: 35px;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    margin: 5px;

`;

const EditWikiDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-right: 5%;
    width: 100%;
`;

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
    this.setState({ isEditting: !this.state.isEditting, });
  };
  updateWiki = e => {
    e.preventDefault();
    const changes = { wiki: this.state.updatedWiki };

    this.props.updateTeam(this.props.team_id, changes);
    // this.setState({ isEditting: false });
    this.setState({ isEditting: false }, () => {
      setTimeout(() => this.props.getDiscussions(), 150);
    });
  };
  componentDidUpdate(prevProps){
    if(prevProps.wiki !== this.props.wiki){
     this.setState({ updatedWiki: this.props.wiki})
    }
  }
  conditionalRender = isTeamOwner => {
    if(this.state.isEditting){
      return (
       <div id='wiki' className='wiki tab-content'>
          <form onSubmit={this.updateWiki}>
            <TextContainer value={this.state.updatedWiki} onChange={this.handleInput}></TextContainer>
            <div>
            <TextContainerButtons>Update Wiki</TextContainerButtons>
            <TextContainerButtons onClick={this.toggleEditting}>Back</TextContainerButtons>
            </div>
          </form>
       </div>
      );
    } else {
      return (
        <div id='wiki' className='wiki tab-content'>

          <div className='wiki-content'>
            <p>{this.props.wiki}</p>
          </div>
          <EditWikiDiv>
            {isTeamOwner ? <WikiEditButton onClick={this.toggleEditting}>Edit</WikiEditButton> : null}
          </EditWikiDiv>
        </div>
      );
    }
  }
  
  render(){
  const { isTeamOwner } = this.props;

  return (
   <>
     {this.conditionalRender(isTeamOwner)}
   </>
  );
  }
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { updateTeam })(TeamWiki);
