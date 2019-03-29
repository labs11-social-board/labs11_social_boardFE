import React, { Component } from "react";
import axios from "axios";
import "./App.css";

//Page created to load files to AddPostForm and AddReplyForm (MarcoGuzman)

class FileUpload extends Component {
    state = { selectedFile: null };

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    fileUploadHandler = () => {
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        //Create POST " " to send image to cloud service (https://api.cloudinary.com/v1_1/symposium2/image/upload).
        axios
            .post("", formData, {
                onUploadProgress: progressEvent => {
                    console.log(
                        "Upload Progress: " +
                        Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                        "%"
                    );
                }
            })
            .then(res => {
                console.log(res);
            });
    };

    render() {
        return (
            <div className="UploadButtons">
                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={this.fileSelectedHandler}
                    ref={fileInput => (this.fileInput = fileInput)}
                />
                <button onClick={() => this.fileInput.click()}>Choose File</button>
                <button onClick={this.fileUploadHandler}>Upload File</button>
            </div>
        );
    }
}

export default FileUpload;
