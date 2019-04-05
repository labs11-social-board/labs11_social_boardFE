import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

import { uploadImage } from "../store/actions/index.js";

const FileUpload = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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
    cursor:pointer;
  }

  .fileinput + label:hover {
    background-color: lightgrey;
  }
`;
const UploadImage = props => {
  const handleImageSubmit = e => {
		e.preventDefault();
		const { uploadImage } = props;
		const imageFile = e.target.previousSibling.files[0];
		const imageData = new FormData();
    imageData.append('imageFile', imageFile);
    return uploadImage(imageData);
	};
    return(
      <FileUpload>
        <input
          type = 'file'
          name = 'image-file'
          id = 'image-file'
          className = 'fileinput'
          onChange = { props.handleFileChange }
        />
        <label htmlFor='image-file'>{props.imagePreviewUrl ? <img src={props.imagePreviewUrl}/> : 'Upload a File'}</label>
        <button onClick={ handleImageSubmit } disabled={!props.name}>Upload</button>
        {props.image.length > 0 ? props.isUploadingImage ? <p>Uploading...</p> : <p>Image Uploaded!</p> : null}
      </FileUpload>
    );
};

const mapStateToProps = state => ({
  isUploadingImage: state.posts.isUploadingImage,
  image: state.posts.images
 });

export default connect(
  mapStateToProps,
  { uploadImage }
)(UploadImage);