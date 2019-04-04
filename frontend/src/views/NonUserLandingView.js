import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { background } from '../assets/index.js';


const Woah = styled.section`
  width: 100%;
<<<<<<< HEAD
  height: 100%;
=======
  height: 115vh;
>>>>>>> aa696a9f80e9d9097b65c030b8bb9341bc37fa24
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1240px) {
    background-image: none;
    background-color: gray;
  }

  ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {background-image: none;background-color: white;}'}
`;

const BackgroundBox = styled.div`
  width:100%;
  background: linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${background});
  background-size: cover;
  background-position: center center;
  height: 85vh;
`;

const LandingText = styled.h1`
  // height: 40%;
  // width: 50%;
  // margin-right: 30px;
  display: flex;
  justify-content: center;
  align-text: center;
  color: lightgtr;
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

// const VideoPlayer = styled.div`
//   position: relative;

//   @media (max-width: 1240px) {
//     position: absolute;
//     top: 40%;
//     left: 0;
//     right: 0;
//     margin-left: auto;
//     margin-right: auto;
//   }

//   ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {position: absolute;top: 40%;left: 0;right: 0;margin-left: auto;margin-right: auto;}'}

//   .vid-player{
//     width: 1400px;
//     height: 212px;
//     position: absolute;
//     top: 0;
//     right: 30px;

//     @media (max-width: 1240px) {
//       left: 0;
//       right: 0;
//       margin-left: auto;
//       margin-right: auto;
//     }

//     ${ ({ loggedIn }) => loggedIn && '@media (max-width: 980px) {left: 0;right: 0;margin-left: auto;margin-right: auto;}'}
//   }
// `;

// const Vidception = styled.div `
//   width: 60%;
//   height: 100%;
//   padding: 130px;
//   padding-left: 0px;
//   `;

  const TopFiller = styled.div`
  
  `;

  const BottomFiller = styled.section`
    width: 100%;
    border-top: 1px solid gray;
    postion: fixed;
    height: 45vh;
  `;

  


class NonUserLandingView extends Component {
  render() {
    return (

      <Woah loggedIn={this.props.user_id !== 0}>
      <BackgroundBox>
        <LandingText loggedIn={this.props.user_id !== 0}>
          <p className='blurb'>
            Welcome to Symposium. 
            </p>
        </LandingText>
  </BackgroundBox>
        <BottomFiller>
          <p>yeet</p>
          </BottomFiller>
      </Woah>
    )
  }
};

const mapStateToProps = state => ({
  user_id: state.users.user_id,
});

export default connect(mapStateToProps, {})(NonUserLandingView);
