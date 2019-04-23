import React, { Component } from 'react';
import {
    connect
} from 'react-redux';

import styled from 'styled-components';
import { putKeyResource, displayMessage } from '../../store/actions';

const ButtonY = styled.button`
    border: 1px solid #f66042;
    border-radius: 3px;
    color: white;
    background-color: #f66042;
    height: 35px;
    width: 100px;
    margin-left: 1px;
    margin-top: 5px;
  `;

const InputY = styled.input`
  padding-left: 5px;
  height: 35px;
  width: 250px;
  color: #000000;
  background: dcdcdc;
  border: 1px solid black;
  border-radius: 3px;
  margin-bottom: 4px;
`;

class KeyResourceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newResource: {
                title: '',
                resource: '',
                info: ''
            }
        };
    }

    handleChange = e => {
        this.setState({
            ...this.state,

            newResource: {
                ...this.state.newResource,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.newResource)
    };

    handleSubmit = e => {
        e.preventDefault();

        // handle submit logic
        if (this.state.newResource.title !== '' && this.state.newResource.resource !== '' && this.state.newResource.info !== '') {
            this.props.putKeyResource(this.state.newResource);
            this.props.displayMessage('Resource added')

            setTimeout(() => {
                window.location.reload();
            }, 300);
        } else {
            this.props.displayMessage('Please fill out all fields')
        }

    };

    render() {
        // const {
        //     title,
        //     resource,
        //     info
        // } = this.state;

        return (
            <div>
                <h2>Add A Key Resource</h2>
                <p>(All Info Required To Add)</p>
                <form onSubmit={this.handleSubmit}>

                    <InputY
                        placeholder='Web title'
                        name='title'
                        type='title'
                        required
                        value={this.state.newResource.title}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <InputY
                        placeholder='Web Resource'
                        name='resource'
                        type='resource'
                        required
                        value={this.state.newResource.resource}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <InputY
                        placeholder='Link Info'
                        name='info'
                        type='info'
                        required
                        value={this.state.newResource.info}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <ButtonY type='submit'
                        onClick={
                            this.handleSubmit
                        }>Add</ButtonY>

                </form>
            </div>
        );
    }
}

const mapStoreToProps = state => {
    return {

        addingResource: state.emails.addingResource
    }
}


export default connect(
    mapStoreToProps,
    { putKeyResource, displayMessage }
)(KeyResourceForm);