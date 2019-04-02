import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
//action creator
import { getProfile, updateProfile } from "../../store/actions/index.js";
// components

// globals
import { phoneL, topHeaderHeight } from "../../globals/globals.js";

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 8001;
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
  background: rgb(248, 249, 254);
  padding: 25px;
  border-radius: 5px;
  box-sizing: border-box;
  width: 590px;

  .btn {
    margin-left: 10px;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #418dcf;
    background-color: #418dcf;
    color: white;

    &:hover {
      cursor: pointer;
      background-color: white;
      color: #418dcf;
      border: 1px solid #418dcf;
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

    i {
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

  @media ${phoneL} {
    height: 90%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: ${topHeaderHeight};
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

  @media ${phoneL} {
    width: 100%;
    height: 60%;
    justify-content: center;
    align-items: center;
  }
`;

const DivName = styled.div`
  .body-input,
  .categories-select {
    border-radius: 5px;
    padding: 5px 10px;
  }

  @media ${phoneL} {
    display: flex;
    height: 20%;
    width: 80%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const DivButtons = styled.div`
  align-self: flex-end;

  @media (max-width: 600px) {
    align-self: center;
  }
`;

class EditProfileModal extends React.Component {
  state = {
    bio: "",
    twitter: "",
    github: "",
    linkedin: "",
    userId: ""
  };

  componentWillMount() {
    this.props.getProfile(this.props.profile[0].id);
    this.setState({
      bio: this.props.profile[0].bio ? this.props.profile[0].bio : "",
      twitter: this.props.profile[0].twitter
        ? this.props.profile[0].twitter
        : "",
      github: this.props.profile[0].github ? this.props.profile[0].github : "",
      linkedin: this.props.profile[0].linkedin
        ? this.props.profile[0].linkedin
        : "",
      userId: this.props.profile[0].id
    });
  }

  componentWillUpdate(prevProps) {
    if (prevProps.profile[0].id !== this.props.profile[0].id) {
      // this line handles going from profile to profile.
      this.props.getProfile(this.props.profile[0].id);
      this.setState({
        bio: this.props.profile[0].bio ? this.props.profile[0].bio : "",
        twitter: this.props.profile[0].twitter
          ? this.props.profile[0].twitter
          : "",
        github: this.props.profile[0].github
          ? this.props.profile[0].github
          : "",
        linkedin: this.props.profile[0].linkedin
          ? this.props.profile[0].linkedin
          : "",
        userId: this.props.profile[0].id
      });
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.props);
  };

  handleSubmit = event => {
    event.preventDefault();
    let { userId, bio, twitter, github, linkedin } = this.state;
    if (bio.length === 0){
        bio = null; 
    }
    if (twitter.length === 0){
        twitter = null; 
    }
    if (github.length === 0){
        github = null; 
    }
    if (linkedin.length === 0){
        linkedin = null; 
    }
    
    this.props.updateProfile(userId, bio, twitter, github, linkedin);
    this.props.setEditProfileModalRaised(event, false) //closes modal affter submitting. 
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const { setEditProfileModalRaised } = this.props;

    const { bio, twitter, github, linkedin } = this.state;
    return (
      <ModalBackground>
        <DivModalCloser
          onClick={event => setEditProfileModalRaised(event, false)}
        />
        <DivModal>
          <div className="above-input">
            <span
              className="back"
              onClick={event => setEditProfileModalRaised(event, false)}
            >
              <i className="far fa-arrow-alt-circle-left" />
            </span>
          </div>
          <FormContent onSubmit={this.handleSubmit}>
            <DivRight>
              <DivName>
                <h4>Bio</h4>
                <input
                  type="text"
                  placeholder=""
                  name="bio"
                  value={bio}
                  className="body-input"
                  onChange={this.handleChange}
                />
                <h4>Github link</h4>
                <input
                  type="text"
                  placeholder=""
                  name="github"
                  value={github}
                  className="body-input"
                  onChange={this.handleChange}
                />
                <h4>Linkedin link</h4>
                <input
                  type="text"
                  placeholder=""
                  name="linkedin"
                  value={linkedin}
                  className="body-input"
                  onChange={this.handleChange}
                />
                <h4>Twitter link</h4>
                <input
                  type="text"
                  placeholder=""
                  name="twitter"
                  value={twitter}
                  className="body-input"
                  onChange={this.handleChange}
                />
              </DivName>
            </DivRight>
            <DivButtons>
              <button className="btn" type="submit">
                Submit
              </button>
            </DivButtons>
          </FormContent>
        </DivModal>
      </ModalBackground>
    );
  }
}
EditProfileModal.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  setEditProfileModalRaised: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData
});

export default connect(
  mapStateToProps,
  { getProfile, updateProfile }
)(EditProfileModal);
