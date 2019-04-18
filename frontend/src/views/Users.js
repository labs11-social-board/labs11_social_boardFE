import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { getUsers, getUsersNMods, makeMod, makeBas } from './../store/actions/UsersActions';
import {getEmails, approveEmail, denyEmail} from './../store/actions'
import ReactTable from "react-table";
import "react-table/react-table.css";

const SubDrawer = styled.div`
  padding: 20px;
  display: flex;
`

const Button = styled.button`
    border: 1px solid #418DCF;
    border-radius: 3px;
    color: white;
    background-color: #418DCF;
    height: 35px;
    width: 100px;
    margin-left: 4px;
    cursor: pointer;
    margin-right: 20px;
`

class Users extends Component {
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
                <SubDrawer>

                  {
                    row.original.user_permissions === 'moderator' ?
                      <Button
                      onClick = {
                          e => {
                            this.buttony2(e, row.original.id);
                          }
                        } >
                        Make Basic 
                        </Button>
                    :
                      <Button
                      onClick = {
                          e => {
                            this.buttony(e, row.original.id);
                          }
                        }>
                        Make Moderator 
                        </Button>
                  }
                  <Button
                  onClick = {
                      e => {
                        this.handleEmailToggle(e, row.original.email)
                      }
                    }>
                    Toggle E-mail Status</Button>
                </SubDrawer>
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
          style = {
            this.props.isDay ? {
              color: 'black'
            } :
            {
              color: 'white'
            }
          }
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
