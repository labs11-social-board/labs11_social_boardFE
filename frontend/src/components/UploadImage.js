import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

// components
import { uploadImage } from "../store/actions/index.js";

// globals
import { phoneP } from '../globals/globals.js';

const FileUpload = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:30px;
  
  @media ${phoneP}{
    
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .fileinput {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .fileinput + label {
    width: 30%;
    height: 16vh;
    border-radius: 50%;
    text-align: center;
    border: 1px solid;
    line-height: 10;
    margin: 0 25% 0 9%;
    cursor:pointer;

    @media (max-width: 1440px){
      width: 25%;
      line-height: 8;
      margin: 0 23% 0 9%;
    }

    @media ${phoneP} {
      line-height: 7;
      width: 30%;
    }
  }

  .fileinput + label:hover {
    background-color: lightgrey;
  }
`;
class UploadImage extends React.Component {
  state = {
    name: '',
    imagePreviewUrl: ''
  }
  handleFileChange = (e) => {
    e.preventDefault();
    const { uploadImage } = this.props;
    const imageData = new FormData();
    let reader = new FileReader();
    let file = e.target.files[0];
    
    imageData.append('imageFile', file);

    reader.onloadend = () => {
      this.setState({
        name: file,
        imagePreviewUrl: reader.result
      });
    }

    if(file){
      reader.readAsDataURL(file)
    }
  }
  handleImageSubmit = e => {
		e.preventDefault();
		const { uploadImage } = this.props;
		const imageFile = e.target.previousSibling.files[0];
		const imageData = new FormData();
    imageData.append('imageFile', imageFile);
    return uploadImage(imageData);
	};
    render() {
      return(
        <FileUpload>
          <label htmlFor='image-file'>Team Logo</label>
          <input
            type = 'file'
            name = 'image-file'
            id = 'image-file'
            className = 'fileinput'
            onChange = { this.handleFileChange }
          />
          <label htmlFor='image-file'>{this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl}/> : 'Upload a File'}</label>
          {/* <button onClick={ this.handleImageSubmit } disabled={!this.state.name}>Upload</button> */}
          {this.props.image.length > 0 ? this.props.isUploadingImage ? <p>Uploading...</p> : <p>Image Uploaded!</p> : null}
        </FileUpload>
      );
    }
};

const mapStateToProps = state => ({
  isUploadingImage: state.posts.isUploadingImage,
  image: state.posts.images
 });

export default connect(
  mapStateToProps,
  { uploadImage }
)(UploadImage);