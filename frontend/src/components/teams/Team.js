import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { FollowCat } from '../index.js';

// Globals
// import { tabletL } from '../../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  border-radius: 5px;
  padding: 5px;

  &:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .black-on-hover {
      color: rgb(150,150,150);
    }
  }
`;

const DivIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  margin: 15px;

  i {
    display: block;
    font-size: 26px;
  }

  img {
    display: block;
    max-width: 38px;
    max-height: 38px;
  }
`;

const DivTeamContainer = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 910px) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 775px) {
    width: 100%;
  }
`;

const DivTeam = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .Team-name-follow-wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: 480px) {
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      * {
        width: 90%;
      }
    }
  }

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 910px) {
    width: 100%;
  }
`;

const SpanTeam = styled.span`
  display: inline-block;
  align-self: flex-start;
  text-decoration: none;
  padding: 7px 15px 10px 0;
  font-size: 22px;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
  }
`;

const DivTeamInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  color: #aaa;

  p {
    font-size: 11px;
    margin: 0 0 15px 0;

    &:not(:last-child) {
      margin-right: 15px;
    }

    span {
      color: rgb(150,150,150);
    }
  }

  .moderator-wrapper {
    @media (max-width: 1060px) {
      display: none;
    }

    .moderator {
      display: inline-block;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.defaultColorOnHover};
      }
    }
  }

  .latest {
    &:hover {
      color: ${props => props.theme.defaultColorOnHover};
    }
  }

  @media (max-width: 910px) {
    .latest-wrapper {
      display: none;
    }
  }

  @media (max-width: 580px) {
    display: none;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const Team = ({ team, history }) => {
  const { id, team_name, created_at, wiki } = team;
  // const latestPostBodyElipsis = (latest_post_body) ? `${latest_post_body.slice(0, 25)}...` : 'none';
  const goToTeam = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    // history.push(`/discussions/Team/${id}`);
  }
  // const profileSuperModerator = (ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   history.push(`/profile/${user_id}`);
  // }
  // const lastPost = (ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   history.push(`/discussion/${latest_post_discussion_id}`);
  // }
  const stopPropagation = e => e.stopPropagation();
  return (
    <DivRow onClick={() => history.push(`/discussions/Team/${id}`)}>
      <DivTeamContainer>
        {/* <DivIcon>
          {(Team.icon) ? <i className={Team.icon} /> : <img src={require('../../assets/img/TeamBook2.png')} alt='Emoji' />}
        </DivIcon> */}
        <DivTeam>
          <div className = 'Team-name-follow-wrapper' onClick = {stopPropagation}>
            <SpanTeam className='link' onClick={(ev) => goToTeam(ev)}>{team_name}</SpanTeam>
            {/* <FollowCat
              Team_id={Team.id}
              historyPush={history.push}
              onCategoriesPage={true}
            /> */}
          </div>
          <DivTeamInfo>
            <p><span>Created:</span>&nbsp;{moment(new Date(Number(created_at))).fromNow()}</p>
            {/* <p><span>Discussions:</span>&nbsp;{discussion_count || 0}</p> */}
            {/* {(post_count) ? <p><span>Posts:</span>&nbsp;{post_count}</p> : <p><span>Posts:</span>&nbsp;0</p>} */}
            {/* <p className = 'moderator-wrapper'><span>Moderator:</span>&nbsp;<span className = 'moderator black-on-hover' onClick={(ev) => profileSuperModerator(ev)}>{user_username}</span></p> */}
            {/* {(latest_post_body) ? <p className = 'latest-wrapper'><span>Latest post:</span>&nbsp;(<span className='span-moment'>{moment(new Date(Number(latest_post_created_at))).fromNow()}</span>)&nbsp;<span className = 'latest black-on-hover' onClick={(ev) => lastPost(ev)}>{latestPostBodyElipsis}</span></p> : <p className = 'latest-wrapper'><span>Latest post:</span>&nbsp;None</p>} */}
          </DivTeamInfo>
        </DivTeam>
      </DivTeamContainer>
    </DivRow>
  );
}

export default Team;