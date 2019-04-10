import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import {
    NavLink
} from 'react-router-dom';

import {
    approveEmail,
    getEmails
} from '../../store/actions';

class ApproveEmailForm extends Component {
    state = {
        email: ''
    };

    handleChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    handleSubmit = e => {
        e.preventDefault();

        // handle submit logic
        this.props.approveEmail(this.state);
    };

    render() {
        const {
            email,
            first_name,
            last_name
        } = this.state;

        return ( 
            <div>
                <h2>Emails</h2>

                <input
                    placeholder = 'E-mail Address'
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

                <button>
                    <NavLink to='/upload'>
                        Import CSV
                    </NavLink>
                </button>

            </div>
        );
    }
}

const mapStoreToProps = state => {
    return {
        approvedEmails: state.emails.approvedEmails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        approveEmail: email => dispatch(approveEmail(email)),
        getEmails: () => dispatch(getEmails())
    }
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ApproveEmailForm);