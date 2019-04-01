import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// globals
import { backendUrl } from '../globals/globals.js';

// assets
import { spinner2 } from '../assets/index.js';

// components
import { SearchCatResult, SearchDisResult, SearchPostResult } from './index.js';

// action creators
import { getCategories, displayError } from '../store/actions/index.js';

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
		width: 350px;
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

// constants
const categories = 'categories';
const posts = 'posts';
const comments = 'comments';
const all = 'all';
const created_at = 'created_at';
const votes = 'votes';
const name = 'name';
const desc = 'desc';
const asc = 'asc';
const newest = 'newest';
const oldest = 'oldest';

class Search extends Component {
	state = {
		searchBy: all,
		searchText: '',
		searchResults: [],
		loading: false,
		order: created_at, // created_at or (votes or name)
		orderType: desc, // asc or desc
	};
	goTo = async url => {
		await this.props.goTo(url);
		return this.setState({ searchText: '' });
	};
	searchCategories = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/categories/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.then(() => !this.props.showSearch && this.props.toggleSearch())
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchDiscussions = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/discussions/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.then(() => !this.props.showSearch && this.props.toggleSearch())
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchPosts = () => {
		const { displayError } = this.props;
		const { searchText, order, orderType } = this.state;
		const headers = { headers: { searchText, order, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/posts/search`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.then(() => !this.props.showSearch && this.props.toggleSearch())
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	searchAll = () => {
		const { displayError } = this.props;
		const { searchText, orderType } = this.state;
		const headers = { headers: { searchText, orderType } };
		return this.setState({ loading: true }, () => {
			return axios.get(`${ backendUrl }/users/search-all`, headers)
				.then(res => this.setState({ searchResults: res.data }))
				.then(() => this.setState({ loading: false }))
				.then(() => !this.props.showSearch && this.props.toggleSearch())
				.catch(err => {
					const errMsg = err.response ? err.response.data.error : err.toString();
					return displayError(errMsg).then(() => this.setState({ loading: false }));
				});
		});
	};
	handleSearch = () => {
		const { searchBy } = this.state;
		switch(searchBy) {
			case categories:
				return this.searchCategories();
			case posts:
				return this.searchDiscussions();
			case comments:
				return this.searchPosts();
			case all:
				return this.searchAll();
			default:
				return;
		};
	};
	handleSelectChange = e => {
		switch(e.target.value) {
			case newest:
				return this.setState({ order: created_at, orderType: desc }, () => {
					return this.handleSearch();
				});
			case oldest:
				return this.setState({ order: created_at, orderType: asc }, () => {
					return this.handleSearch();
				});
			default:
				return;
		};
	};
	handleInputChange = e => {
		return this.setState({ [e.target.name]: e.target.value, searchResults: [] }, () => {
			const { searchBy, order } = this.state;
			if (searchBy === categories && order === votes) {
				return this.setState({ order: name }, () => this.handleSearch());
			}
			if (searchBy !== categories && order === name) {
				return this.setState({ order: votes }, () => this.handleSearch());
			}
			if (searchBy === all && order !== created_at) {
				return this.setState({ order: created_at }, () => this.handleSearch());
			}
			return this.handleSearch();
		});
	};
	render() {
		const { searchBy, searchText, searchResults, loading } = this.state;
		const { showSearch, pathname, scrollTo } = this.props;
		return(
			<SearchBox>
				<div className = 'search-input-wrapper'>
				<span className = 'fa fa-search'></span>
					<input
						type = 'text'
						name = 'searchText'
						className = 'search-input'
						value = { searchText }
						onChange = { this.handleInputChange }
						placeholder = 'Search'
					/>
				</div>

				{ (showSearch && searchText.length > 0) &&
				<div className = 'search-results-wrapper'>

					<div className = 'search-by-wrapper'>
						<label className = 'container'>All
							<input
								type = 'radio'
								checked = { searchBy === all }
								name = 'searchBy'
								value = { all }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>

						<label className = 'container'>Categories
							<input
								type = 'radio'
								checked = { searchBy === categories }
								name = 'searchBy'
								value = { categories }
								onChange = { this.handleInputChange }
							/>
							<span className = 'checkmark' />
						</label>

						<label className = 'container'>Posts
							<input
								type = 'radio'
								checked = { searchBy === posts }
								name = 'searchBy'
								value = { posts }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>

						<label className = 'container'>Comments
							<input
								type = 'radio'
								checked = { searchBy === comments }
								name = 'searchBy'
								value = { comments }
								onChange = { this.handleInputChange }
							/>
							<span className ='checkmark' />
						</label>
					</div>

					<div className = 'order-type-wrapper'>
						<div className='filter-wrapper'>
							<i className='fab fa-mix' />
							<span className = 'filter-by'>Filter by &nbsp;</span>
							<select
								className='filter'
								onChange={this.handleSelectChange}
								name='filter'
							>
								<option value={newest}>{newest}</option>
								<option value={oldest}>{oldest}</option>
							</select>
						</div>
					</div>
					<p
						className = 'results-length'
					>{ searchResults.length } result{ searchResults.length > 1 && 's' }</p>
					<div className = 'results'>
						{
							loading ?
							<img src = { spinner2 } alt = 'spinner' /> :
							searchResults.length ?
							searchResults.map((result, i) => {
								if (searchBy === categories) {
									return <SearchCatResult
										key = { i }
										category = { result }
										goTo = { this.goTo }
										searchText = { searchText }
									/>
								}
								if (searchBy === posts) {
									return <SearchDisResult
										key = { i }
										discussion = { result }
										goTo = { this.goTo }
										searchText = { searchText }
									/>
								}
								if (searchBy === comments) {
									return <SearchPostResult
										key = { i }
										post = { result }
										goTo = { this.goTo }
										searchText = { searchText }
										scrollTo = { scrollTo }
										pathname = { pathname }
									/>
								}
								if (searchBy === all) {
									if (result.type === 'category') {
										return(
											<SearchCatResult
												key = { i }
												category = { result.result }
												goTo = { this.goTo }
												searchText = { searchText }
											/>
										);
									}
									if (result.type === 'discussion') {
										return <SearchDisResult
											key = { i }
											discussion = { result.result }
											goTo = { this.goTo }
											searchText = { searchText }
										/>
									}
									if (result.type === 'comment') {
										return <SearchPostResult
											key = { i }
											post = { result.result }
											goTo = { this.goTo }
											searchText = { searchText }
											scrollTo = { scrollTo }
											pathname = { pathname }
										/>
									}
								}
								return null;
							}) :
							null
						}
					</div>
				</div>}
			</SearchBox>
		);
	}
};

export default connect(null, { getCategories, displayError })(Search);
