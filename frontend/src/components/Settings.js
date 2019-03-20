import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// globals
import { phoneP, accountUserTypes, subscriptionPlans, topHeaderHeight } from '../globals/globals.js';

// action creators
import { getProfile, editUser, } from '../store/actions/index.js';

// components
import {
  Avatar,
  EditAvatarForm,
  EditAvatarUrlForm,
  DeleteAccountModal,
} from './index.js';

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.settingsBxShdw};
  width: 90%;
  margin-top: 10px;
  @media(max-width: 1024px) {
    display: flex;
    flex-directon: column;      
    justify-content: space-between;
  }
  @media ${phoneP}{
      width: 85%;
  }
  .fa-arrow-alt-circle-left {
    font-size: 2rem;
    align-self: flex-start;
    margin-left: 20px;
    cursor: pointer;
    @media(max-width: 1024px) {
      margin-left: 40px;
    }
    @media ${phoneP}{
      margin-left: 10px;
    }
  }
`;


const UserProperties = styled.form`
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  color: ${props => props.theme.discussionPostColor};
  @media(max-width: 1024px) {
    flex-direction: column;
    width: 60%;  
    p {
      padding-left: 5px;
    } 
  }
  @media ${phoneP}{
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .input-style {
    margin-top: 5px;
    margin-left: 1%;
    border: 1px solid rgb(222,180,200, 0.2);
    width: 180px;
    height: 20px;
    border-radius: 5px;
    padding: 5px;
    @media(max-width: 1024px) {
      width: 150%;      
    }
    @media ${phoneP}{
      width: 95%;
      margin-left: 0px;
    }
  }
  .delete-btn {
    background-color: ${props => props.theme.settingsDeleteButtonBg};
    color: ${props => props.theme.settingsDeleteButtonColor};

    @media(max-width: 1024px) {
      width: 75%;
      margin-bottom: 25px;      
    }
    @media ${phoneP}{
      width: 90%;  
      padding: 15px 0px 30px 0px;    
    }
    &:hover {
      background-color: ${props => props.theme.settingsDeleteButtonBgHov};
      cursor: pointer;
    }
  }
  .save-settings-btn {
    background-color: ${props => props.theme.settingsButtonBgColor};
    color: ${props => props.theme.settingsDeleteButtonColor};
    @media(max-width: 1024px) {
      width: 75%;      
    }
    @media ${phoneP}{
      width: 90%;  
      padding: 15px 0px 30px 0px;    
    }
    &:hover {
      background-color: ${props => props.theme.settingsButtonHov};
      cursor: pointer;
    }
  }
  .btn {
    border: 1px solid ${props => props.theme.defaultColorOnHover};
  }
  button {
    width: 30%;
    margin-top: 20px;
    border-radius: 5px;
    height: 30px;
    font-size: 12px;
    color: black;
    justify-content: center;
    align-items: center;
      &:focus {
        outline: none;
      }
      @media(max-width: 1024px) {
        font-size: 14px;
      }
      @media ${phoneP}{
        font-size: 12px;
      }
    }
`;
const SaveButton = styled.div`
  display:flex;
  flex-wrap: initial;
  width: 50%;
  border-radius: 5px;
  height: 30px;
  font-size: 12px;
  color: black;
  justify-content: space-between;
  align-items: center;
  margin-top: -29px;
  @media(max-width: 1024px) {
    flex-wrap: wrap;
    margin-bottom: 50px;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 104%;
  }
  @media ${phoneP}{
    flex-wrap: wrap;
    margin-bottom: 80px;
    justify-content: center;
    align-items: center;
  }
  @media(max-width: 480px){
    margin-top: -40px;
  }
  button {
    min-width: 193px;
  }
`;
const DeleteButton = styled.div`
  display:flex;
  flex-wrap: initial;
  width: 50%;
  border-radius: 5px;
  height: 30px;
  font-size: 12px;
  color: black;
  justify-content: space-between;
  align-items: center;
  @media(max-width: 1024px) {
    flex-wrap: wrap;
    margin-bottom: 50px;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
    width: 104%;
  }
  @media ${phoneP}{
    flex-wrap: wrap;
    margin-bottom: 80px;
    justify-content: center;
    align-items: center;
  }
  button {
    min-width: 193px;
  }
`;
const UserSettings = styled.div`
  width: 92%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
  margin-top: 10px;
  @media ${phoneP}{
    flex-direction: column;
    width: 85%;
  }
`;

const ProfileSettings = styled.div`
  margin-right: 25px;
  width: 30%;
  align-items: center;
  justify-content: center;
  .avatar-change{
    font-size: 12px;
    cursor: pointer;
    color: #418DCF;
    align-items: center;
    justify-content: center;
  }
  @media(max-width: 1024px) {
    width: 40%;  
  }
  @media ${phoneP}{
    margin-right: 0px;
    width: 100%;
  }
`;

const EmailAndAvatar = styled.div`
  width: 100%;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media(max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 680px){
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
  }
`;

const AvatarPic = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    p {
      margin-right: 20px;
    }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 10px;
  border-radius: 5px;
  width: 100vw;
  height: calc(100vh - ${topHeaderHeight});
  left: 0;
  top: ${topHeaderHeight};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  @media (max-height: 500px) {
    padding: 0;
  }

  @media (max-width: 485px) {
    padding: 0;
  }
`;

const EditAvatarMenu = styled.div`
  border-radius: 5px;
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.settingsBgColor};
	height: 30vh;
  width: 30vw;
  position: relative;

	@media (max-height: 500px) {
		height: 100vh;
	}

	@media (max-width: 485px) {
    height: 100vh;
    width: 80vw;
  }
  .back {
    font-size: 30px;
    color: ${props => props.theme.defaultColor};
    position: absolute;
    top: 30px;
    left: 0;

    &:hover {
      cursor: pointer;
      color: ${props => props.theme.defaultColorOnHover};
    }
  }
  .btn {
    padding: 10px 15px 25px;
    border-radius: 5px;
    background-color: #418DCF;
    color: white;
    border: 1px solid #418DCF;
    width: 50%;
    font-weight: bold;

    @media (max-width: 1024px) {
      width: 80%;
    }

    @media (max-width: 700px) {
      width: 100%;
    }

    &:hover {
      cursor: pointer;
      background-color: white;
      color: #418DCF;
      border: 1px solid #418DCF;
    }
  }
  .changeavatar {
    text-align: center;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 7px;
  }
`;

const FirstName = styled.div`
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }  
  @media(max-width: 1024px) {
    flex-direction: column;      
  }
  @media ${phoneP}{
    width: 95%;
  }
`;
const Email = styled.div`
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }
  .email {
    display: block;
  }
  @media(max-width: 1024px) {
    flex-direction: column;      
  }
  @media ${phoneP}{
    width: 95%;
  }
`;
const Password = styled.div`
  visibility: ${props => props.hide ? 'hidden' : 'visible'};
  font-size: 14px;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  p {
    margin: 0px 0px 7px 0px;
  }  
  @media(max-width: 1024px) {
    flex-direction: column;      
  }
  @media ${phoneP}{
    width: 95%;
  }
`;
const DivSubscriptionPlan = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 50%;
  margin-top: -58px;
  p {
    margin: 0px 0px 7px 0px;
  }
  button {
    margin: 0;
    width: 30%;
    min-width: 193px;
    color: white;
    background-color: steelblue;
    cursor: pointer;
    &:hover{
      background-color: rgb(0, 80, 0);
    }
    @media(max-width: 1024px) {
      width: 156%;
    }
    @media ${phoneP}{
      width: 98%;
      margin-left: 3px;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 15px 0px 30px 0px;
      border-radius: 5px;
    }
  }
  @media(max-width: 1024px) {
    margin: 0;
  }
  @media ${phoneP}{
    width: 95%;
  }
`;
const SpanSubPlan = styled.span`
font-weight: bold;
  color: red;
  color: ${props => props.subplan === subscriptionPlans[0] && 'black'};
  color: ${props => props.subplan === subscriptionPlans[1] && '#848795'};
  color: ${props => props.subplan === subscriptionPlans[2] && 'gold'};
`;
class Settings extends Component {
  state = {
    showForm: '',
    showDeleteModal: '',
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    user_type: ''
  };

  getProfile = () => this.props.getProfile(this.props.match.params.id, this.props.history);
  toggleForm = formName => this.setState({ showForm: formName });
  toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });
  onUploadAvatarSuccess = () => this.setState({ showForm: '' }, () => this.getProfile());
  componentDidMount = () => this.getProfile().then(() => this.setState({
    firstName: this.props.profile.username.split(' ')[0] || '',
    lastName: this.props.profile.username.split(' ')[1] || '',
    email: this.props.profile.email || '',
    user_type: this.props.user_type || ''
  }));
  componentDidUpdate(prevProps) {
    if (prevProps.user_type !== this.props.user_type) {
      this.setState({
        user_type: this.props.user_type || ''
      })
    }
  }
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = e => {
    e.preventDefault()
    const { firstName, lastName, email, oldPassword, newPassword } = this.state
    const username = firstName + ' ' + lastName;
    this.props.editUser(username, email, oldPassword, newPassword).then(() => this.getProfile())
  };
  goBack = () => this.props.history.goBack()
  render() {
    const { showForm, showDeleteModal, user_type } = this.state;
    const { profile, setChangeSubModalRaised } = this.props;
    const subPlan = (accountUserTypes.indexOf(user_type) !== -1) ? subscriptionPlans[accountUserTypes.indexOf(this.props.user_type)] : '';
    const { username, email, avatar, isAuth0, } = profile;
    const splitUsername = username.split(' ');
    return (
      <SettingsWrapper>
        <i onClick={this.goBack} className="far fa-arrow-alt-circle-left" />
        {/* <UsernameSettings><h1>{username}'s Settings</h1></UsernameSettings> */}
        <UserSettings>
          <ProfileSettings>
            <EmailAndAvatar>
              <AvatarPic>
                <Avatar height='150px' width='150px' src={avatar} />
              </AvatarPic>
              <p className='avatar-change' onClick={() => this.toggleForm('avatar-btns')}>
                (change)
                  </p>
            </EmailAndAvatar>
          </ProfileSettings>
          <UserProperties onSubmit={this.handleSubmit}>
            <FirstName><p> First Name <input className='input-style' name='firstName' placeholder={splitUsername[0]} value={this.state.firstName} onChange={this.handleInputChange} /></p></FirstName>
            <FirstName><p> Last Name <input className='input-style' name='lastName' placeholder={splitUsername[1]} value={this.state.lastName} onChange={this.handleInputChange} /></p></FirstName>
            <Email>
              <p>Email {isAuth0 ?
                <span className='email'>{email}</span>
                :
                <input
                  className='input-style'
                  name='email'
                  type='email'
                  placeholder={email}
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />}
              </p>
            </Email>
            {
              !isAuth0 ?
                <Password>
                  <p>Old Password <input name='oldPassword' className='input-style' type='password' placeholder='enter old password' value={this.state.oldPassword} onChange={this.handleInputChange} /></p>
                  <p>New Password <input name='newPassword' className='input-style' type='password' placeholder='enter new password' value={this.state.newPassword} onChange={this.handleInputChange} /></p>
                </Password> :
                <Password hide>
                  <p>Old Password <input name='oldPassword' className='input-style' type='password' placeholder='enter old password' value={this.state.oldPassword} onChange={this.handleInputChange} /></p>
                  <p>New Password <input name='newPassword' className='input-style' type='password' placeholder='enter new password' value={this.state.newPassword} onChange={this.handleInputChange} /></p>
                </Password>
            }
            <DivSubscriptionPlan>
              <p>Subscription&nbsp;Plan:&nbsp;{(subPlan) ? <SpanSubPlan subplan={subPlan}>{subPlan.toUpperCase()}</SpanSubPlan> : <SpanSubPlan>{user_type.toUpperCase()}</SpanSubPlan>}</p>
              <button className='btn' type='button' onClick={(ev) => setChangeSubModalRaised(ev, true)}>Change:&nbsp;Subscription&nbsp;Plan</button>
            </DivSubscriptionPlan>
            <DeleteButton>
              <button className='delete-btn btn' type='button' onClick={this.toggleDeleteModal}>
                Delete account
              </button>
            </DeleteButton>
            <SaveButton>
              <button className='save-settings-btn btn' type='submit' >
                Save settings
              </button>
            </SaveButton>
            {showDeleteModal && (
              <DeleteAccountModal toggleDeleteModal={this.toggleDeleteModal} />
            )}
            {showForm === 'avatar-pc-form' && (
              <EditAvatarForm
                toggleForm={this.toggleForm}
                onUploadAvatarSuccess={this.onUploadAvatarSuccess}
              />
            )}
            {showForm === 'avatar-url-form' && (
              <EditAvatarUrlForm
                toggleForm={this.toggleForm}
                onUploadAvatarSuccess={this.onUploadAvatarSuccess}
              />
            )}
            {showForm === 'avatar-btns' && (
              <AvatarContainer>
                <EditAvatarMenu>
                  <span
                    className='back'
                    onClick={() => this.toggleForm('')}
                  ><i className="far fa-arrow-alt-circle-left"></i></span>
                  <button className='btn' onClick={() => this.toggleForm('avatar-pc-form')}>
                    Upload&nbsp;from&nbsp;PC
                  </button>
                  <button className='btn' onClick={() => this.toggleForm('avatar-url-form')}>
                    Upload&nbsp;from&nbsp;URL
                  </button>
                </EditAvatarMenu>
              </AvatarContainer>
            )}
          </UserProperties>
        </UserSettings>
      </SettingsWrapper>
    );
  }
};

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData[0],
  user_type: state.users.user_type,
  signature: state.users.signature,
});
export default connect(
  mapStateToProps,
  { getProfile, editUser }
)(Settings);