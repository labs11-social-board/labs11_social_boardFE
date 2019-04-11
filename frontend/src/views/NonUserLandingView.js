import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {background, computericon } from '../assets/index.js';
import { Link } from 'react-router-dom';
import { register, isEmailTaken, isUsernameTaken } from '../store/actions/index.js';
import { RegisterDropdown } from './index.js';

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

  @media(max-width: 1240px) {
    background-image: none;
  }
`;

  const LandingText = styled.h1 `
  // height: 40%;
  // width: 50%;
  // margin-right: 30px;
  display: flex;
  justify-content: center;
  align-text: center;
  color: black;
  // @media (max-width: 1240px) {
  //   width: 100%;
  //   color: black;
  // }

  ${ ({
    loggedIn}) => loggedIn && '@media (max-width: 980px) {width: 100%;background-color: white;}'}

  .blurb{
    font-size: 1.4rem;
    font-weight: bold;
    margin: 15px;
  }
`;

  const LoginButton = styled.button `
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 100px;
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
    margin-top: 30px;
    display: flex;
    justify-content: space-evenly
    width: 100%;
    margin-top: 40px;
    postion: fixed;
    height: 45vh;
    @media(max-width: 1240px) {
        display: none;
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

    class NonUserLandingView extends Component {
      render() {
        const { toggleRegisterModal } = this.props;
        return (
          <Woah loggedIn={this.props.user_id !== 0}>
            <BackgroundBox>
              <LandingText loggedIn={this.props.user_id !== 0}>
              Welcome, get started here.
              </LandingText>
              <LandingDiv>
                <LoginButton onClick={toggleRegisterModal}> Get Started</LoginButton>
              </LandingDiv>
            </BackgroundBox>

            <BottomFiller>
              <TextBlurb>
                <img src={computericon} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </TextBlurb>
              <TextBlurb>
                <img src={computericon} />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </TextBlurb>
            </BottomFiller>
          </Woah>
        )
      }
    };

    const mapStateToProps = state => ({user_id: state.users.user_id});

    export default connect(mapStateToProps, {})(NonUserLandingView);
