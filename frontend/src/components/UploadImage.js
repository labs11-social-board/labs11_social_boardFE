import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

// components
import { uploadImage, removeUpload, resetImageState } from "../store/actions/index.js";

// globals
import { phoneP } from '../globals/globals.js';

const FileUpload = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:30px;
  
  @media ${phoneP}{
    flex-direction: column;
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
    width: 230px;
    height: 16vh;
    border-radius: 50%;
    text-align: center;
    border: 1px solid;
    line-height: 10;
    margin: 0 25% 0 9%;
    cursor:pointer;

    @media (max-width: 1440px){
      width: 200px;
      line-height: 8;
      margin: 0 23% 0 9%;
    }

    @media ${phoneP} {
      line-height: 7;
      width: 117px;
      margin: 14px 9% 0 9%;
    }
  }

  .fileinput + label:hover {
    color: #418DCF;
    border: 1px solid #418DCF;
    background-color: white;
  }

  .image-upload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .image-upload + label {
    padding: 10px 0;
    width: 140px;
    text-align: center;
    border: 1px solid;
    cursor: pointer;
    border-radius: 5px;
    background-color: #418DCF;
    color: white;

    @media ${phoneP} {
      width: 100%;
      padding: 7% 25%;
    }
  }

  .image-upload + label:hover {
    color: #418DCF;
    border: 1px solid #418DCF;
    background-color: white;
  }
`;

class UploadImage extends React.Component {
  state = {
    name: '',
    imagePreviewUrl: ''
  }
  handleFileChange = (e) => {
    e.preventDefault();
    const { uploadImage, removeUpload, image } = this.props;
    const imageData = new FormData();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(image.id && file !== this.state.name) {
      removeUpload(image.id);
      this.props.resetImageState();
      this.setState({ name: '', imagePreviewUrl: '' });  
    }

    imageData.append('imageFile', file);

    reader.onloadend = () => {
      this.setState({
        name: file,
        imagePreviewUrl: reader.result
      });
    }

    if(file){
      reader.readAsDataURL(file)
      this.handleImageSubmit(file);
    }
  }
  handleImageSubmit = file => {
		const { uploadImage } = this.props;
		// const imageFile = e.target.previousSibling.files[0];
		const imageData = new FormData();
    imageData.append('imageFile', file);
    return uploadImage(imageData);
  };
  checkStringLength = str => {
    let newStr;
    if(str.length > 8 ){
      newStr = str.slice(0, 8) + '...';
    }
    return newStr;
  }
  componentDidMount() {
    if(this.props.imagePreviewUrl !== this.state.imagePreviewUrl ){
      this.setState({ imagePreviewUrl: this.props.imagePreviewUrl });
    }
  }
    render() {
      const { name, imagePreviewUrl } = this.state;
      return(
        <FileUpload>
          {this.props.isTeam ? 
            <>
              <label htmlFor='image-file'>Team Logo</label>
              <input
                type = 'file'
                name = 'image-file'
                id = 'image-file'
                className = 'fileinput'
                onChange = { this.handleFileChange }
              />
              <label htmlFor='image-file'>{imagePreviewUrl ? <img src={imagePreviewUrl}/> : 'Upload a Image'}</label> 
            </>
            : 
            <>
              <input
                type = 'file'
                name = 'image-upload'
                id = 'image-upload'
                className = 'image-upload'
                onChange = { this.handleFileChange }
              />
              <label htmlFor='image-upload'>{name ? this.checkStringLength(name.name) : 'Upload an Image'}</label>
              {this.state.name ? this.props.isUploadingImage ? <p>Uploading...</p> : <p>Image Uploaded!</p> : null}
            </>
          }
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
  { uploadImage, removeUpload, resetImageState }
)(UploadImage);