import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod } from './../store/actions/UsersActions';

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

        
    }

    

    componentDidMount() {
        this.props.getUsersNMods();
        //this.props.getUsers();
    }

    buttony = (event, userNum) => {
        event.preventDefault();
        this.props.makeMod(userNum);
        setTimeout(() => {
            window.location.reload();
            }, 800);
    }
    
    render() {


        return (
            <div>
                <div >
                    <h4>
<<<<<<< HEAD
                        {this.props.users.users.map(user => {
                            return (

                                <MainWrapper>
                                    <InnerWrapper>{user.username}</InnerWrapper>
                                    <InnerWrapper>{user.email}</InnerWrapper>
                                </MainWrapper>

                            )
                        })}
                        {console.log(this.props)}
=======
                    <MainWrapper>
                    <InnerWrapper>Name</InnerWrapper>
                    <InnerWrapper>E-Mail</InnerWrapper>
                    <InnerWrapper>Moderator</InnerWrapper>
                    </MainWrapper>
                    <hr></hr>

                    {this.props.users.usersNmods.map(user =>{
                        return (
                            
                            <MainWrapper>
                                <InnerWrapper>{user.username}</InnerWrapper>
                                <InnerWrapper>{user.email}</InnerWrapper>
                                
                                <InnerWrapper>
                                {
                                    (user.user_permissions == 'moderator') &&
                                    <input
                                    name="isMod"
                                    type="checkbox"
                                    checked='true'
                                    onChange={this.handleInputChange} />
                                }
                                {
                                    (user.user_permissions == 'basic') &&
                                    <input
                                    name="notMod"
                                    type="checkbox"
                                    checked=''
                                    onChange={e => {this.buttony(e, user.id)}} />
                                }
                                
                                </InnerWrapper>
                            </MainWrapper>
                                    
                        )
                    })}
                    
>>>>>>> 11a2f825ffb0a832eba920ce934d563a7bb2040f
                    </h4>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    };
<<<<<<< HEAD
};

export default connect(
    mapStateToProps, { getUsers, getUsersNMods }
)(Users);
=======
  };
  
  export default connect(
    mapStateToProps,{ getUsers, getUsersNMods, makeMod } 
  )(Users);
>>>>>>> 11a2f825ffb0a832eba920ce934d563a7bb2040f
