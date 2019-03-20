import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { socrates } from '../assets/index.js';

const Woah = styled.div`
  width: 100%;
  height: 67vh;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  background-image: url(${socrates});
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;

  @media (max-width: 1240px) {
    background-image: none;
    background-color: white;
  }

  ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {background-image: none;background-color: white;}'}
`;

const LandingText = styled.div`
  height: 40%;
  width: 50%;
  margin-right: 30px;

  @media (max-width: 1240px) {
    width: 100%;
    background-color: white;
  }

  ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {width: 100%;background-color: white;}'}

  .blurb{
    font-size: 1.4rem;
    font-weight: bold;
    margin: 15px;
  }
`;

const VideoPlayer = styled.div`
  position: relative;

  @media (max-width: 1240px) {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {position: absolute;top: 40%;left: 0;right: 0;margin-left: auto;margin-right: auto;}'}

  .vid-player{
    width: 1400px;
    height: 212px;
    position: absolute;
    top: 0;
    right: 30px;

    @media (max-width: 1240px) {
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    }

    ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {left: 0;right: 0;margin-left: auto;margin-right: auto;}'}
  }
`;

// const Vidception = styled.div `
//   width: 60%;
//   height: 100%;
//   padding: 130px;
//   padding-left: 0px;
//   `;


class NonUserLandingView extends Component {
  render() {
    return (

      <Woah loggedIn={this.props.user_id !== 0}>
        <LandingText loggedIn={this.props.user_id !== 0}>
          <p className='blurb'>
            Symposium is a place where like-minded people can come together to share and discuss ideas.
            </p>
        </LandingText>

        <VideoPlayer loggedIn={this.props.user_id !== 0}>
          <ReactPlayer
            className='vid-player'
            url='https://youtu.be/T-Dji780Ro0'
            width='320px' height='180px'
            controls={true}
          />
        </VideoPlayer>
      </Woah>
    )
  }
};

const mapStateToProps = state => ({
  user_id: state.users.user_id,
});

export default connect(mapStateToProps, {})(NonUserLandingView);
