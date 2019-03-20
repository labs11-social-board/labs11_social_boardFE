import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// globals
import { topHeaderHeight } from '../../globals/globals.js';

// action creators
import { uploadAvatarUrl } from '../../store/actions/index.js';

const EditAvatarWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	padding: 10px;
	border-radius: 5px;
	width: 100vw;
	height: calc(100vh - ${topHeaderHeight});
	left: 0;
	top: ${topHeaderHeight};
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 9999;

	@media (max-height: 500px) {
		padding: 0;
	}

	@media (max-width: 485px) {
		padding: 0;
	}
`;

const EditAvatarUrlFormWrapper = styled.form`
border-radius: 5px;
padding: 40px;
display: flex;
flex-wrap: wrap;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.settingsBgColor};
height: 30vh;
width: 30vw;
position: relative;

@media (max-width: 850px) {
	height: 50vh;
	width: 50vw;
}

@media (max-width: 625px) {
	height: 60vh;
	width: 70vw;
}

@media (max-width: 485px) {
	height: 100vh;
	width: 80vw;
}

	.upload-input-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;

		@media (max-width: 1024px) {
			width: 80%;
		}
	
		@media (max-width: 700px) {
			width: 100%;
		}

		input {
			border-radius: 5px;
			padding: 10px;
			width: 100%;
			margin-bottom: 12px;
		}
	}

	.upload-btn {
		margin-top: 20px;
		font-weight: 700;
		padding: 8px 15px;
		border-radius: 5px;
		background-color: #418DCF;
		color: white;
		border: 1px solid #418DCF;

		&:hover {
			cursor: pointer;
			background-color: white;
			color: #418DCF;
		}
		&:focus {
    	outline: none;
  	}
	}

	.back {
		font-size: 30px;
		color: ${props => props.theme.defaultColor};
		position: absolute;
		top: 15px;
		left: -15px;
	
		&:hover {
			cursor: pointer;
			color: ${props => props.theme.defaultColorOnHover};
		}
	}

	.btn {
		padding: 10px 15px 25px;
		border-radius: 5px;
		background-color: #418DCF;
		color: white;
		border: 1px solid #418DCF;
		width: 50%;
		margin: 15px 0px;
		font-weight: bold;
	
		@media (max-width: 1024px) {
			width: 80%;
		}
	
		@media (max-width: 700px) {
			width: 100%;
		}
	
		&:hover {
			cursor: pointer;
			background-color: white;
			color: #418DCF;
			border: 1px solid #418DCF;
		}

		&:focus {
    	outline: none;
  	}
	}
`;

class EditAvatarUrlForm extends Component {
	state = { url: '' };
	handleSubmit = e => {
		e.preventDefault();
		const { url } = this.state;
		const { user_id, uploadAvatarUrl, onUploadAvatarSuccess } = this.props;
		return uploadAvatarUrl(user_id, url, onUploadAvatarSuccess);
	};
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	resetAvatar = e => {
		e.preventDefault();
		const { user_id, uploadAvatarUrl, onUploadAvatarSuccess } = this.props;
		return uploadAvatarUrl(user_id, null, onUploadAvatarSuccess);
	};
	render() {
		const { toggleForm } = this.props;
		const { url } = this.state;
		return(
			<EditAvatarWrapper>
				<EditAvatarUrlFormWrapper onSubmit = { this.handleSubmit }>
					<span
						className='back'
						onClick={toggleForm}		
					><i className="far fa-arrow-alt-circle-left"></i></span>
					<div className = 'upload-input-wrapper'>
						<input
							placeholder = 'Enter image URL'
							type = 'text'
							name = 'url'
							onChange = { this.handleInputChange }
						/>
					</div>

					{
						url &&
						<button className = 'upload-btn' type = 'submit'>Submit</button>
					}

					<button
						className = 'btn reset-btn'
						type = 'button'
						onClick = { this.resetAvatar }
					>Reset to default</button>
				</EditAvatarUrlFormWrapper>
			</EditAvatarWrapper>
		);
	}
};

const mapStateToProps = state => ({
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { uploadAvatarUrl })(EditAvatarUrlForm);
