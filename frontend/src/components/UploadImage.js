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
  .drag-zone-wrapper {
    border: dashed grey 4px;
    background: rgba(255,255,255,.8);
    position: absolute;
    z-index: 9999;
    border-radius: 50%;
    height: 16vh;

    .drag-zone {
      position: relative;
      top: 30%;
      right: 0;
      left: 0;
      text-align: center;
      color: grey;
      font-size: 25px;
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

  p {
    margin-left: 10px;
  }

`;

class UploadImage extends React.Component {
  state = {
    name: '',
    imagePreviewUrl: '',
    dragging: false
  };
  handleFileChange = (e) => {
    e.preventDefault();
    const { uploadImage, removeUpload, image } = this.props;
    let reader = new FileReader();
    let file = e.target.files[0];
    if(image.id && file !== this.state.name) {
      removeUpload(image.id);
      this.props.resetImageState();
      this.setState({ name: '', imagePreviewUrl: '' });  
    }

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
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    console.log(this.dragCounter)
    if ( e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true })
    }
  }
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if(this.dragCounter === 0){
      this.setState({ dragging: false})
    }
  }
  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let reader = new FileReader();
    let file = e.dataTransfer.files[0];
    reader.onloadend = () => {
      this.setState({
        name: file,
        imagePreviewUrl: reader.result,
        dragging: false
      });
    };

    // this.setState({ dragging: false })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      reader.readAsDataURL(file)
      this.handleImageSubmit(file);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  }
  componentDidMount() {
    let dropzone = document.getElementById('drop-zone');
    let dropzoneT = document.getElementById('drop-zone-t');
    this.dragCounter = 0;
    if(this.props.imagePreviewUrl !== this.state.imagePreviewUrl ){
      this.setState({ imagePreviewUrl: this.props.imagePreviewUrl });
    }
    
    //code for droping a file into the upload input
    if(dropzone){
      dropzone.addEventListener('dragenter', this.handleDragIn);
      dropzone.addEventListener('dragleave', this.handleDragOut);
      dropzone.addEventListener('dragover', this.handleDrag);
      dropzone.addEventListener('drop', this.handleDrop);
    } else {
      dropzoneT.addEventListener('dragenter', this.handleDragIn);
      dropzoneT.addEventListener('dragleave', this.handleDragOut);
      dropzoneT.addEventListener('dragover', this.handleDrag);
      dropzoneT.addEventListener('drop', this.handleDrop);
    }
  }
  componentWillUnmount(){
    let dropzone = document.getElementById('drop-zone');
    let dropzoneT = document.getElementById('drop-zone-t');

    if(dropzone){
      dropzone.removeEventListener('dragenter', this.handleDragIn);
      dropzone.removeEventListener('dragleave', this.handleDragOut);
      dropzone.removeEventListener('dragover', this.handleDrag);
      dropzone.removeEventListener('drop', this.handleDrop);
    } else {
      dropzoneT.removeEventListener('dragenter', this.handleDragIn);
      dropzoneT.removeEventListener('dragleave', this.handleDragOut);
      dropzoneT.removeEventListener('dragover', this.handleDrag);
      dropzoneT.removeEventListener('drop', this.handleDrop);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.imagePreviewUrl !== this.state.imagePreviewUrl && !this.state.name ){
      this.setState({ imagePreviewUrl: this.props.imagePreviewUrl });
    }
  }
    render() {
      const { name, imagePreviewUrl } = this.state;
      return(
       <>
        {this.props.isTeam ?   
          <div id='drop-zone'>
            <FileUpload>
              <label htmlFor='image-file'>Team Logo</label>
              <input
                type = 'file'
                name = 'image-file'
                id = 'image-file'
                className = 'fileinput'
                onChange = { this.handleFileChange }
              />
              <label htmlFor='image-file' >{imagePreviewUrl ? <img src={imagePreviewUrl}/> : 'Upload a Image'}</label>
              {this.state.dragging &&
                <div className='drag-zone-wrapper'>
                  <div className='drag-zone'>
                    Drop file here
                  </div>
                </div>
              } 
            </FileUpload>
         </div> 
         : 
         <div id='drop-zone-t'>
          <FileUpload>
            <input
              type = 'file'
              name = 'image-upload'
              id = 'image-upload'
              className = 'image-upload'
              onChange = { this.handleFileChange }
            />
            <label htmlFor='image-upload'>{name ? this.checkStringLength(name.name) : 'Upload an Image'}</label>
            {this.state.dragging &&
              <div className='drag-zone-wrapper'>
                <div className='drag-zone'>
                  Drop file here
                </div>
              </div>
            } 
            {this.state.name ? this.props.isUploadingImage ? <p>Uploading...</p> : <p>Image Uploaded!</p> : null}
          </FileUpload>
        </div>
        }
       </>
        
          
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