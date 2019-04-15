import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {background, computericon, example } from '../assets/index.js';
import { Link } from 'react-router-dom';
// import { register, isEmailTaken, isUsernameTaken } from '../store/actions/index.js';
// import { RegisterDropdown } from './index.js';

const Woah = styled.section `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  ${ ({
  loggedIn}) => loggedIn && '@media (max-width: 980px) {background-image: none;background-color: white;}'}
`;

  const BackgroundBox = styled.div `
  width:100%;
  background: white;
  background-size: cover;
  background-position: center center;
  height: 85vh;
  background: #838B8B;
  margin-bottom: 20px;

  @media (max-width: 800px) {
    margin-bottom: 150px;

  }
`;

  const LandingDivBox = styled.div`
  margin-top: 160px;
  `;

  const LandingText = styled.h1 `
  // height: 40%;
  // width: 50%;
  // margin-right: 30px;
  display: flex;
  justify-content: center;
  align-text: center;
  color: black;
  font-size: 42px;
  margin-bottom: 15px;
  @media (max-width: 1240px) {
    width: 100%;
    color: black;
    font-size: 32px;
    
  }

  ${ ({
    loggedIn}) => loggedIn && '@media (max-width: 980px) {width: 100%;background-color: white;}'}

  .blurb{
    font-size: 1.4rem;
    font-weight: bold;
    margin: 15px;
  }
`;

  const GetStartedButton = styled.button `
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

    const TopFiller = styled.div `
  
  `;

    const BottomFiller = styled.section `
    display: flex;
    justify-content: space-evenly
    margin-top: 10px;
    width: 100%;
    height: 100%
    postion: fixed;
    height: 25vh;
    @media(max-width: 1240px) {
        flex-direction: column;
        height: 60vh;
      }
    
  `;

    const TextBlurb = styled.div `
    vertical-align: middle;
    overflow-wrap: break-word;
    text-align: center;
    width: 100%;
  `;

  const LandingDiv = styled.div`
    display: flex;
    justify-content: center;
  `;

  const BottomFillerDiv = styled.div `
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  `;

  const ExampleImage = styled.img `
    display: flex; 
    justify-content: center;
    max-height: 600px;
    max-width: 300px;
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
              Welcome to Social App 2
              </LandingText>
              <LandingDiv>
                <p>A place where discussions are built to further projects and encourage conversations.</p>
              </LandingDiv>
              <LandingDiv>
                <GetStartedButton onClick={toggleRegisterModal}> Get Started</GetStartedButton>
              </LandingDiv>
              <ExampleImage src={example} alt="example" /> 
              </LandingDivBox>
            </BackgroundBox>
          <section>
            <BottomFillerDiv>
              <h2>OUR SERVICES</h2>
              </BottomFillerDiv>
              <BottomFillerDiv>
                <p>Our site has a wide range features for our users.</p>
              </BottomFillerDiv>
            <BottomFiller>
              <TextBlurb>
                <img src={computericon} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.</p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </TextBlurb>
            </BottomFiller>
            <BottomFiller>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
              </TextBlurb>
            </BottomFiller>
            <BottomFillerDiv>
              <GetStartedButton onClick={toggleRegisterModal}> Get Started</GetStartedButton>
              </BottomFillerDiv>
            </section>
          </Woah>
        )
      }
    };

    const mapStateToProps = state => ({user_id: state.users.user_id});

    export default connect(mapStateToProps, {})(NonUserLandingView);
