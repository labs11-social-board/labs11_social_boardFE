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
        <button onClick={ handleImageSubmit }>Upload</button>
      </>
    );
};

const mapStateToProps = state => ({ });

export default connect(
  mapStateToProps,
  { uploadImage }
)(UploadImage);