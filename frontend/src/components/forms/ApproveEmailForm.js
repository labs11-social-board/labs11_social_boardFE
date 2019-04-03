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
                <h1>Emails</h1>

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
                    placeholder = 'Last Name'
                    name = 'last_name'
                    value = {
                        last_name
                    }
                    onChange = {
                        this.handleChange
                    }
                />

                <button type='submit'>Add</button>
            </div>
        );
    }
}