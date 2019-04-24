import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import { Avatar, VoteCount } from './index.js';

const DiscussionWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: flex-end;
	align-items: center
	width: 98%;
	height: 116px;
	// margin-bottom: 20px;
	// padding: 5px;
	border: 1px solid #EAECEF;
	border-radius: 3px;
	overflow-wrap: break-word;
	font-family: 'PT Sans';
	
	.discussion-info {
		height: 100%;
		display: flex;
		justify-content: center;
		width: 7%;
		align-items: center;
		border-right: solid 1px #D8D8D8;
		
	}

	.info {
		height: 100%;
		width: 80%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 40px;
		

		.info-div {
			margin-bottom: 5px;

			p {
				margin: 0;
				text-align: left;
			}
		}

		.user-info {
			margin-top: 5px;
			// display: flex;
			// justify-content: flex-start;
			// flex-direction: row;
			// align-items: center;
			// width: 25%;
			// height 50%;
			// margin-right: 20px;
	
	
			.user {
				width: fit-content;
				color: #8A8C90;
				display:flex;
	
				.username-wrapper {
					// color: ${props => props.theme.defaultColor};
					color: #F66042;
					margin: 0 10px;
					&:hover {
						cursor: pointer;
						color: #418DCF;
					}
				}
			}
	}
	

	.info-wrapper {
		width: 20%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 0.9rem;
		color: #a7a7a7;
	
		// .user-info {
		// 	display: flex;
		// 	justify-content: flex-start;
		// 	flex-direction: row;
		// 	align-items: center;
		// 	// width: 25%;
		// 	height 100%;
		// 	// margin-right: 20px;
	
		// 	.user {
		// 		width: fit-content;
		// 		color: black;
		// 		display:flex;
			

		// 		.username-wrapper {
		// 			color: ${props => props.theme.defaultColor};

		// 			&:hover {
		// 				cursor: pointer;
		// 				color: #418DCF;
		// 			}
		// 		}
		// 	}
	
			@media (max-width: 530px) {
				width: 100%;
			}
		}
	
		// .discussion-info {
		// 	display: flex;
		// 	width: 8%;
		// 	height: 100%;
	
		// 	.votes-wrapper {
		// 		// margin-right: 10px;
		// 		display: flex;
		// 		justify-content: flex-start;
		// 		align-items: center;
		// 		height: 100%;
	
		// 		i {
		// 			padding-left: 10px;
		// 			padding-right: 5px;
		// 			padding-top: 2px;
		// 		}
		// 	}
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
				color: #8A8C90;
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
	transition: all .2s ease-in-out;

	&:hover {
		transform: scale(1.1);
		margin-bottom: 7px;
		margin-top: 7px;
		z-index: 99;
	}}

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
	text-align: center;
	// margin-bottom: 20px;
	cursor:pointer;
	height: 100%;

	p {
		margin: 0;
	}
	

	&:hover {
		color: #418DCF;
	}
`;

const DiscussionByFollowedCats = ({ discussion, history, voteOnDiscussion, singleDiscussion, isDay, isTeam, toggleIsTeam, isShowImage, handleImageShow, imageClickedId }) => {
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
		image
	} = discussion;
	const handleDiscussionClick = () => {
		if (isTeam) {
			history.push(`/team/posts/${id}`);
			if (toggleIsTeam) {
				toggleIsTeam();
			}
		} else {
			history.push(`/discussion/${id}`);
		}
	}
	const handleCategoryClick = e => {
		e.stopPropagation();
		return history.push(`/discussions/category/${category_id}`);
	};
	const handleUserClick = e => {
		e.stopPropagation();
		return history.push(`/profile/${user_id}`);
	};
	const handleVote = (e, type) => {
		e.stopPropagation();
		return voteOnDiscussion(id, type);
	};
	return (
		<DiscussionWrapper isDay={isDay} singleDiscussion={singleDiscussion} >
			<div className='info'>
				<div className='info-div'>
					<BodyWrapper onClick={handleDiscussionClick}>{
						!singleDiscussion ? body.length > 183 ? body.substr(0, 183) + '...' : body : body
					}</BodyWrapper>
					{image ?
						<div className='show-image-wrapper'>
							<a href='# ' className='show-image' onClick={() => handleImageShow(id)}><i className="fas fa-camera"></i>{isShowImage ? id === imageClickedId ? '-' : '+' : '+'}</a>
							{isShowImage ? id === imageClickedId ? <img src={image} alt="uploaded" /> : null : null}
						</div> : null}
					{/* <div className='user-info'>
					<div className='user' onClick={handleUserClick}>
						<Avatar
							height='20px'
							width='20px'
							src={avatar}
						/>
						&nbsp;
						<div className='username-wrapper'>{username}</div>
					</div> */}
				</div>
				{/* <div className='info-wrapper'> */}
				<div className='user-info'>
					<div className='user' onClick={handleUserClick}>
						<Avatar
							height='20px'
							width='20px'
							src={avatar}
						/>
						<div className='username-wrapper'>{username}</div>
						<div className='date-views-comment tablet'>
							<span>{moment(new Date(Number(created_at))).fromNow()}</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
					</div>
					</div>
				</div>
			</div>

			<div className='discussion-info'>
				<div className='votes-wrapper'>
					<VoteCount
						upvotes={upvotes}
						downvotes={downvotes}
						user_vote={user_vote}
						handleVote={handleVote}
					/>
				</div>
			</div>


			{/* <div className = 'category-wrapper' onClick = { handleCategoryClick }>
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
					</div> */}
			{/* </div> */}
			{/* </div> */}
		</DiscussionWrapper>
	);
};

const mapStateToProps = state => ({
	isDay: state.users.isDay,
});

export default connect(mapStateToProps, {})(DiscussionByFollowedCats);
