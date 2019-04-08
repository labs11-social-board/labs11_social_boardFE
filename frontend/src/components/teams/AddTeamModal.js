import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addTeam, getUsersTeams, updateTeamWithLogo } from '../../store/actions/index.js';

// components 
import { ToggleSwitch, UploadImage } from '../index.js';

// globals
import { topHeaderHeight, phoneP } from '../../globals/globals.js';

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;
`;

const DivModalCloser = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 8002;
`;

const DivModal = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  z-index: 8003;
  background: rgb(248,249,254);
  padding: 25px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 590px;

  @media ${phoneP}{
    width: 95%;
    height: 95%;
    flex-direction: row;
  }

  .btn {
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
      border: 1px solid #418DCF;
    }

    @media (max-width: 600px) {
      width: 60vw;
      margin-top: 10px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  .above-input {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;

    i{
      font-size: 30px;

      &:hover {
          cursor: pointer;
          color: steelblue;
        }
    }			
  }
`;

const FormContent = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  @media ${phoneP} {
    height: 90%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${topHeaderHeight};
    flex-wrap: nowrap;
  }
`;

const DivLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 34%;
  align-items: center;
`;

const DivRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;

  @media ${phoneP} {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const DivName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap:wrap;

  .body-input {
    border-radius: 5px;
    padding: 5px 10px;
  }

  input[type=text]{
    margin: 0 24% 0 2%;

    @media ${phoneP}{
      margin: 0 14% 0 2%;
    }
  }

  textarea {
    resize: none;
    width: 500px;
    height: 200px;
    margin: 2% 0;
  }

  @media ${phoneP} {
    display: flex;
    width: 100%;
    align-items: baseline;
  }

  .image-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    
  }
`;

const DivButtons = styled.div`
  align-self: flex-end;

  @media (max-width: 600px) {
    align-self: center;
  }
`;

class AddTeamModal extends React.Component {
  state = {
    team_name: '',
    isPrivate: false,
    wiki: '',
    name: '',
    imagePreviewUrl: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { team_name, wiki, isPrivate } = this.state;
    const newTeam = { team_name, isPrivate, wiki };
    const { addTeam, historyPush, setAddTeamModalRaised, getUsersTeams, updateTeamWithLogo, image } = this.props;
    return Promise.resolve(setAddTeamModalRaised(e, false))
      .then(() => addTeam(newTeam).then((res) => {
          updateTeamWithLogo( image[0],res.payload.teamBoard.id);
          getUsersTeams();
          historyPush(`/team/discussions/${res.payload.teamBoard.id}`)
        }
      ));
  }

  handleInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  };
  handleToggle = e => {
    this.setState({ isPrivate: !this.state.isPrivate });
  };
  handleExit = e => {
    e.preventDefault();
    this.props.setAddTeamModalRaised(e, false);
    if(this.props.image.length > 0){
      this.props.removeUpload(this.props.image[0]);
      this.props.resetImageState();
		}
  }
  render() {
    const { setAddTeamModalRaised } = this.props;
    const { team_name, wiki, isPrivate, imagePreviewUrl } = this.state;
    return (
      <ModalBackground>
        <DivModalCloser onClick={this.handleExit} />
        <DivModal>
          <div className='above-input'>
              <span
                className='back'
                onClick={(e) => setAddTeamModalRaised(e, false)}		
              ><i className="far fa-arrow-alt-circle-left"></i></span>
              <span></span>
            </div>
          <FormContent onSubmit={this.handleSubmit}>
            <DivRight>
              <DivName>
                <div className='image-wrapper'>
                  <UploadImage/>
                </div>
                <label htmlFor='team_name'>Team Name</label>
                <input
                  type='text'
                  id='team_name'
                  placeholder='Team Name'
                  name='team_name'
                  value={team_name}
                  className = 'body-input'
                  onChange={this.handleInput}
                  autoComplete='off'
                />
                <ToggleSwitch isPrivate={this.state.isPrivate} handleToggle={this.handleToggle} />
                <label htmlFor='wiki'>Team Wiki/Description</label>
                <textarea 
                  id='wiki'
                  placeholder='Wiki/Description for your Team'
                  name='wiki'
                  value={wiki}
                  className= 'body-input'
                  onChange={this.handleInput}
                />
              </DivName>
            </DivRight>
            <DivButtons>
                <button className = 'btn' type='submit'>Add</button>
              </DivButtons>
          </FormContent>
        </DivModal>
      </ModalBackground>
    );
  };
};

const mapStateToProps = state => ({
  image: state.posts.images
});

export default connect(mapStateToProps, { addTeam, getUsersTeams, updateTeamWithLogo })(AddTeamModal);