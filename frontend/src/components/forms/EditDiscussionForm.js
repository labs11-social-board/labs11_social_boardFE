import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { editDiscussion } from '../../store/actions/index.js';

const EditDiscussionFormWrapper = styled.form`
	border: 1px solid red;
	padding: 10px;
`;

class EditDiscussionForm extends Component {
	state = {
		body: this.props.body,
	};
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { body } = this.state;
		const { discussion_id, editDiscussion, historyPush } = this.props;
		return editDiscussion(discussion_id, body, historyPush);
	};
	render() {
		const {
			toggleEditDiscussionForm,
		} = this.props;
		const { body } = this.state;
		return(
			<EditDiscussionFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Edit Discussion</h1>

				<input
					placeholder = 'Enter new body...'
					name = 'body'
					value = { body }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>

				<button type = 'button' onClick = { toggleEditDiscussionForm }>Cancel</button>
			</EditDiscussionFormWrapper>
		);
	}
};

export default connect(null, { editDiscussion })(EditDiscussionForm);
