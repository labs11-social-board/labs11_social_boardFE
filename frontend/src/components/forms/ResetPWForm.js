import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

// globals
import { backendUrl } from '../../globals/globals.js';

// action creators
import { resetPassword, displayError } from '../../store/actions/index.js';

const ResetPWFormWrapper = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	padding-top: 50px;
	width: 300px;

	table {
		tbody {
			tr {
				td {
					padding: 10px;
				}
			}
		}
	}

	input {
		padding: 5px 10px;
		border-radius: 5px;
		margin: 10px;
	}
`;

class ResetPWForm extends Component {
	state = { id: '', username: '', email: '', password: '', password1: '' };
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { displayError, history, match, resetPassword } = this.props;
		const { reset_pw_token } = match.params;
		const { password, password1 } = this.state;
		if (password !== password1) return displayError('Passwords must match.');
		return resetPassword(password, reset_pw_token, history);
	};
	componentDidMount = () => {
		const { displayError, match } = this.props;
		const { reset_pw_token } = match.params;
		const headers = { headers: { Authorization: reset_pw_token } };
		return axios
			.get(`${ backendUrl }/users/token-info`, headers)
			.then(res => {
				const { id, username, email } = res.data[0];
				return this.setState({ id, username, email });
			})
			.catch(err => {
				const error =  err.response ? err.response.data.error : err.toString();
				return displayError(error);
			});
	};
	render() {
		const { username, email, password, password1 } = this.state;
		return(
			<ResetPWFormWrapper onSubmit = { this.handleSubmit }>
				{
					username &&
					<Fragment>
						<table>
							<tbody>
								<tr>
									<td>User:</td>
									<td>{ username }</td>
								</tr>
								
								<tr>
									<td>E-mail:</td>
									<td>{ email }</td>
								</tr>
							</tbody>
						</table>

						<input
							autoComplete = 'off'
							type = 'password'
							name = 'password'
							placeholder = 'Enter new password'
							value = { password }
							onChange = { this.handleInputChange }
						/>
						
						<input
							autoComplete = 'off'
							type = 'password'
							name = 'password1'
							placeholder = 'Re-enter new password'
							value = { password1 }
							onChange = { this.handleInputChange }
						/>

						<button type = 'submit'>Sign in</button>
					</Fragment>
				}
			</ResetPWFormWrapper>
		);
	}
};

export default connect(null, { resetPassword, displayError })(ResetPWForm);
