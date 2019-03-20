import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '../index.js';

// action creators
import { addReply } from '../../store/actions/index.js';

//Style
const AddReplyFormWrapper = styled.form`
	width: 80%;
	padding: 10px;
	color: ${props => props.theme.discussionPostColor};

	textarea {
		width: 100%;
		height: 150px;
		padding: 12px 20px;
		box-sizing: border-box;
		border: 1px solid #ddd;
		border-radius: 4px;
		background-color: #f8f8f8;
		resize: none;
	}
`;

const AddReplyTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 15px;
	p {
		margin-top:0
	}

	.exit{
		
		&:hover {
			cursor: pointer;
			color: steelblue;
		}
	}
`;

const UserActions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	button {
		color: steelblue;
		background: none;
		border:none;
		outline: none;
		
		&:hover {
			cursor: pointer;
			color: black;
		}
	}

	.user {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.username {
		margin-left: 10px;
		color: black;
		text-decoration: none;
	}
`;

// //Original AddReplyForm

// // components
// import { Quote } from '../index.js';

// const AddReplyFormWrapper = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	background-color: ${props => props.theme.errorWrapperBgColor};
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	height: 100vh;
// 	width: 100vw;
// 	overflow: auto;
// 	z-index: 2;
// `;

// const AddReplyFormBox = styled.form`
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	flex-wrap: wrap;
// 	flex-direction: column;
// 	background-color: ${props => props.theme.errorBoxBgColor};
// 	padding: 10px;
// 	border-radius: 5px;
// 	border: 1px solid black;
// 	max-width: 90%;
// `;

// class AddReplyForm extends Component {
// 	state = {
// 		repliedPost: this.props.repliedPost,
// 		postBody: '',
// 	};
// 	handleChange = e => this.setState({ [e.target.name]: e.target.value });
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		const { repliedPost, postBody } = this.state;
// 		const { discussion_id, historyPush, addPost } = this.props;
// 		return addPost(discussion_id, postBody, historyPush, repliedPost.id);
// 	};
// 	handleToggle = () => this.props.toggleAddReplyForm();
// 	render() {
// 		const {
// 			repliedPost,
// 			postBody,
// 		} = this.state;
// 		return(
// 			<AddReplyFormWrapper>
// 				<AddReplyFormBox onSubmit = { this.handleSubmit }>
// 					<Quote reply_to = { repliedPost } />
// 					<h1>Add Reply</h1>

// 					<input
// 						placeholder = 'Add reply...'
// 						name = 'postBody'
// 						onChange = { this.handleChange }
// 						value = { postBody }
// 					/>

// 					<button type = 'submit'>Submit</button>

// 					<button
// 						onClick = { this.handleToggle }
// 						type = 'button' // prevents form submission
// 					>Cancel</button>
// 				</AddReplyFormBox>
// 			</AddReplyFormWrapper>
// 		);
// 	}
// };

class AddReplyForm extends Component {
	state = { replyBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { replyBody } = this.state;
		const { post_id, historyPush, discussion_id } = this.props;
		return this.props.addReply(post_id, discussion_id, replyBody, historyPush);
	};
	handleToggle = () => this.props.toggleAddReplyForm();
	render() {
		const { replyBody } = this.state;
		const{ username, user_id, avatar } = this.props;
		return(
			<AddReplyFormWrapper onSubmit = { this.handleSubmit } >
				<AddReplyTitle>
					<p>Write a Reply</p>
					<span
						className = 'exit'
						onClick = { this.handleToggle }
						type = 'button' // prevents form submission
					><i className="far fa-times-circle"></i></span>
				</AddReplyTitle>
				<textarea
					type= 'text'
					placeholder = 'Write your reply'
					name = 'replyBody'
					onChange = { this.handleChange }
					value = { replyBody }
				/>
				<UserActions>
					<div className='user'>
						<Avatar height='30px' width='30px' src = { avatar } />
						<Link className='username' to={`/profile/${user_id}`}>
							{username}
						</Link>
					</div>
					<button type = 'submit'>Post Reply</button>	
				</UserActions>
			</AddReplyFormWrapper>
		)
	}
}


const mapStateToProps = state => ({
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
});

export default connect(mapStateToProps, { addReply })(AddReplyForm);
