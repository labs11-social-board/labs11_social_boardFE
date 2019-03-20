import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// globals
import { searchCharLimit } from '../globals/globals.js';

// components
import { Highlight } from './index.js';

const SearchDisResultWrapper = styled.div`
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

	.discussion-wrapper {
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

const SearchDisResult = ({ discussion, goTo, searchText }) => {
  const {
    id,
    body,
    // user_id,
    // username,
    created_at,
    // votes,
    // category_id,
    // category_name,
  } = discussion;
  const handleDiscussionClick = () => goTo(`/discussion/${id}`);
  searchText = searchText.toLowerCase();
  const lowerCaseBody = body.toLowerCase();
  return (
    <SearchDisResultWrapper>
      <div className='discussion-wrapper' onClick={handleDiscussionClick}>
        {
          // if it includes the searchText
          lowerCaseBody.includes(searchText) ?
            (
              <p>
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
            ) :
            (
              <p>
                {
                  // else if it doesnt include the searchText and is longer than limit,
                  // slice first chars up to limit, and include an ellipsis at the end.
                  // else if shorter than limit, render the entirety of it
                  body.length > searchCharLimit ?
                    body.slice(0, searchCharLimit) + ' ...' : body
                }
              </p>
            )
        }
      </div>
      <p className='created'>Created {moment(new Date(Number(created_at))).fromNow()}</p>
    </SearchDisResultWrapper>
  );
};

export default SearchDisResult;
