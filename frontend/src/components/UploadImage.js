import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { uploadImage } from "../store/actions/index.js";

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
      <>
        <input
          type = 'file'
          name = 'image-file'
          id = 'image-file'
          onChange = { props.handleFileChange }
        />
        <button onClick={ handleImageSubmit } disabled={!props.name}>Upload</button>
        {props.image.length > 0 ? props.isUploadingImage ? <p>Uploading...</p> : <p>Image Uploaded!</p> : null}
      </>
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