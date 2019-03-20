import React, { Component } from 'react';
import { connect }			from 'react-redux';
import styled				from 'styled-components';

// action creators
import { updateEmail, displayError } from '../../store/actions/index.js';

const Container = styled.div`
	width: 60%;
	height: auto;
	display: flex;
	justify-content: flex-end;
`;

const StyledUpdateEmailForm = styled.form`
	width: 90%;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: #54BDFF;

	h1 {
		margin-top: 0px;
	}

	input {
		width: 75%;
		margin-top: 10px;
		padding: 5px;
		font-size: 16px;
		border-radius: 5px;
	}

	.buttons-wrapper {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		button {
			font-size: 14px;
			margin: 10px;
			border-radius: 10px;
			height: 30px;
			&:hover {
            background-color: #4ca0e0;
            cursor: pointer;
          }
		}	
	}
`;

class UpdateEmailForm extends Component {
	state = { email: '' };
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { displayError, updateEmail, history } = this.props;
		const { email } = this.state;
		if (!email) {
			return displayError('E-mail must not be empty.');
		}
		return updateEmail(email, history);
	};
	render() {
		const { email } = this.state;
		const { toggleForm } = this.props;
		return(
			<Container>
			<StyledUpdateEmailForm onSubmit = { this.handleSubmit }>
				<h1>Update E-mail</h1>
				<input
					className = 'update-email-input'
					autoComplete = 'on'
					type = 'email'
					name = 'email'
					placeholder = 'Enter new e-mail'
					value = { email }
					onChange = { this.handleInputChange }
				/>

				<div className = 'buttons-wrapper'>
					<button className = 'update-btn'>Update Email</button>
					<button className = 'cancel-btn' type = 'button' onClick = { toggleForm }>Cancel</button>
				</div>
			</StyledUpdateEmailForm>
			</Container>
		);
	}
};

export default connect(null, { updateEmail, displayError })(UpdateEmailForm);
