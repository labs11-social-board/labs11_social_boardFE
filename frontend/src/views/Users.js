import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod, makeBas } from './../store/actions/UsersActions';
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

    buttony2 = (event, userNum) => {
        event.preventDefault();
        this.props.makeBas(userNum);
        setTimeout(() => {
            window.location.reload();
            }, 800);
    }
    
    render() {


        return (
          <div>
            {/* <div >
                    <h4>
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
                                    onChange={e => {this.buttony2(e, user.id)}} />
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
                    
                    </h4>
                </div> */}

            <ReactTable
              data={this.props.users.usersNmods}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
              }
              columns={[
                {
                  Header: "Username",
                  accessor: "username",
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: "E-Mail",
                  accessor: "email",
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                },
                {
                    Header: "Account Type",
                    accessor: "user_permissions",
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "true") {
                            return row[filter.id] === 'moderator';
                        }
                        return row[filter.id] === 'basic';
                    },
                    Filter: ({ filter, onChange }) => (
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Show All</option>
                            <option value="true">Moderator</option>
                            <option value="false">Basic</option>
                        </select>
                    )
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    };
  };
  
  export default connect(
    mapStateToProps,{ getUsers, getUsersNMods, makeMod, makeBas } 
  )(Users);