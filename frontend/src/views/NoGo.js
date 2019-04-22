import React from 'react';

import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod, makeBas } from './../store/actions/UsersActions';
import {getEmails} from './../store/actions'
import "react-table/react-table.css";


const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 98%;
  font-size: 1.0rem;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  padding-bottom: 5px;

  .title {
    margin-top: 30px;
    margin-bottom: 5px;
  }

`;

const InnerWrapper = styled.div`
width: 40%;
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
                    <InnerWrapper>
                    You are not logged in, or are attempting
                    to access a board or discussion that this 
                    account is not authorized to see. Please
                    log in with your company email
                    or contact your administrator.
                    </InnerWrapper>
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