import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod, makeBas } from './../store/actions/UsersActions';
import {getEmails, approveEmail, denyEmail} from './../store/actions'
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
    constructor(props) {
        super(props)

        // this.state = {
        //   selected: {
        //     index: 0
        //   },
        //   emails: []
        // };
    }



    componentDidMount() {
        this.props.getUsersNMods();
        this.props.getEmails();
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
    
    handleEmailToggle(event, email){

      event.preventDefault();
  
      if (this.props.approvedEmails.map(e => e.email).includes(email)) {
        this.props.approvedEmails.map(e => {
          if (e.email === email) {
            this.props.denyEmail(e.id)
          }
        })
      } else {
        this.props.approveEmail({email})
      }
      
      
      
      
      setTimeout(() => {
        window.location.reload();
      }, 800);

    }
    
    render() {
    return (
      <div>
        <ReactTable
          data={this.props.users.usersNmods}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          SubComponent = {
            row => {
              console.log(row)
              return ( 
                <div>

                  {
                    row.original.user_permissions === 'moderator' ?
                      <button
                      onClick = {
                          e => {
                            this.buttony2(e, row.original.id);
                          }
                        } >
                        Make Basic 
                        </button>
                    :
                      <button
                      onClick = {
                          e => {
                            this.buttony(e, row.original.id);
                          }
                        }>
                        Make Moderator 
                        </button>
                  }
                  <button
                  onClick = {
                      e => {
                        this.handleEmailToggle(e, row.original.email)
                      }
                    }>
                    Toggle E-mail Status</button>
                </div>
              );
            }
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
                  return row[filter.id] === "moderator";
                }
                return row[filter.id] === "basic";
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
            },
            {
              Header: "E-Mail Status",
              id: "email_status",
              accessor: (u => {

                let emails = this.props.approvedEmails.map(e => e.email);

                return emails.includes(u.email) ? 'Approved' : 'Denied'
              }),
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if (filter.value === "true") {
                  return row[filter.id] === "Approved";
                }
                return row[filter.id] === "Denied";
              },
              Filter: ({
                filter,
                onChange
              }) => ( 
                <select onChange = {
                  event => onChange(event.target.value)
                }
                style = {
                  {
                    width: "100%"
                  }
                }
                value = {
                  filter ? filter.value : "all"
                } >
                <option value = "all"> Show All </option> 
                <option value = "true"> Approved </option> 
                <option value = "false" > Denied </option> 
                </select>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          // getTrProps={(state, rowInfo) => {
          //   if (rowInfo && rowInfo.row) {
          //     return {
          //       onClick: e => {
          //         this.setState({
          //           selected: rowInfo.row._original
          //         });
          //       },
          //       style: {
          //         background:
          //           rowInfo.row.email === this.state.selected.email
          //             ? "#418DCF"
          //             : "white",
          //         color:
          //           rowInfo.row.email === this.state.selected.email
          //             ? "white"
          //             : "black"
          //       }
          //     };
          //   } else {
          //     return {};
          //   }
          // }}
        />
      </div>
    ); 
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        approvedEmails: state.emails.approvedEmails,
        approvingEmail: state.emails.approvingEmail,
        deletingEmail: state.emails.deletingEmail,
        fetchingEmails: state.emails.fetchingEmails
    };
  };

  // const mapDispatchToProps = dispatch => {
  //   return {
  //     approveEmail: email => dispatch(approveEmail(email)),
  //     getEmails: () => dispatch(getEmails()),
  //     denyEmail: 
  //   }
  // }
  
  export default connect(
    mapStateToProps,{ getUsers, getUsersNMods, makeMod, makeBas, getEmails, approveEmail, denyEmail } 
  )(Users);
