import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updatePassword, displayError } from '../../store/actions/index.js';

const EditPasswordDiv = styled.div`
	width: 60%;
	height: auto;
	display: flex;
	justify-content: flex-end;
`;

const EditPasswordFormWrapper = styled.form`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: #54BDFF;

		h1 {
			margin-top: 0px;
			margin-bottom: 55px;
		}
	
	@media (max-width: 520px){
      width: 80%;
  }
`;

const Inputs = styled.div`
	width: 80%;
	display: flex;
	flex-direction: column;
	
	input {
		width: 90%;
		margin-top: 10px;
		padding: 5px;
		font-size: 16px;
		border-radius: 5px;
	}
`;

const Buttons = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;

	button {
		margin: 7px;
        border-radius: 10px;
        width: 25%;
        height: 30px;
        font-size: 14px;

          &:hover {
            background-color: #4ca0e0;
            cursor: pointer;
          }
					&:focus {
    				outline: none;
  				}
	}
`;

class EditPasswordForm extends Component {
	state = {
		oldPassword: '',
		newPassword: '',
		newPassword1: '',
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { oldPassword, newPassword, newPassword1 } = this.state;
		const { updatePassword, toggleForm, displayError } = this.props;
		if (newPassword !== newPassword1) return displayError('New passwords must match.');
		return updatePassword(oldPassword, newPassword, toggleForm);
	};
	render() {
		const {
			oldPassword,
			newPassword,
			newPassword1,
		} = this.state;
		const { toggleForm } = this.props;
		return(
			<EditPasswordDiv>
				<EditPasswordFormWrapper onSubmit = { this.handleSubmit }>
					<h1>Edit password</h1>
					<Inputs>
						<input
							placeholder = 'Old password'
							name = 'oldPassword'
							type = 'password'
							onChange = { this.handleChange }
							value = { oldPassword }
						/>

						<input
							placeholder = 'New password'
							name = 'newPassword'
							type = 'password'
							onChange = { this.handleChange }
							value = { newPassword }
						/>

						<input
							placeholder = 'New password again'
							name = 'newPassword1'
							type = 'password'
							onChange = { this.handleChange }
							value = { newPassword1 }
						/>
					</Inputs>
					<Buttons>
						<button type = 'submit'>Submit</button>
						<button type = 'button' onClick = { () => toggleForm('') }>Cancel</button>
					</Buttons>
				</EditPasswordFormWrapper>
			</EditPasswordDiv>
		);
	}
};

export default connect(null, { updatePassword, displayError })(EditPasswordForm);
