import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

//action creator? 
import { inviteFriend } from "../../store/actions/index.js";
//globals 
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
//isInviteFriendModalRaised   setInviteFriendModalRaised
class InviteFriendModal extends React.Component {
    state = {
        email : "",
        error : "",
    }

    handleChange = event => {
        event.preventDefault(); 
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit =  async (event) => {
        event.preventDefault();
        await this.handleEmailInput(); 
        await this.props.setInviteFriendModalRaised(event, false);
    }

    handleEmailInput = () => {
        this.setState({error : ""});
        const email = this.state.email.slice();
        //If email was not entered return out of function. 
        if (email.length === 0){
          return;
        }
        const validEmail = this.verifyEmail(email); 
        /*if validEmail is false return some type of alert */
        
        if(validEmail === false){
          this.setState({error : "Email must feature @ symbol and must end with .com  .net or .edu. Sorry all other emails are currently not supported"});
        } else {
          this.props.inviteFriend(email);
          
        }
      }
    
      /*should check for @ symbol and .com .net .edu endpoints more can be added in if neccessary */
      verifyEmail = (email) => {
        if(email.includes('@') === true){
          const possibleEndOfEmail = {".com" : 0, ".net": 1, ".edu": 2} // O(1) for Object rather than O(n) for array 
          const lastFourCharactersOfEmail = email.slice(-4);
          if(lastFourCharactersOfEmail in possibleEndOfEmail){
            return true; //Valid Email
          }
        }
    
        return false; //Invalid email 
      }
      render(){
          const { setInviteFriendModalRaised } = this.props; 
          const { email, error } = this.state; 
          return (
              <ModalBackground>
                  <DivModalCloser
                  onClick = {event => setInviteFriendModalRaised(event, false)}
                  />
                  <DivModal>
                      <div className="above-input">
                        <span className = "back"
                        onClick = {event => setInviteFriendModalRaised(event, false)}
                        >
                          <i className="fa fa-arrow-left" />
                        </span>
                      </div>
                      <FormContent onSubmit = {this.handleSubmit}>
                        <DivRight>
                            <DivName>
                                <h4>What's your friends email?</h4>
                                <h4>{error}</h4>
                                <input 
                                  type= "text"
                                  placeholder= ""
                                  name = "email"
                                  value = {email}
                                  className = "body-input"
                                  onChange = {this.handleChange}
                                /> 
                            </DivName>
                        </DivRight>
                        <DivButtons>
                            <button className="btn" type ="submit">Submit
                            </button>
                        </DivButtons>
                      </FormContent>
                  </DivModal>
              </ModalBackground>
          )
      }
}

InviteFriendModal.propTypes = {
    setInviteFriendModalRaised: PropTypes.func.isRequired,
    inviteFriend : PropTypes.func.isRequired, 
}

export default connect(null, { inviteFriend })(InviteFriendModal);