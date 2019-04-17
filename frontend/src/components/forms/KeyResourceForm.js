import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import {
    NavLink
} from 'react-router-dom';
import styled from 'styled-components';
import { putKeyResource } from '../../store/actions';

const ButtonY = styled.button `
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 100px;
    margin-left: 1px;
    margin-top: 5px;
  `;

  const ButtonX = styled.button `
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 100px;
    margin-left: 24px;
    
  `;
  
  const StyledLink = styled(NavLink)`
    color: white;  
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const InputY = styled.input`
  padding-left: 5px;
  height: 35px;
  width: 350px;
  color: #000000;
  background: dcdcdc;
  border: 1px solid black;
  border-radius: 3px;
`;

class KeyResourceForm extends Component {
    constructor(props) {
        super(props);

    this.state = {
        link: '',
        title: '',
        info: ''
    };
}

    handleChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    handleSubmit = e => {
        e.preventDefault();

        // handle submit logic
        this.props.putKeyResource(this.state);

        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    render() {
        const {
            link,
            title,
            info
        } = this.state;

        return ( 
            <div>
                <h2>Add A Key Resource</h2>
                <p>(All Info Required To Add)</p>

                <InputY
                    placeholder = 'Web Link'
                    name = 'link'
                    type='link'
                    required="required"
                    value = {
                        link
                    }
                    onChange = {
                        this.handleChange
                    }
                />
                <br></br>
                <InputY
                    placeholder = 'Link Title'
                    name = 'title'
                    type='title'
                    required="required"
                    value = {
                        title
                    }
                    onChange = {
                        this.handleChange
                    }
                />
                <br></br>
                <InputY
                    placeholder = 'Link Info'
                    name = 'info'
                    type='info'
                    required="required"
                    value = {
                        info
                    }
                    onChange = {
                        this.handleChange
                    }
                />
                <br></br>
                <ButtonY type='submit'
                onClick={
                    this.handleSubmit
                }>Add</ButtonY>
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
    { putKeyResource }
)(KeyResourceForm);