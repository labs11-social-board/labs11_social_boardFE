import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod, makeBas } from './../store/actions/UsersActions';
import {getEmails} from './../store/actions'
import ReactTable from "react-table";
import "react-table/react-table.css";


const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  font-size: 1.0rem;
  justify-content: space-between;
  justify-items: right;
  align-items: right;
  align-content: right;
  padding-bottom: 5px;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

`;

const InnerWrapper = styled.div`
width: 23%;
font-size: 1.1rem;


`;


class Users extends React.Component {
    constructor() {
        super()

        this.state = {
          selected: {
            index: 0
          },
          emails: []
        };
    }

    

    componentDidMount() {
        
    }

        
    render() {


    return (
        <div>
            <div >
                
                <MainWrapper>
                    <h4>ACCOUNT NOT ALLOWED</h4>
                </MainWrapper>
                <hr></hr>
                <MainWrapper>
                    <p>You are not logged in, or are attempting to access a board or
                        discussion that this account is not authorized to see. Please
                        log in with your company email or contact your administrator.</p>
                </MainWrapper>

            </div>
       
        </div>
        );  
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        approvedEmails: state.emails.approvedEmails
    };
  };
  
  export default connect(
    mapStateToProps,{ getUsers, getUsersNMods, makeMod, makeBas, getEmails } 
  )(Users);