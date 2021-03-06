import React from "react";
import styled from "styled-components";

// components
import { Highlight } from "./index.js";

const SearchUserResultWrapper = styled.div`
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

  .user-wrapper {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;

    i {
      margin-top: 19px;
      margin-right: 10px;
    }
  }

  .created {
    margin: 0;
    color: #aaa;
    font-size: 0.7rem;
    text-align: center;
    margin-bottom: 5px;
  }

  
`;

const SearchUserResults = ({ user, id, searchText, goTo }) => {
  const handleUserClick = () => goTo(`/profile/${id}`);
  searchText = searchText.toLowerCase();
  const username = user.toLowerCase();
  return (
    <SearchUserResultWrapper onClick={handleUserClick}>
      <div className="user-wrapper">
        {// if it includes the searchText
        username.includes(searchText) ? (
          <p>
            <Highlight
              //highlight the searchText
              text={user
                .substr(username.indexOf(searchText))
                .slice(0, searchText.length)}
            />
            {// render a substring of all the chars to the right of the searchText
            user.substr(username.indexOf(searchText) + searchText.length)}
          </p>
        ) : (
          <p>{username}</p>
        )}
      </div>
    </SearchUserResultWrapper>
  );
};

export default SearchUserResults;
