import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import Users from './Users';

import { ApproveEmailForm, ApprovedEmails, DeletedPostAndMods } from '../components'

import '../components/css/Admin.css'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  font-size: 1.4rem;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  align-content: center;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

`;

const InnerWrapper = styled.div`
width: 90%;
font-size: 1.1rem;
justify-content: space-around;
justify-items: center;
align-items: center;
align-content: center;
`;

const Boxed = styled.div`
width: 100%;
padding: 10px;
border: 2px solid #418dcf;
border-radius: 5px;
flex-direction: column;
justify-content: space-around;
margin-bottom: 10px;
`;

const TableWrapper = styled.div`
width: 90%;
`;




class Admin extends React.Component {
    constructor() {
        super()

    }

    // componentDidMount() {

    // }

    render() {
        //if (!this.props.isLoggedIn) return <h2>--Yo, dog.  You ain't logged in.  Do That <Link to="/">HERE</Link> </h2>;

        return (
            <TableWrapper>

                <div>
                    <MainWrapper>
                        <div>
                            <h2>Admin Console</h2>
                        </div>

                        <InnerWrapper>
                            <Boxed>
                                <ApproveEmailForm histoy={this.props.history} isDay={this.props.isDay} />
                            </Boxed>
                            <Boxed>
                                <ApprovedEmails isDay={this.props.isDay}/>
                            </Boxed>
                            <Boxed>
                                <h4>Users</h4>

                                <Users isDay={this.props.isDay}/>

                            </Boxed>
                            <Boxed>
                                <h4>Deleted Post</h4>
                                <DeletedPostAndMods isDay={this.props.isDay}/>
                            </Boxed>
                        </InnerWrapper>
                    </MainWrapper>
                </div>
            </TableWrapper>
        )
    }
}

const mapStoreToProps = state => {
    console.log('Admin State', state)
    return {

    };
};

export default Admin;