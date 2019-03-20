import React from 'react';
import styled from 'styled-components';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const VoteCountWrapper = styled.div`
	display: flex;
	margin-right: 10px;

	i {
		padding-left: 10px;
		padding-right: 5px;
	}

	.upvote {
		${ ({ user_vote }) => user_vote === 1 && 'color: blue;' }

		&:hover {
		cursor: pointer;
		color: #3898d1;
		}
	}

	.downvote {
		${ ({ user_vote }) => user_vote === -1 && 'color: red;' }

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
		<VoteCountWrapper user_vote = { user_vote }>
			<div className = 'upvote' onClick = { e => handleClick(e, 1) }>
				<i className = 'fas fa-arrow-alt-circle-up' />
				<span>{ upvotes || 0 }</span>
			</div>
			<div className = 'downvote' onClick = { e => handleClick(e, -1) }>
				<i className = 'fas fa-arrow-alt-circle-down' />
				<span>{ downvotes || 0 }</span>
			</div>
		</VoteCountWrapper>
	);
};

export default VoteCount;
