import React, { Component }	from 'react';
import { connect }			from 'react-redux';
import styled				from 'styled-components';

// action creators
import { confirmEmail } from '../store/actions/index.js';

const StyledConfirmEmail = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;

	.go-home-btn {
		margin-top: 20px;
	}
`;

class ConfirmEmail extends Component {
	goHome = () => this.props.history.push('/home');
	componentDidMount() {
		const { confirmEmail, match, history } = this.props;
		return confirmEmail(match.params.email_confirm_token, history.push);
	}
	render() {
		return(
			<StyledConfirmEmail>
				<button onClick = { this.goHome }>Back to Homepage</button>
			</StyledConfirmEmail>
		);
	}
};

export default connect(null, { confirmEmail })(ConfirmEmail);
