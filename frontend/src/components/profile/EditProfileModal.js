import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
//action creator
import { getProfile, updateProfile } from "../../store/actions/index.js";
// components

// globals
import { phoneL, topHeaderHeight, phoneP, isUrl } from "../../globals/globals.js";

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

  textarea {
    resize: none; 
    width: 500px;
    height: 100px;
    margin: 2% 0;
    
    @media ${phoneP}{
      display: flex; 
      width: 100%;
    }
  }

  @media ${phoneP} {
    display: flex; 
    width: 100%;
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
    userId: "", 
    location : "",
    updated : false,
    twitterMessage : "", 
    githubMessage : "",
    linkedinMessage : "", 
    twitterError: false,
    githubError: false, 
    linkedinError: false,  
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
      userId: this.props.profile[0].id, 
      location : this.props.profile[0].location ? this.props.profile[0].location : "",
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
        userId: this.props.profile[0].id,
        location : this.props.profile[0].location ? this.props.profile[0].location : "",
        updated : false, 
      });
    }
  }

  componentDidUpdate(prevProps) {
    
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value});
  };

  handleUserMessage = (str) => {
    const section = str; 
    const displayMessage = `The ${section} input is not a valid link. Please adjust and try again. Valid link example http://${section}.com/profile123`;
    this.setState({displayMessage, section});
    switch(section){
      case "twitter":
        console.log("twitter")
        this.setState({ twitterMessage : displayMessage, twitterError: true}, () => console.log("link error"));
        break; 
      case "linkedin":
        console.log("linkedin")
        this.setState({linkedinMessage : displayMessage, linkedinError: true}, () => console.log("link error"));
        break; 
      case "github":
        console.log("github")
        this.setState({githubMessage: displayMessage, githubError: true}, () => console.log("link error")); 
        break; 
      default: 
        console.log("Shouldn't get to this case, but meets requirements");
    }
  }

  handleSubmit = async (event) => {
    /*Make the argument null needed for updateProfile if it is of zero length 
      Or if it has not changed from its previous setting. 
      checks are done to see if the profile links are valid links if not their state paramaters are updated and a message will be displayed on the modal and submission doesn't happen. 
      */
    event.preventDefault();

    

    let callTheFunction = false;
    let { userId, bio, twitter, github, linkedin, location } = this.state;
    if (bio.length === 0 || bio === this.props.profile[0].bio) {
      bio = null;
    } else {
      callTheFunction = true;
    }
    if (twitter.length === 0 || twitter === this.props.profile[0].twitter) {
      twitter = null;
    } else {
      if(!isUrl(twitter)) {
        await this.handleUserMessage("twitter"); 
        callTheFunction = true;
      }
      
    }
    if (github.length === 0 || github === this.props.profile[0].github) {
      github = null;
    } else {
      if(!isUrl(github)) {
        await this.handleUserMessage("github"); 
        callTheFunction = true;
      }
      
    }
    if (linkedin.length === 0 || linkedin === this.props.profile[0].linkedin) {
      linkedin = null;
    } else {
      if(!isUrl(linkedin)) {
        await this.handleUserMessage("linkedin"); 
        callTheFunction = true;
      }
      
    }

    if (location.length === 0 || location === this.props.profile[0].location){
      location = null; 
    } else {
      callTheFunction = true; 
    }

    const possibleErrors = [String(this.state.githubError), String(this.state.linkedinError), String(this.state.twitterError)]
    console.log(this.state);
    console.log(possibleErrors);
    if(possibleErrors.includes("true") !== true && callTheFunction === true) {
        return Promise.resolve(this.props.updateProfile(userId, bio, twitter, github, linkedin, location, this.props.history))
        .then(() => this.props.getProfile(userId, this.props.history) ).then( () => this.props.setEditProfileModalRaised(event, false))
    } else {
      this.setState({twitterError: false, linkedinError: false, githubError: false}); // after one error the form will never submit unless this is turned back to false
    }
  }

  render() {
    const { setEditProfileModalRaised } = this.props;

    const { bio, twitter, github, linkedin, location, twitterError, twitterMessage, githubError, githubMessage, linkedinError, linkedinMessage } = this.state;
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
                <h4>Bio - Tell us about yourself...</h4>
                <textarea
                  type="text"
                  placeholder=""
                  name="bio"
                  value={bio}
                  className="body-input"
                  onChange={this.handleChange}
                  >
                  </textarea>
                <h4>Location - Where are you?</h4>
                <input 
                  type = "text"
                  placeholder = ""
                  name = "location"
                  value = {location}
                  className = "body-input"
                  onChange = {this.handleChange}
                />
                <h4>Add Your Github profile link</h4>

                {githubError === true ?  <h4>{githubMessage}</h4> : <span></span>}
                <input
                  type="text"
                  placeholder=""
                  name="github"
                  value={github}
                  className="body-input"
                  onChange={this.handleChange}
                />
                <h4>Add Your Linkedin profile link</h4>
                {linkedinError === true ? <h4>{linkedinMessage}</h4> : <span></span>}
                <input
                  type="text"
                  placeholder=""
                  name="linkedin"
                  value={linkedin}
                  className="body-input"
                  onChange={this.handleChange}
                />
                <h4>Add your Twitter profile link</h4>
                {twitterError === true ? <h4>{twitterMessage}</h4> : <span></span>}
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
  setEditProfileModalRaised: PropTypes.func.isRequired,
  history : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profilesData.singleProfileData
});

export default connect(
  mapStateToProps,
  { getProfile, updateProfile }
)(EditProfileModal);
