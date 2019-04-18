import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar } from '../index.js';

// globals
import { phoneP } from '../../globals/globals.js';
// action creators
import { addReply, uploadImage, updateReplyWithImage, removeUpload, resetImageState, displayMessage } from '../../store/actions/index.js';

// components 
import { UploadImage } from '../index.js';

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

	@media ${phoneP}{
    flex-direction: column;
    height: 18vh;

    input[type=file] {
      margin-left: 25%;
    }
	}
	
	.drag-zone-wrapper{
		bottom: 4.9%;
    height: 3.4vh;
    position: relative;
		right: 50%;
		
		@media(max-width:1440px){
			height: 4vh;
		}

		@media ${phoneP}{
			display:none;
		}

		.drag-zone {
			top:21%;
		}
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
	state = { replyBody: '', name: '', isUploading: false };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { replyBody } = this.state;
		const { post_id, team_id, handleFilterChange, handleTeamFilter, toggleAddReplyForm, updateReplyWithImage, image, displayMessage } = this.props;
		this.props.handleisVoting();
		if(replyBody.length > 0){
			this.props.addReply(post_id, team_id, replyBody).then((res) => {
				if(image){
					updateReplyWithImage(image, res.payload[0]);
					this.props.resetImageState();
				 }
			});
		} else if(!replyBody && image){
			this.props.addReply(post_id, team_id, replyBody).then((res) => {
				if(image){
					updateReplyWithImage(image, res.payload[0]);
					this.props.resetImageState();
				 }
			});
		} else {
			displayMessage('Please enter a message or upload an image');
		}

		if(team_id){
      toggleAddReplyForm();
      setTimeout(() => handleTeamFilter(), 200);
    	} else {
			toggleAddReplyForm();
			setTimeout(() => handleFilterChange(), 200);
		}
	};
	handleFileChange = e => {
		if (e.target.files.length) {
      const { name } = e.target.files[0];
			return this.setState({ name });
		}
		return this.setState({ name: '' });
  };
  handleExit = e => {
    e.preventDefault();
    this.props.toggleAddReplyForm();
    if(this.props.image){
			this.props.removeUpload(this.props.image);
			this.props.resetImageState();
		}
	}
	componentDidUpdate = prevProps => {
		if(this.props.isUploadingImage && !this.state.isUploading){
			this.setState({ isUploading: true }, () => {
				this.props.displayMessage('Uploading Image...')
			})
		} else if(this.state.isUploading && !this.props.isUploadingImage){
			this.setState({ isUploading: false }, () => {
				this.props.displayMessage('Image Uploaded!').then(() => {
					setTimeout(() => this.props.displayMessage(''), 200);
				})
			})
		}
	}
	render() {
		const { replyBody } = this.state;
		const{ username, user_id, avatar } = this.props;
		return(
			<AddReplyFormWrapper onSubmit = { this.handleSubmit } >
				<AddReplyTitle>
					<p>Write a Reply</p>
					<span
						className = 'exit'
						onClick = { this.handleExit }
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
					<UploadImage />
				</UserActions>
			</AddReplyFormWrapper>
		)
	}
}


const mapStateToProps = state => ({
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
	image: state.posts.images.id,
	isUploadingImage: state.posts.isUploadingImage
});

export default connect(mapStateToProps, { addReply, uploadImage, updateReplyWithImage, removeUpload, resetImageState, displayMessage })(AddReplyForm);
