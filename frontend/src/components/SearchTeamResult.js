import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

// components
import { Highlight } from './index.js';

const SearchCatResultWrapper = styled.div`
	border: 1px solid #ddd;
	border-radius: 5px;
	margin: 10px;
	padding-left: 10px;
	padding-right: 10px;

	&:hover {
		cursor: pointer;
		background-color: #ccc;
		color: black;

		.created {
			color: black;
		}
	}

	.category-wrapper {
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

const SearchTeamResult = ({ team, goTo, searchText }) => {
  const {
    id,
    team_name,
    // user_id,
    // username,
    created_at,
  } = team;
  const handleCategoryClick = () => goTo(`/team/discussions/${id}`);
  searchText = searchText.toLowerCase();
  const lowerCaseName = team_name.toLowerCase();
  return (
    <SearchCatResultWrapper onClick={handleCategoryClick}>
      <div className='category-wrapper'>
        {/* <i className={icon} /> */}
        {
          // if it includes the searchText
          lowerCaseName.includes(searchText) ?
            (
              <p>
                {
                  // render a substring of all the chars to the left of the searchText
                  team_name.substr(0, lowerCaseName.indexOf(searchText))
                }
                <Highlight
                  // highlight the searchText
                  text={team_name.substr(lowerCaseName.indexOf(searchText)).slice(0, searchText.length)}
                />
                {
                  // render a substring of all the chars to the right of the searchText
                  team_name.substr(lowerCaseName.indexOf(searchText) + searchText.length)
                }
              </p>
            ) :
            (
              // else if it doesnt include the searchText, render the entirety of it
              <p>{team_name}</p>
            )
        }
      </div>
      <p className='created'>Created {moment(new Date(created_at)).fromNow()}</p>
    </SearchCatResultWrapper>
  );
};

export default SearchTeamResult;
