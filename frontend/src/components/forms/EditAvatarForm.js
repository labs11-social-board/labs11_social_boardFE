import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { uploadAvatar } from '../../store/actions/index.js';

// globals
import { topHeaderHeight } from '../../globals/globals.js';

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

const EditAvatarFormWrapper = styled.form`
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

@media (max-width: 625px) {
	height: 60vh;
	width: 70vw;
}

@media (max-width: 485px) {
	height: 100vh;
	width: 80vw;
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
}

	.upload-input-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		text-align: center;

		@media (max-width: 1024px) {
			width: 80%;
		}
	
		@media (max-width: 700px) {
			width: 100%;
		}

		#image-file {
			width: 0.1px;
			height: 0.1px;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			z-index: -1;
		}

		#image-file + label {
			font-weight: 700;
			color: white;
			background-color: #418DCF;
			display: inline-block;
			padding: 8px 15px;
			border-radius: 5px;
			border: 1px solid #418DCF;
			text-align: center;

			@media (max-width: 1024px) {
				width: 100%;
			}
		
			@media (max-width: 700px) {
				width: 100%;
			}
		}

		#image-file:focus + label {
			background-color: #418DCF;
		}

		#image-file + label:hover {
			background-color: white;
			color: #418DCF;
			border: 1px solid #418DCF;
		}

		#image-file + label {
			cursor: pointer;
		}

		#image-file:focus + label {
			outline: 1px dotted #000;
			outline: -webkit-focus-ring-color auto 5px;
		}
	}

	.upload-btn {
		margin: 20px;
		font-weight: 700;
		color: white;
		background-color: #418DCF;
		padding: 8px 15px;
		border-radius: 5px;

		&:hover {
			cursor: pointer;
			background-color: white;
			color: black;
		}
		&:focus {
    	outline: none;
  	}
	}

	.fas {
		margin-right: 8px;
	}
`;

class EditAvatarForm extends Component {
	state = { name: '' };
	handleSubmit = e => {
		e.preventDefault();
		const { user_id, uploadAvatar, onUploadAvatarSuccess } = this.props;
		const imageFile = e.target[0].files[0];
		const imageData = new FormData();
		imageData.append('imageFile', imageFile);
		return uploadAvatar(user_id, imageData, onUploadAvatarSuccess);
	};
	handleInputChange = e => {
		if (e.target.files.length) {
			const { name } = e.target.files[0];
			return this.setState({ name });
		}
		return this.setState({ name: '' });
	};
	resetAvatar = e => {
		e.preventDefault();
		const { user_id, uploadAvatar, onUploadAvatarSuccess } = this.props;
		return uploadAvatar(user_id, null, onUploadAvatarSuccess);
	};
	render() {
		const { toggleForm } = this.props;
		const { name } = this.state;
		return(
			<EditAvatarWrapper>
				<EditAvatarFormWrapper onSubmit = { this.handleSubmit }>
					<span
						className='back'
						onClick={toggleForm}		
					><i className="far fa-arrow-alt-circle-left"></i></span>
					<div className = 'upload-input-wrapper'>
						<input
							type = 'file'
							name = 'image-file'
							id = 'image-file'
							onChange = { this.handleInputChange }
						/>

						<label htmlFor = 'image-file'>
							{
								name ?
								<span>{ name }</span> :
								<>
									<i className = 'fas fa-user' />
									<span>Choose&nbsp;an&nbsp;avatar</span>
								</>
							}
						</label>
					</div>

					{
						name &&
						<button className = 'btn' type = 'submit'>Submit</button>
					}

					<button
						className = 'btn'
						type = 'button'
						onClick = { this.resetAvatar }
					>Reset to default</button>

					{/* <button
						type = 'button'
						className = 'btn cancel-btn'
						onClick = { toggleForm }
					>Cancel</button> */}
				</EditAvatarFormWrapper>
			</EditAvatarWrapper>
		);
	}
};

const mapStateToProps = state => ({
	user_id: state.users.user_id,
});

export default connect(mapStateToProps, { uploadAvatar })(EditAvatarForm);
