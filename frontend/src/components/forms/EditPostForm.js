import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { editPost } from '../../store/actions/index.js';

const EditPostFormWrapper = styled.form`
	border: 1px solid green;
	padding: 10px;
`;

class EditPostForm extends Component {
	state = { postBody: '' };
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { postBody } = this.state;
		const { user_id, post_id, discussion_id, historyPush } = this.props;
		return this.props.editPost(user_id, post_id, postBody, historyPush, discussion_id);
	};
	render() {
		const { postBody } = this.state;
		const { updateEditPostForm } = this.props;
		return(
			<EditPostFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Edit post form</h1>

				<input
					placeholder = 'Edit post...'
					name = 'postBody'
					onChange = { this.handleChange }
					value = { postBody }
				/>

				<button type = 'submit'>Submit</button>

				<button
					onClick = { updateEditPostForm }
					type = 'button' // prevents form submission
				>Cancel</button>
			</EditPostFormWrapper>
		);
	}
};

export default connect(null, { editPost })(EditPostForm);
