import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// action creators
import { addDiscussion, addTeamDiscussion, displayError, removeUpload, updateDiscussionWithImage, followDiscussion, resetImageState, displayMessage } from '../../store/actions/index.js';

// components
import { UploadImage } from '../index.js';

// globals
import {
	phoneP,
	topHeaderHeight,
} from '../../globals/globals.js';

const AddDiscussionFormWrapper = styled.div`
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

const AddDiscussionFormBox = styled.form`
	border-radius: 5px;
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.settingsBgColor};
	height: 60vh;
	width: 60vw;

	@media (max-height: 500px) {
		height: 100vh;
	}

	@media (max-width: 485px) {
		height: 100vh;
	}

	.body-input, .categories-select {
		border-radius: 5px;
		padding: 5px 10px;
		background-color: ${props => props.isDay ? 'white': '#ddd'};
	}

	.body-input {
		width: 80%;
		height: 40%;
	}

	.above-input {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 15px;
		position: relative;

		.back {
			font-size: 30px;
			color: ${props => props.theme.defaultColor};
			position: absolute;
			top: -30px;
			left: 0;

			&:hover {
				cursor: pointer;
				color: ${props => props.theme.defaultColorOnHover};
			}
		}
	}

	.below-input {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 80%;
		margin-top: 10px;
		align-items: center;

		@media (max-width: 1024px) {
			flex-direction: column;
			justify-content: center;

			.categories-select, .submit-btn {
				width: 44%;
			}

			input[type=file]{
				margin-left: 17%;
			}
		}

		@media (max-width: 600px) {
			.categories-select, .submit-btn {
				width: 60%;
			}
		}

		@media ${phoneP} {
			flex-direction: column;
			align-items: center;

			.categories-select, .submit-btn {
				width: 80%;
			}

			input[type=file] {
				margin-left: 35%;
			}
		}

		.user {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			font-size: 1.0rem;

			@media ${phoneP} {
				font-size: 1.4rem;
				margin-bottom: 10px;
			}

			.username {
				color: ${props => props.theme.defaultColor};
				text-decoration: none;

				&:hover {
					color: ${props => props.theme.defaultColorOnHover};
				}
			}

			img {
				width: 23px;
				margin-right: 10px;
				height: 23px;
				border-radius: 50%;
			}
		}

		button {
			border: 1px solid white;
			border-radius: 5px;
			padding: 10px 15px;
			width: 100px;
			color: white;

			@media ${phoneP} {
				margin-top: 10px;
				width: 156px;
			}

			&:hover {
				cursor: pointer;
				background-color: white;
			}
		}

		.submit-btn {
			background-color: #418DCF;

			&:hover {
				color: #418DCF;
				border: 1px solid #418DCF;
			}
			&:disabled {
				background: lightgrey;
			}
			&:disabled:hover {
				background: lightgrey;
				border:none;
				color:white;
			}
		}
	}
`;

class AddDiscussionForm extends Component {
  state = { body: '', categoryNames: [{ id: 0, name: '' }], category_id: 1, name:'', isUploading: false};
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { body, category_id,} = this.state;
    const { toggleAddDiscussionForm, getDiscussions, updateDiscussionWithImage, image, followDiscussion, user_id, resetImageState, handleisVoting } = this.props;
		handleisVoting();
		
		if(this.props.team_id){
			this.props.addTeamDiscussion(body, this.props.team_id)
			.then(res => {
				toggleAddDiscussionForm();
				if(res){
					followDiscussion(res.payload[0], user_id)
					if(image){
						updateDiscussionWithImage(image, res.payload[0]);
						resetImageState();
					}
				}
			})
			.then(() => getDiscussions());
		} else {
			return this.props.addDiscussion(body, category_id)
			.then(res => {
				toggleAddDiscussionForm();
				followDiscussion(res.payload[0], user_id)
				if(image){
					updateDiscussionWithImage(image, res.payload[0]);
					resetImageState();
				}
			})
			.then(() => getDiscussions());
		}
	};
  handleExit = e => {
    e.preventDefault();
    this.props.toggleAddDiscussionForm();
    if(this.props.image){
			this.props.removeUpload(this.props.image);
			this.props.resetImageState();
		}
  }
  getCategoryNames = () => this.setState({ categoryNames: this.props.categoriesFollowed, category_id: this.props.category_id || this.props.categoriesFollowed[0].id });
  componentDidMount = () => {
		if(!this.props.team_id){
			this.getCategoryNames();
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
    const { body, categoryNames, category_id } = this.state;
		const { toggleAddDiscussionForm, username, avatar, user_id, isDay } = this.props;

    return (
      <AddDiscussionFormWrapper onSubmit={this.handleSubmit}>
        <AddDiscussionFormBox isDay = { isDay }>
					<div className='above-input'>
						<span
							className='back'
							onClick={toggleAddDiscussionForm}		
						><i className="fa fa-arrow-left"></i></span>
						<span></span>
					</div>
          <textarea
            // rows='10'
            // cols='80'
            className='body-input'
            type='text'
            placeholder='Add a post...'
            name='body'
            onChange={this.handleInputChange}
            value={body}
          />
          <div className='below-input'>
						<div className='user'>
							<Link className='username' to={`/profile/${user_id}`}>
								<img alt='pic' src = { avatar } />
							</Link>
							<Link className='username' to={`/profile/${user_id}`}>
								{username}
							</Link>
						</div>
						{ this.props.team_id ? null : 
							<select
								className='categories-select'
								onChange={this.handleInputChange}
								name='category_id'
								value = {category_id}
							>
							{
								categoryNames.map((cat, i) =>
									<option key={i} value={cat.id}>{cat.name}</option>
								)
							}
						</select> }
            <button className='submit-btn' type='submit' disabled={this.props.isUploadingImage}>Post</button>
						<UploadImage />  
          </div>
        </AddDiscussionFormBox>
      </AddDiscussionFormWrapper>
    );
  }
};

const mapStateToProps = state => ({
	categoriesFollowed: state.categories.categoriesFollowed,
	username: state.users.username,
	user_id: state.users.user_id,
	avatar: state.users.avatar,
	isDay: state.users.isDay,
	image: state.posts.images.id,
	isUploadingImage: state.posts.isUploadingImage
});

export default connect(mapStateToProps, { addDiscussion, addTeamDiscussion, displayError, updateDiscussionWithImage, removeUpload, followDiscussion, resetImageState, displayMessage })(AddDiscussionForm);
