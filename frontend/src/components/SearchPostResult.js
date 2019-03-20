import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// globals
import { searchCharLimit } from '../globals/globals.js';

// components
import { Highlight } from './index.js';

const SearchPostResultWrapper = styled.div`
	border: 1px solid #ddd;
	border-radius: 5px;
	margin: 10px;
	padding-left: 10px;
	padding-right: 10px;
	font-size: 0.9rem;

	&:hover {
		cursor: pointer;
		background-color: #ccc;
		color: black;

		.created {
			color: black;
		}
	}

	.post-body-wrapper {
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			margin-top: 19px;
			margin-right: 10px;
		}
	}

	.created {
		margin: 0;
		color: #aaa;
		font-size: .7rem;
		text-align: center;
		margin-bottom: 5px;
	}
`;

const SearchPostResult = ({ post, goTo, searchText, scrollTo, pathname }) => {
  const {
    id,
    discussion_id,
    body,
    created_at,
    // votes,
    // user_id,
    // username,
    // discussion_body,
    // category_id,
    // category_name,
  } = post;
  const handlePostBodyClick = () => goTo(`/discussion/${discussion_id}#${id}`).then(() => {
    if (parseInt(pathname.slice(pathname.lastIndexOf('/') + 1)) === discussion_id) {
      return scrollTo(id);
    }
  });
  searchText = searchText.toLowerCase();
  const lowerCaseBody = body.toLowerCase();
  return (
    <SearchPostResultWrapper>
      <p className='post-body-wrapper' onClick={handlePostBodyClick}>
        {
          // if the portion after the searchText is longer than or equal to
          // the portion before it, render this portion
          body.substr(lowerCaseBody.indexOf(searchText)).length >= body.substr(0, lowerCaseBody.indexOf(searchText)).length ?
            <>
              {
                // if searchText is not at the beginning,
                // place an ellipsis at the beginning
                lowerCaseBody.indexOf(searchText) === 0 ? '' : '... '
              }
              <Highlight
                // highlight the searchText
                text={body.substr(lowerCaseBody.indexOf(searchText)).slice(0, searchText.length)}
              />
              {
                // render a substring of all the chars to the right
                // of the searchText, up to a limit.
                // if the length exceeds limit, include an ellipsis at the end.
                body.substr(lowerCaseBody.indexOf(searchText) + searchText.length, searchCharLimit) + (body.substr(lowerCaseBody.indexOf(searchText)).length > searchCharLimit ? ' ...' : '')
              }
            </>
            :
            // else if the portion before the searchText is longer, render this portion
            <>
              {
                // render a substring of all the chars to the left
                // of the searchText, up to a limit,
                // starting at the searchText and going left.
                // if the length exceeds limit, include an ellipsis at the beginning.
                (body.substring(0, lowerCaseBody.indexOf(searchText)).length > searchCharLimit ? '... ' : '') + body.substring(0, lowerCaseBody.indexOf(searchText)).slice(-searchCharLimit)
              }
              <Highlight
                // highlight the searchText
                text={body.substr(lowerCaseBody.indexOf(searchText)).slice(0, searchText.length)}
              />
              {
                // if searchText is not at the end, place an ellipsis at the end
                lowerCaseBody.indexOf(searchText) + searchText.length >= body.length ? '' : ' ...'
              }
            </>
        }
      </p>
      <p className='created'>Created {moment(new Date(Number(created_at))).fromNow()}</p>
    </SearchPostResultWrapper>
  );
};

export default SearchPostResult;
