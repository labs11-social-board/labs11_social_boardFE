import React, { Component } from 'react'; 
import axios from 'axios'; 
import { connect } from 'react-redux';
import styled from 'styled-components'; 

//assets 
import { spinner2 } from '../assets/index.js';

//action creators 
import { getUsers, displayError } from '../store/actions/index.js'; 

/*Styled Components*/

const SearchBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	border-radius: 35px;
	position: relative;

	input {
		background-color: #F7F9FC;
		border-radius: 35px;

		&:focus {
			outline: none;
		}
	}

	.search-by-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;

		/* The container */
		.container {
			display: inline-block;
			position: relative;
			padding: 5px;
			padding-left: 25px;
			margin: 4px;
			cursor: pointer;
			font-size: 12px;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}

		/* Hide the browser's default radio button */
		.container input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
		}

		/* Create a custom radio button */
		.checkmark {
			position: absolute;
			bottom: 5px;
			left: 0;
			height: 15px;
			width: 15px;
			background-color: #eee;
			border-radius: 50%;
			margin-top: 12px;
			margin-left: 5px;
		}

		/* On mouse-over, add a grey background color */
		.container:hover input ~ .checkmark {
			background-color: #ccc;
		}

		/* When the radio button is checked, add a blue background */
		.container input:checked ~ .checkmark {
			background-color: #2196F3;
		}

		/* Create the indicator (the dot/circle - hidden when not checked) */
		.checkmark:after {
			content: "";
			position: absolute;
			display: none;
		}

		/* Show the indicator (dot/circle) when checked */
		.container input:checked ~ .checkmark:after {
			display: block;
		}

		/* Style the indicator (dot/circle) */
		.container .checkmark:after {
			top: 4px;
			left: 4px;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: white;
		}
	}

	.order-type-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;

		.filter-wrapper {
			i {
				margin-right: 5px;
				color: ${props => props.theme.discussionPostColor};
			}
			.filter-by{
				color: ${props => props.theme.discussionPostColor};
			}
		
			.filter {
				border: none;
				background-color: rgba(0, 0, 0, 0);
				padding: 6px;
				border-radius: 5px;
				color: ${props => props.theme.discussionPostColor};
				option {
					color: black;
				  }
				&:focus {
				outline: none;
				}
			}
		}
	}

	.search-input-wrapper {
		position: relative;
		border: none;
		width: 100%;

		.fa-search {
			color: #ACB1BC;
			position: absolute;
			top: 7px;
			left: 10px;
		}

		.search-input {
			width: 80%;
			border: none;
			border-radius: 55px;
			padding: 5px 10px;
			font-size: 14px;
			text-indent: 27px;
				::placeholder {
					color: #BABEC8;
				}
		}
	}

	.search-results-wrapper {
		max-height: 80vh;
		overflow: auto;
		position: absolute;
		right: -50px;
		top: 44px;
		z-index: 9001;
		border-radius: 5px;
		background-color: ${props => props.theme.appBgColor};
		color: ${props => props.theme.defaultColor};
		width: 375px;
		border: 1px solid #ddd;
		padding: 10px;

		@media (max-width: 1000px) {
			right: -93px;
		}

		@media (max-width: 450px) {
			right: 0;
			left: -186px;
		}

		.results-length {
			text-align: center;
		}
	}
`;

//constants 
const all = "all"; 
const byUsername = "username";
const byEmail = "email";


class UserSearch extends Component {
    state = {
        searchText: "",
        searchResults: [],
        loading: false,
        searchBy: all,
    }

    goTo = async url => {
        await this.props.goTo(url);
    }

    searchUsers = () => {

    }

    handleInputChange = () => {

    }

    render() {
        const { showSearch, pathname, scrollTo } = this.props;
        const {searchBy, searchText, searchResults, loading} = this.state;  
        <SearchBox>
            <div className="search-input-wrapper">
              <span className="fa fa-search"></span>
                <input 
                  type="text"
                  name = "searchText"
                  className = "search-input"
                  value = { searchText }
                  onChange = {this.handleInputChange}
                  placeHolder = "Find Friend"
                  />
            </div>
            {(showSearch && searchText > 0) && 
             <div className="search-results-w">
               <div className="search-by-wrapper">
                 <label className="container">All
                    <input
                      type = "radio"
                      checked = { searchBy === all}
                      name = "searchBy"
                      value = {  all }
                      onChange = {this.handleInputChange}
                    />
                    <span className="checkmark"></span>
                 </label>
                 <label className="container">Username
                   <input 
                     type = "radio"
                     checked = { searchBy === byUsername}
                     name = "searchBy"
                     value = { byUsername }
                     onChange = { this.handleInputChange }
                   />
                   <span className="checkmark"></span>
                 </label>
                 <label className="container">
                   <input 
                     type="radio"
                     checked = { searchBy === byEmail}
                     name = "searchBy"
                     value = { byEmail }
                     onChange = { this.handleInputChange }
                    />
                   <span className="checkmark"></span>
                 </label>

               </div>
             </div>
            }
        </SearchBox>
    }
}