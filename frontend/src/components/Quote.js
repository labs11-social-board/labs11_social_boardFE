import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// components
import { Deleted } from './index.js';

const QuoteWrapper = styled.div`
	background-color: #d3d3d3;
	margin: 10px;
	padding: 5px;
	position: relative;

	.fa-quote-right {
		position: absolute;
		bottom: 5px;
		right: 5px;
	}
`;

const PostedBy = styled.div`
	display: flex;
	width: 250px;
	padding: 10px;

	.username {
	margin: 0px 7px;
	font-weight: bold;
	color: ${props => props.theme.postPostedByUsernameColor};
	text-decoration: none;

		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}
`;

const Elip = styled.div `
	display: inline;
	-webkit-line-clamp: 3;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	padding: 10px;
`;

const Quote = ({ reply_to }) => {
	const {
		// id,
		user_id,
		username,
		body,
		created_at,
		last_edited_at,
	} = reply_to;
	return(
		<QuoteWrapper>
			<i className = 'fas fa-quote-left' />
			<PostedBy>
				Posted by: &nbsp;
				{
					username ?
					<Link className='username' to={`/profile/${user_id}`}>
						{username}
					</Link> :
					<Deleted />
				}
				{ moment(new Date(Number(created_at))).fromNow() }
			</PostedBy>
			<Elip>{body}</Elip>
			{ last_edited_at && <p>LAST EDIT: {moment(new Date(Number(last_edited_at))).fromNow()}</p> }
			<i className = 'fas fa-quote-right' />
		</QuoteWrapper>
	);
};

export default Quote;
