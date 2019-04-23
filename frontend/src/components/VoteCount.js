import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const VoteCountWrapper = styled.div`
	display: flex;
	margin-right: 10px;
	flex-direction: column;

	i {
		padding-left: 7px;
		padding-right: 5px;
		font-size: 20px;
		color: #D8D8D8;
	}

	.upvote {
		${ ({ user_vote }) => user_vote === 1 && 'color: blue;'}

		&:hover {
		cursor: pointer;
		color: #3898d1;
		}
	}

	.downvote {
		${ ({ user_vote }) => user_vote === -1 && 'color: red;'}

		&:hover {
		cursor: pointer;
		color: #e54340;
		}
	}
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
const VoteCount = ({
	upvotes,
	downvotes,
	handleVote,
	user_vote,
}) => {
	const handleClick = (e, type) => handleVote(e, type);
	return (
		<VoteCountWrapper user_vote={user_vote}>
			<div className='upvote' onClick={e => handleClick(e, 1)}>
				{/* <i className = 'fas fa-arrow-alt-circle-up' /> */}
				<i class="fas fa-caret-up"></i>
				{/* <span>{ upvotes || 0 }</span> */}
			</div>
			<div className='upvotes'>{upvotes || 0}</div>
			<div className='downvote' onClick={e => handleClick(e, -1)}>
				{/* <i className = 'fas fa-arrow-alt-circle-down' /> */}
				<i class="fas fa-caret-down"></i>
				{/* <span>{ downvotes || 0 }</span> */}
			</div>
		</VoteCountWrapper>
	);
};

export default VoteCount;
