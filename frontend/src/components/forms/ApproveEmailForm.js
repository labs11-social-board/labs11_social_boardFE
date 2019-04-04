import React, { Component } from 'react';

class ApproveEmailForm extends Component {
    state = {
        email: '',
        first_name: '',
        last_name: ''
    };

    handleChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    handleSubmit = e => {
        e.preventDefault();

        const {
            email,
            first_name,
            last_name
        } = this.state;

        // handle submit logic
        alert('Email is being submitted');
    };

    render() {
        const {
            email,
            first_name,
            last_name
        } = this.state;

        // const {
        
        // } = this.props;

        return ( 
            <div>
                <h2>Emails</h2>

                <input
                    placeholder = 'First Name'
                    name = 'first_name'
                    value = {
                        first_name
                    }
                    onChange = {
                        this.handleChange
                    }
                />

                <input
                    placeholder = 'Last Name'
                    name = 'last_name'
                    value = {
                        last_name
                    }
                    onChange = {
                        this.handleChange
                    }
                />

                <input
                    placeholder = 'E-Mail'
                    name = 'email'
                    value = {
                        email
                    }
                    onChange = {
                        this.handleChange
                    }
                />

                <button type='submit'
                onClick={
                    this.handleSubmit
                }>Add</button>
            </div>
        );
    }
}

export default ApproveEmailForm;