import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

// components
import { PostCount, VoteCount, Deleted } from './index.js';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const TopDiscussionWrapper = styled.div`
  width: 15%;
  height: 141px;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 5px;
  padding: 10px;
  box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
  &:hover {
    background-color: ${props => props.theme.topDiscussionWrapperBgHov};
    cursor: pointer;
  }

  .title {
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    color: ${props => props.theme.topDiscussionTitleColor};
    margin-bottom: 15px;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    @media ${tabletP}{
      display: flex;
      align-items: center;
      font-size: 18px;
      @media ${phoneP}{
        display: flex;
        font-size: 18px;
      }
    }
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .timestamp{
    color: ${props => props.theme.topDiscussionCatColor};
    @media ${tabletP}{
      margin: 10px;
    }
  }
  .category {
    text-decoration: none;
    color: ${props => props.theme.topDiscussionCatColor};
    display: flex;
    position: absolute;
    bottom: 10px;
    width: 80%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    .category-title {
      margin-left: 5px;
      margin-top: 5px;
      text-decoration: none;
      font-size: .4rem;
      font-style: oblique;
      font-weight: bold;
      color: ${props => props.theme.topDiscussionCatColor};
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      @media ${tabletP}{
        margin: 10px;
        padding: 14px;
        font-size: 14px;
        @media ${phoneP}{
          font-size: 14px;
          align-items: center;
          padding: 20px;
        }
      }
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
  .nameanddate {
    text-decoration: none;
    font-size: 14px;
    font-style: italic;
    color: ${props => props.theme.topDiscussionNameDateColor};
    display: none;
    @media ${tabletP}{
      margin: 2px;
      display: flex;
      align-items: center;
      width: 20px;
      padding: 10px;
      font-size: 12px;
      @media ${phoneP}{
        display: flex;
        align-items: center;
      }
    }
    &:hover {
      text-decoration: underline;
      background-color: ${props => props.theme.topDiscussionNameDateColorHov};
      cursor: pointer;
    }
  }
  .content {
    width: 85%;
    margin: 5px;
    padding: 5px;
    text-decoration: none;
    color: ${props => props.theme.topDiscussionNameDateColor};
  }
`;

const Vote = styled.div `
display: flex;
margin-right: 10px;
display: none;
// box-shadow: ${props => props.theme.topDiscussionWrapperBxShdw};
  @media ${phoneP}{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const Contenter = styled.div `
padding: 10px;
display: none;
  @media ${phoneP}{
  display: none;
  width: 240px;
  }
`;

const VoteCounter = styled.div `
padding: 10px;
display: none;
  @media ${phoneP}{
  display: none;
  width: 240px;
  }
`;

const NameandDate = styled.div `
padding: 10px;
display: none;
  @media ${phoneP}{
  display: none;
  width: 240px;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const TopDiscussion = ({ discussion, handleDiscussionVote, history }) => {
  const {
    body,
    category_id,
    // discussion_id,
    category_name,
    created_at,
    id,
    post_count,
    title,
    user_id,
    username,
    vote_count,
    user_vote,
  } = discussion;

  const handleVote = type => handleDiscussionVote(id, type);
  const goTo = () => history.push(`/discussions/category/${category_id}`)
  return (
    <TopDiscussionWrapper onClick = {goTo}>
      <VoteCounter>
      <VoteCount
        handleVote={handleVote}
        vote_count={vote_count}
        user_vote={user_vote}
      />
      </VoteCounter>
      <div className='content'>
        <div>
          <Link to={`/discussion/${id}`} className='title'>
            {title}
          </Link>
          &#8201;
          <span className='category'>
            <span className='category-title'>
              /d/{category_name}
            </span>
          </span>
        </div>

        <NameandDate>
          {
            username ?
            <Link to={`/profile/${user_id}`} className='nameanddate'>
              {username}
            </Link> :
            <Deleted />
          }
          &#8201;
          <span className='timestamp'>
            {' '}
            - {moment(new Date(Number(created_at))).fromNow()}
          </span>
        </NameandDate>
        <Contenter>
        <Link to={`/discussion/${id}`} className='content'>{body}</Link>
        </Contenter>
        
        
      </div>
      <Vote><PostCount post_count={post_count || 0} /></Vote>
    </TopDiscussionWrapper>
  );
};

export default TopDiscussion;
