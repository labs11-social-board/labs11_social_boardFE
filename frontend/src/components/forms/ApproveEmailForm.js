import React, { Component } from 'react';
import {
    connect
} from 'react-redux';
import {
    NavLink
} from 'react-router-dom';
import styled from 'styled-components';
import {
    approveEmail,
    getEmails
} from '../../store/actions';

const ButtonY = styled.button`
    border: 1px solid #f66042;
    border-radius: 3px;
    color: white;
    background-color: #f66042;
    height: 35px;
    width: 100px;
    margin-left: 4px;
  `;

const ButtonX = styled.button`
    border: 1px solid #f66042;
    border-radius: 3px;
    color: white;
    background-color: #f66042;
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
  width: 250px;
  color: #000000;
  background: dcdcdc;
  border: 1px solid black;
  border-radius: 3px;
`;

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

        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    render() {
        const {
            email
        } = this.state;

        return (
            <div>
                <h2>Add Approved Emails</h2>
                <p>(Add one at a time, or upload a CSV file)</p>

                <InputY
                    placeholder='E-mail Address'
                    name='email'
                    type='email'
                    required
                    value={
                        email
                    }
                    onChange={
                        this.handleChange
                    }
                />

                <ButtonY type='submit'
                    onClick={
                        this.handleSubmit
                    }>Add</ButtonY>


                <ButtonX>
                    <StyledLink to='/upload'>
                        Import CSV
                    </StyledLink>
                </ButtonX>
                {/* <br></br>
                <br></br>
                <ButtonY>
                    <StyledLink to='/upload'>
                        E-Mail List View
                    </StyledLink>
                </ButtonY> */}


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