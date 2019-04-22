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
                    <h4></h4>
                </MainWrapper>
                <hr></hr>
                <MainWrapper>
                    
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