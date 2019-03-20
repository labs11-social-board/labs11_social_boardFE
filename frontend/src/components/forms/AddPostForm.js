import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import CKEditor from 'ckeditor4-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Parser from 'html-react-parser';
import { Avatar } from '../index.js';

// import { appBgColor } from '../../globals/globals.js'


// action creators
import { addPost } from '../../store/actions/index.js';

const AddPostFormWrapper = styled.form`
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

const AddCommentTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

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

	.submit-btn {
		color: steelblue;
		background: none;
		border: none;
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


// Using React Quill
// 	//    * Quill editor formats
// 	//    * See https://quilljs.com/docs/formats/
// 	//    */

// class AddPostForm extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = { postBody: '' };
// 		this.handleChange = this.handleChange.bind(this)
// 		// this.onChange = this.onChange.bind(this)
// 	}
// 	// modules = {
// 	// 	toolbar: [
// 	// 	  [{ 'header': [1, 2, false] }],
// 	// 	  ['bold', 'italic', 'underline','strike', 'blockquote'],
// 	// 	  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
// 	// 	  ['link', 'image'],
// 	// 	  ['clean']
// 	// 	],
// 	//   }

// 	//  formats = [
// 	// 	'header', 'font', 'size',
// 	// 	'bold', 'italic', 'underline', 'strike', 'blockquote',
// 	// 	'list', 'bullet', 'indent',
// 	// 	'link', 'image', 'video'
// 	//   ]

// 	//   AddPostForm.formats = [
// 	// 	'header',
// 	// 	'bold', 'italic', 'underline', 'strike', 'blockquote',
// 	// 	'list', 'bullet', 'indent',
// 	// 	'link', 'image'
// 	//   ]

// 	//   AddPostForm.modules = {
// 	// 	toolbar: [
// 	// 	  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
// 	// 	  [{size: []}],
// 	// 	  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
// 	// 	  [{'list': 'ordered'}, {'list': 'bullet'}, 
// 	// 	   {'indent': '-1'}, {'indent': '+1'}],
// 	// 	  ['link', 'image', 'video'],
// 	// 	  ['clean']
// 	// 	],
// 	// 	clipboard: {
// 	// 	  // toggle to add extra line breaks when pasting HTML:
// 	// 	  matchVisual: false,
// 	// 	}
// 	//   }
// 	//   /* 

// 	handleChange(postBody) {
// 		this.setState({ postBody})
// 	  }

// // onChange(postBody, delta, source, editor) {
// //  const text = editor.getContents(postBody);
// //   this.setState ({ postBody: text });
// // }
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		const { postBody } = this.state;
// 		const { discussion_id, historyPush } = this.props;
// 		return this.props.addPost(discussion_id, postBody, historyPush);
// 	};
// 	render() {
// 		const { postBody } = this.state;
// 		const { toggleAddPostForm } = this.props;

// 		return(
// 			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
// 				<h1>Add post form</h1>


// 				{Parser(postBody)}

// 				<ReactQuill
// 					placeholder = 'Add post...'
// 					name = 'postBody'
// 					handleChange = { this.handleChange }
// 					value = {this.state.postBody}
// 				/>

// 				<button type = 'submit'>Submit</button>
// 				{/* <div dangerouslySetInnerHTML={{__html: this.state.postBody}}></div> */}
// 				<button
// 					onClick = { toggleAddPostForm }
// 					type = 'button' // prevents form submission
// 				>Cancel</button>
// 			</AddPostFormWrapper>
// 		);
// 	}
// };

//Using CKEditor 

//Problem: outputs HTML tags
//SOlutions: Below is an HTML data Processor
// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_htmlDataProcessor.html

// class AddPostForm extends Component {
// 	constructor(props){
// 		super(props)
// 	this.state = { postBody: '' };

// 	this.handleChange = this.handleChange.bind(this)
// 	this.onEditorChange = this.onEditorChange.bind(this);
// }
// 	// handleChange = postBody => this.setState({ postBody });
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		const { postBody } = this.state;
// 		const { discussion_id, historyPush } = this.props;
// 		return this.props.addPost(discussion_id, postBody, historyPush);
// 	};
// 	onEditorChange( evt ) {
//         this.setState( {
//             postBody: evt.editor.getData()
//         } );
//     }

//     handleChange( changeEvent ) {
//         this.setState( {
//             postBody: changeEvent.target.value
//         } );
//     }


// 	render() {

// 		const { postBody } = this.state;
// 		const { toggleAddPostForm } = this.props;
// 		return(
// 			<AddPostFormWrapper >
// 				<h1>Add post form</h1>
// 				<div onSubmit = { this.handleSubmit }>
// 				<CKEditor
// 					placeholder = 'Add post...'
// 					onChange = { this.onEditorChange }
// 					postBody = {this.state.postBody}
// 				/>

// 				<button type = 'submit'>Submit</button>
// 				</div> 
// 				<button
// 					onClick = { toggleAddPostForm }
// 					type = 'button' // prevents form submission
// 				>Cancel</button>

// 		<label>
// 		Change val:
// 		<textarea defaultValue={this.state.postBody} onChange={this.handleChange} />
// 	</label>
// 	<EditorPreview postBody={this.state.postBody} />
// 		</AddPostFormWrapper>
// 		)}
// }

class AddPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		const { discussion_id, historyPush } = this.props;
		return this.props.addPost(discussion_id, postBody, historyPush);
	};
	
	render() {		
		const { postBody } = this.state;
		const { toggleAddPostForm, username, user_id, avatar } = this.props;
		return(
			<AddPostFormWrapper onSubmit = { this.handleSubmit }>
				<AddCommentTitle>
					<p>Write a comment</p>
					<span
						className = 'exit'
						onClick = { toggleAddPostForm }
						type = 'button' // prevents form submission
					><i className="far fa-times-circle"></i></span>
				</AddCommentTitle>
				<textarea
					type= 'text'
					placeholder = 'Write your comment'
					name = 'postBody'
					onChange = { this.handleChange }
					value = { postBody }
				/>
				<UserActions>
					<div className='user'>
						<Avatar height='30px' width='30px' src = { avatar } />
						<Link className='username' to={`/profile/${user_id}`}>
							{username}
						</Link>
					</div>
					<button className = 'submit-btn' type = 'submit'>Post comment</button>	
				</UserActions>
			</AddPostFormWrapper>
		);
	}
};

const mapStateToProps = state => ({
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
});

export default connect(mapStateToProps, { addPost })(AddPostForm);
