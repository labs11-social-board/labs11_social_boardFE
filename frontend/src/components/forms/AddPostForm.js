import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import CKEditor from 'ckeditor4-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Parser from 'html-react-parser';
import { Avatar } from "../index.js";

// globals
import { phoneP } from '../../globals/globals.js';

// action creators
import { addPost, uploadImage, updatePostWithImage, removeUpload, resetImageState, displayMessage } from "../../store/actions/index.js";

// components
import { UploadImage } from '../index.js';

const AddPostFormWrapper = styled.form`
  width: 80%;
  padding: 10px;
  color: ${props => props.theme.discussionPostColor};

  @media ${phoneP}{
    margin-left: 6%;
  }

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

  .exit {
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

  @media ${phoneP}{
    flex-direction: column;
    height: 18vh;

    input[type=file] {
      margin-left: 25%;
    }
  }

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

  .drag-zone-wrapper {
    bottom: 34%;
    height: 3.5vh;

    @media(max-width: 1440px){
      bottom: 34%;
      height: 4vh;
    }

    @media(max-width: 1024px){
      bottom: 35.6%;
    }

    @media ${phoneP}{
      display:none;
    }
  }
`;

class AddPostForm extends Component {
  state = { postBody: "", name: "", isUploading: false };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    const { postBody } = this.state;
    const { discussion_id, team_id, handleTeamFilter, handleFilterChange, toggleAddPostForm, updatePostWithImage, image, displayMessage } = this.props;
    this.props.handleisVoting();
    if(postBody.length > 0){
      this.props.addPost(discussion_id, postBody, team_id).then( res => {
        if(image){
          updatePostWithImage(image, res.payload[0]);
          this.props.resetImageState();
        }
      });
    } else if(!postBody && image){
      this.props.addPost(discussion_id, postBody, team_id).then( res => {
        if(image){
          updatePostWithImage(image, res.payload[0]);
          this.props.resetImageState();
        }
      });
    } else {
      displayMessage('Please enter a message or upload an image');
    }

    if (team_id) {
      toggleAddPostForm();
      setTimeout(() => handleTeamFilter(), 200);
    } else {
      toggleAddPostForm();
      setTimeout(() => handleFilterChange(), 200);
    }
  };

  handleExit = e => {
    e.preventDefault();
    this.props.toggleAddPostForm();
    if(this.props.image){
      this.props.removeUpload(this.props.image);
      this.props.resetImageState();
		}
  }

  handleFileChange = e => {
		if (e.target.files.length) {
      const { name } = e.target.files[0];
      this.setState({ name });
		} else {
      this.setState({ name: '' });
    }
  };
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
    const { postBody } = this.state;
    const { username, user_id, avatar } = this.props;
    return (
      <AddPostFormWrapper onSubmit={this.handleSubmit}>
        <AddCommentTitle>
          <p>Write a comment</p>
          <span
            className="exit"
            onClick={this.handleExit}
            type="button" // prevents form submission
          >
            <i className="far fa-times-circle" />
          </span>
        </AddCommentTitle>
        <textarea
          type="text"
          placeholder="Write your comment"
          name="postBody"
          onChange={this.handleChange}
          value={postBody}
        />
        <UserActions>
          <div className="user">
            <Avatar height="30px" width="30px" src={avatar} />
            <Link className="username" to={`/profile/${user_id}`}>
              {username}
            </Link>
          </div>
          <button className="submit-btn" type="submit">
            Post comment
          </button>
          <UploadImage />
        </UserActions>
      </AddPostFormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  username: state.users.username,
  user_id: state.users.user_id,
  avatar: state.users.avatar,
  image: state.posts.images.id,
  isUploadingImage: state.posts.isUploadingImage
});

export default connect(
  mapStateToProps,
  { addPost, uploadImage, updatePostWithImage, removeUpload, resetImageState, displayMessage }
)(AddPostForm);
