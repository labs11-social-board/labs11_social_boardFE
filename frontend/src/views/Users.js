import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods } from './../store/actions/UsersActions';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  font-size: 1.0rem;
  justify-content: space-around;
  justify-items: left;
  align-items: left;
  align-content: left;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

`;

const InnerWrapper = styled.div`
width: 30%;
font-size: 1.1rem;
justify-content: space-around;
justify-items: center;
align-items: center;
align-content: center;
`;

class Users extends React.Component {
    constructor() {
        super()

    }

    componentDidMount() {
        this.props.getUsersNMods();
        this.props.getUsers();
    }

    render() {


        return (
            <div>
                <div >
                    <h4>
                        {this.props.users.users.map(user => {
                            return (

                                <MainWrapper>
                                    <InnerWrapper>{user.username}</InnerWrapper>
                                    <InnerWrapper>{user.email}</InnerWrapper>
                                </MainWrapper>

                            )
                        })}
                        {console.log(this.props)}
                    </h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        usersNmods: state.usersNmods,
    };
};

export default connect(
    mapStateToProps, { getUsers, getUsersNMods }
)(Users);