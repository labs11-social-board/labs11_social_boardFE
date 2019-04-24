import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { addTeam, getUsersTeams, updateTeamWithLogo, resetImageState, displayMessage } from '../../store/actions/index.js';

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
    border: 1px solid #f66042;
    background-color: #f66042;
    color: white;

    &:hover {
      cursor: pointer;
      background-color: white;
      color: #f66042;
      border: 1px solid #f66042;
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

// const DivLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 34%;
//   align-items: center;
// `;

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

    @media ${phoneP}{
      height: 22vh;
      margin-bottom: 8px;
    }

    #drop-zone-t {
      width: 270px;
      margin-right: 17%;

      .drag-zone-t-wrapper {
        left: 46.2%;
        
        @media (max-width: 1680px){
          left: 45.5%;
        }

        @media (max-width: 1024px){
          left: 43.5%;
        }
        
        @media ${phoneP}{
          bottom: 72.7%;
          left: 38.2%;
        }
      }

      @media (max-width: 1440px) {
        margin-right: 22%;

        #label-text {
          width: 55%;
        }
        .fileinput + label {
          margin: 0px 0% 0 9.5%;
          height: 140px;
          line-height: 9;
        }
      }

      @media ${phoneP}{
        margin-right 24%;
        flex-direction: row;

        #label-text {
          width: 29%;
        }

        .fileinput + label {
          line-height: 7;
          height: 117px;
        }
      }
    }
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
    imagePreviewUrl: '',
    isUploading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { team_name, wiki, isPrivate } = this.state;
    const newTeam = { team_name, isPrivate, wiki };
    const { addTeam, historyPush, setAddTeamModalRaised, getUsersTeams, updateTeamWithLogo, image } = this.props;
    return Promise.resolve(setAddTeamModalRaised(e, false))
      .then(() => addTeam(newTeam).then((res) => {
          if(res){
            if(image.id){
              updateTeamWithLogo(image.id, res.payload.teamBoard.id);
              this.props.resetImageState();
            }
            historyPush(`/team/discussions/${res.payload.teamBoard.id}`);
          }
        }
      )).then(() => {
        getUsersTeams();
      });
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
  componentDidUpdate = prevProps => {
		if(this.props.isUploadingImage && !this.state.isUploading){
			this.setState({ isUploading: true }, () => {
				this.props.displayMessage('Uploading Image...')
			})
		} else if(this.state.isUploading && !this.props.isUploadingImage){
			this.setState({ isUploading: false }, () => {
				this.props.displayMessage('Image Uploaded!').then(() => {
					setTimeout(() => this.props.displayMessage(''), 200);
				})
			})
		}
	}
  render() {
    const { setAddTeamModalRaised } = this.props;
    const { team_name, wiki } = this.state;
    let isTeam = true;
    return (
      <ModalBackground>
        <DivModalCloser onClick={this.handleExit} />
        <DivModal>
          <div className='above-input'>
              <span
                className='back'
                onClick={(e) => setAddTeamModalRaised(e, false)}		
              ><i className="fa fa-arrow-left"></i></span>
              <span></span>
            </div>
          <FormContent onSubmit={this.handleSubmit}>
            <DivRight>
              <DivName>
                <div className='image-wrapper'>
                  <UploadImage isTeam={isTeam}/>
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
                <ToggleSwitch booleanValue={this.state.isPrivate} handleToggle={this.handleToggle} />
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
  image: state.posts.images,
  isUploadingImage: state.posts.isUploadingImage
});

export default connect(mapStateToProps, { addTeam, getUsersTeams, updateTeamWithLogo, resetImageState, displayMessage })(AddTeamModal);