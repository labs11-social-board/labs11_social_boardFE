import React from 'react';
import styled from 'styled-components';
import TextLoop from 'react-text-loop';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { TopDiscussions } from '../components/index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionsViewWrapper = styled.div`
  border: 0px solid black;
  padding: 5px;
  box-shadow: gray 0px 0px;
  hr {
    border-color: gray;
    margin-top: -10px;
    margin-bottom: 20px;
  }
`;

// const TopDiscussionsImage = styled.img`
//   src: url(${props => props.src});
//   display: flex;
//   height: 120px;
//   width: 120px;
// `;

const TopDiscussionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;

  .logotopd {
    display: flex;
  }

  .x0 {
    width: 400px;
    display: flex;
    justify-content: flex-end;
    font-size: 30px;
    padding-right: 10px;
  }
`;

const TopDiscussionsTitle = styled.div`
  display: flex;
  align-self: center;
  font-size: 18px;
  margin-left: 25px;
  color: ${props => props.theme.topDiscussionTitleColor};
  .toptitle{
    @media ${tabletP}{
    
      @media ${phoneP}{
        display: flex;
        align-content: center;
        font-size: px;
      }
    }

  }
  
`;

const TextLooper = styled.div`
  display: flex;
  align-self: center;
  font-size: 24px;
  margin-left: 2%;
  color: ${props => props.theme.topDiscussionTitleColor};
  @media (max-width: 768px){
    display: none;
  }
  .looptext {
    font-size: 22px;
  }
`;



/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussionsView = props => {
  return (
    <TopDiscussionsViewWrapper>
      <TopDiscussionsHeader>
        <div className='logotopd'>
          {/* <TopDiscussionsImage src={Discuss} alt='Top discussions' /> */}
          <TopDiscussionsTitle>
            <h1 className ='toptitle'>Top Discussions</h1>
          </TopDiscussionsTitle>
        </div>
        <TextLooper>
          <TextLoop className = 'looptext'>
            <span className = 'looptext'>See what's being discussed</span>
            <span className = 'looptext'>Find your interests</span>
            <span className = 'looptext'>Start talking!</span>
          </TextLoop>{' '}
        </TextLooper>
      </TopDiscussionsHeader>
      <hr />
      <TopDiscussions history={props.history}/>
    </TopDiscussionsViewWrapper>
  );
};

export default TopDiscussionsView;
