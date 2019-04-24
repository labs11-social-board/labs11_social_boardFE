import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { background, subscriptions } from '../assets/index.js';
// import { Link } from 'react-router-dom';
// import { register, isEmailTaken, isUsernameTaken } from '../store/actions/index.js';
// import { RegisterDropdown } from './index.js';
import { symposiumDark, symposiumLight, symposiumLightOrange, symposiumDarkOrange } from '../assets/index.js';

const Woah = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  ${ ({
  loggedIn }) => loggedIn && '@media (max-width: 980px) {background-image: none;background-color: white;}'}
`;

const BackgroundBox = styled.div`
  width: 100%;
  
  background: white;
  background-size: cover;
  background-image: url("${background}");
  background-position: center center;
  height: 65vh;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    margin-bottom: 150px;

  }
`;

const LandingDivBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: white;
  background: #0000009c;
  `;

const LandingText = styled.h1`
  // height: 40%;
  // width: 50%;
  // margin-right: 30px;
  display: flex;
  justify-content: center;
  align-text: center;
  font-size: 42px;
  margin-bottom: 15px;
  @media (max-width: 1240px) {
    width: 100%;
    font-size: 32px;
    
  }

  ${ ({
  loggedIn }) => loggedIn && '@media (max-width: 980px) {width: 100%;background-color: white;}'}

  .blurb{
    font-size: 1.4rem;
    font-weight: bold;
    margin: 15px;
  }
`;

const GetStartedButton = styled.button`
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 100px;

    &:hover {
			cursor: pointer;
      background-color: ${props => props.theme.profilesWrapperBgColorHov};

  }
  `;

// const VideoPlayer = styled.div`   position: relative;   @media (max-width:
// 1240px) {     position: absolute;     top: 40%;     left: 0;     right: 0;
//  margin-left: auto;     margin-right: auto;   }   ${ ({ loggedIn }) =>
// loggedIn && '@media (max-width: 980px) {position: absolute;top: 40%;left:
// 0;right: 0;margin-left: auto;margin-right: auto;}'}   .vid-player{     width:
// 1400px;     height: 212px;     position: absolute;     top: 0;     right:
// 30px;     @media (max-width: 1240px) {       left: 0;       right: 0;
// margin-left: auto;       margin-right: auto;     }     ${ ({ loggedIn }) =>
// loggedIn && '@media (max-width: 980px) {left: 0;right: 0;margin-left:
// auto;margin-right: auto;}'}   } `; const Vidception = styled.div `   width:
// 60%;   height: 100%;   padding: 130px;   padding-left: 0px;   `;

// const TopFiller = styled.div`
  
//   `;

// const BottomFiller = styled.section`
//     display: flex;
//     justify-content: space-evenly
//     margin-top: 10px;
//     width: 100%;
//     height: 100%
//     postion: fixed;
//     height: 25vh;
    
//     @media(max-width: 1240px) {
//         flex-direction: column;
//         height: 60vh;
//       }
    
//   `;

// const TextBlurb = styled.div`
//     vertical-align: middle;
//     overflow-wrap: break-word;
//     text-align: center;
//     width: 100%;
//   `;

const LandingDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
  `;

const BottomFillerDiv = styled.div`
padding: 20px;
      text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    //width: 100px;
  `;

const ImageDiv = styled.div`
border-top: 1px solid black;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: 50vh;
    
  `;

const ExampleImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `;

const TeamContainer = styled.div`
  padding: 20px;
        text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;
      //width: 100px;
      border-top: 1px solid black;
      margin-top: 90px;
    `;

const TeamList = styled.div`
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
`;
const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background-color: white;
  border: 2px solid lightgray;
 cursor: pointer;

  img {
    width: 256px;
    height: 256px;
    
  }
`;

class NonUserLandingView extends Component {
  // constructor(props) {
  // super(props);
  state = {
    showRegisterModal: true,
  };

  render() {
    const { toggleRegisterModal } = this.props;
    console.log(toggleRegisterModal);
    return (
      <Woah loggedIn={this.props.user_id !== 0}>
        <BackgroundBox>
          <LandingDivBox>
            <LandingText loggedIn={this.props.user_id !== 0}>
              Welcome to Social App 3
              
            </LandingText>
            <LandingDiv>
            <img src={symposiumLightOrange} />
            </LandingDiv>
            <LandingDiv>
              <p>A place where discussions are built to further projects and encourage conversations.</p>
            </LandingDiv>
            <LandingDiv>
              <GetStartedButton onClick={toggleRegisterModal}> Get Started</GetStartedButton>
            </LandingDiv>
            {//<ImageDiv>
              // <ExampleImage src={example} alt="example" /> 
              //   </ImageDiv>
            }
          </LandingDivBox>
        </BackgroundBox>
        <section>
          <BottomFillerDiv>
            <h2>OUR FEATURES</h2>
            <p>Get more done with our team based discussion board. Easily create discussions, follow posts and people, and join teams. This is a must have for Team developers. We offer a free basic subcription as well as paid solutions.</p>
          </BottomFillerDiv>
          <ImageDiv>
            <h2>OUR SUBSCRIPTION TIERS</h2>

            <ExampleImage src={subscriptions} alt="subscriptions" />
          </ImageDiv>
          <TeamContainer>
            <h2>TEAM MEMBERS</h2>
            <TeamList>
            <TeamMember onClick={()=> window.open("https://github.com/nek0senpa1 ", "_blank")}>
                <h2>Amber Meador</h2>
                <img src='https://avatars2.githubusercontent.com/u/44776869?s=400&v=4' alt='Member' />
              </TeamMember>

              <TeamMember onClick={()=> window.open("https://github.com/TraiLynne ", "_blank")}>
                <h2>Trai Compton</h2>
                <img src='https://avatars1.githubusercontent.com/u/24273686?s=460&v=4' alt='Member' />
              </TeamMember>

              <TeamMember onClick={()=> window.open("https://github.com/imon3 ", "_blank")}>
                <h2>Imonhimi Ovbude</h2>
                <img src='https://avatars1.githubusercontent.com/u/40075966?s=460&v=4' alt='Member' />
              </TeamMember>
              
              <TeamMember onClick={()=> window.open("https://github.com/ModestoT", "_blank")}>
                <h2>Modesto Tamayo</h2>
                <img src='https://avatars2.githubusercontent.com/u/32940785?s=400&v=4' alt='Member' />
              </TeamMember>

              <TeamMember onClick={()=> window.open("https://github.com/codejoncode", "_blank")}>
                <h2>Jonathan Holloway</h2>
                <img src='https://avatars2.githubusercontent.com/u/38900224?s=400&v=4' alt='Member' />
              </TeamMember>

              <TeamMember onClick={()=> window.open("https://github.com/mag16", "_blank")}>
                <h2>Marco Guzman</h2>
                <img src='https://avatars0.githubusercontent.com/u/17074832?s=460&v=4' alt='Member' />
              </TeamMember>

              <TeamMember onClick={()=> window.open("https://github.com/jeff15113 ", "_blank")}>
                <h2>Jeffery Artrip</h2>
                <img src='https://avatars1.githubusercontent.com/u/9707341?s=460&v=4' alt='Member' />
              </TeamMember>

            </TeamList>
          </TeamContainer>
        </section>
      </Woah>
    )
  }
};

const mapStateToProps = state => ({ user_id: state.users.user_id });

export default connect(mapStateToProps, {})(NonUserLandingView);
