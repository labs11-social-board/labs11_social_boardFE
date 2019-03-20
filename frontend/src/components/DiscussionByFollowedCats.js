import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { Avatar, VoteCount } from './index.js';

const DiscussionWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: flex-start;
	width: 98%;
	margin-bottom: 20px;
	padding: 5px;
	border-radius: 5px;

	.info-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 0.9rem;
		color: #a7a7a7;
	
		.user-info {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			width: 25%;
			margin-right: 20px;
	
			.user {
				width: fit-content;
				color: black;

				.username-wrapper {
					color: ${props => props.theme.defaultColor};

					&:hover {
						cursor: pointer;
						color: #418DCF;
					}
				}
			}
	
			@media (max-width: 530px) {
				width: 100%;
			}
		}
	
		.discussion-info {
			display: flex;
			width: 75%;
	
			.votes-wrapper {
				margin-right: 10px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
	
				i {
					padding-left: 10px;
					padding-right: 5px;
					padding-top: 2px;
				}
			}
			.breaking {
				// margin-top: 100px;
			}
	
			.category-wrapper {
				&:hover {
					color: #418DCF;
					cursor: pointer;
				}
	
				i {
					margin-left: 10px;
					margin-right: 5px;
				}
			}
	
			.date-views-comment {
				display: flex;
			}
	
			@media (max-width: 1075px) {
				justify-content: center;
	
				.desktop {
					display: none;
				}
			}
	
			@media (max-width: 970px) {
				.tablet {
					display: none;
				}
			}
	
			@media (max-width: 530px) {
				width: 100%;
				justify-content: flex-start;
				padding-top: 10px;
				margin-left: -10px;
			}
		}
	
		.fa-circle {
			font-size: 0.4rem;
			margin-top: 9px;
			margin-left: 8px;
			margin-right: 8px;
		}
	
		@media (max-width: 1075px) {
			.desktop {
				display: none;
			}
		}
	
		@media (max-width: 970px) {
			.tablet, .desktop {
				display: none;
			}
		}
	
		@media (max-width: 530px) {
			flex-wrap: wrap;
			flex-direction: column;
			align-items: flex-start;
		}
	}

	&:hover {
		${ ({ singleDiscussion, isDay }) => {
			return !singleDiscussion && (isDay ?
				'background-color: #ddd;cursor: pointer;' :
				'background-color: #ddd;cursor: pointer;color: black;'
			)
		} }

		.info-wrapper {
			${props => (!props.singleDiscussion && !props.isDay) && 'color: black;'}
		}

		.user-info {
			.user {
				.username-wrapper {
					${props => (!props.singleDiscussion && !props.isDay) && 'color: black;'}
				}
			}
		}
	}
`;

const BodyWrapper = styled.p`
	text-align: justify;
	margin-bottom: 20px;
`;

const DiscussionByFollowedCats = ({ discussion, history, voteOnDiscussion, singleDiscussion, isDay }) => {
	const {
		avatar,
		body,
		category_icon,
		category_id,
		category_name,
		created_at,
		downvotes,
		id,
		post_count,
		upvotes,
		user_vote,
		username,
		user_id,
		views,
	} = discussion;
	const handleDiscussionClick = () => history.push(`/discussion/${ id }`);
	const handleCategoryClick = e => {
		e.stopPropagation();
		return history.push(`/discussions/category/${ category_id }`);
	};
	const handleUserClick = e => {
		e.stopPropagation();
		return history.push(`/profile/${ user_id }`);
	};
	const handleVote = (e, type) => {
		e.stopPropagation();
		return voteOnDiscussion(id, type);
	};
	return(
		<DiscussionWrapper isDay = { isDay } singleDiscussion = { singleDiscussion } onClick = { handleDiscussionClick }>
			<BodyWrapper>{
				!singleDiscussion ? body.length > 183 ? body.substr(0, 183) + '...' : body : body
			}</BodyWrapper>
			<div className = 'info-wrapper'>
				<div className = 'user-info'>
					<div className = 'user' onClick = { handleUserClick }>
						<Avatar
							height = '20px'
							width = '20px'
							src = { avatar }
						/>
						&nbsp;
						<div className = 'username-wrapper'>{ username }</div>
					</div>
				</div>
				<div className = 'discussion-info'>
					<div className = 'votes-wrapper'>
						<VoteCount
							upvotes = { upvotes }
							downvotes = { downvotes }
							user_vote = { user_vote }
							handleVote = { handleVote }
						/>
					</div>
					<div className = 'category-wrapper' onClick = { handleCategoryClick }>
						<i className = { category_icon } />
						<span className = 'category-name'>{ category_name }</span>
					</div>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<div className = 'date-views-comment tablet'>
						<span>{moment(new Date(Number(created_at))).fromNow()}</span>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<span className = 'desktop'>{ views || 0 } View{ views !== 1 && 's' }</span>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<span>{ post_count } Comment{ Number(post_count) !== 1 && 's' }</span>
					</div>
				</div>
			</div>
		</DiscussionWrapper>
	);
};

const mapStateToProps = state => ({
	isDay: state.users.isDay,
});

export default connect(mapStateToProps, {})(DiscussionByFollowedCats);
