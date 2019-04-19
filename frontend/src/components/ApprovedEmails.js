import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import styled from 'styled-components';

import {
    approveEmail,
    getEmails,
    denyEmail
} from '../store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";

const DenyButton = styled.button`
    border: 1px solid red;
    border-radius: 3px;
    background-color: red;
    color: white;
    font-weight: bold;
    height: 35px;
    width: 100px;
    margin-left: 4px;
    cursor: pointer;
`

const SubDrawer = styled.div`
  padding: 20px;
`

class ApprovedEmails extends Component {
    componentDidMount(){
        this.props.getEmails();
        this.addFilterPlaceholder();
    }

    handleClick(e, id){
        e.preventDefault();
        
        this.props.denyEmail(id)
        setTimeout(() => {
            window.location.reload();
        }, 400);
    }

    addFilterPlaceholder = () => {
        const filters = document.querySelectorAll("div.rt-th > input");
          for (let filter of filters) {
            filter.placeholder = "Search...";
          }
        }

    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.approvedEmails}
                    filterable
                    defaultFilterMethod = {
                        (filter, row) =>
                        String(row[filter.id]) === filter.value
                    }
                    columns = {
                        [
                            {
                                Header: "Approved E-Mails",
                                accessor: "email",
                                filterMethod: (filter, row) =>
                                    row[filter.id].startsWith(filter.value) &&
                                    row[filter.id].endsWith(filter.value)
                            }
                        ]
                    }
                    SubComponent = {
                        row => {
                            console.log(row)
                            return ( 
                                <SubDrawer>
                                    <DenyButton
                                        onClick={e => this.handleClick(e, row.original.id)}
                                    > Deny Email </DenyButton>
                                </SubDrawer>
                            );
                        }
                    }
                    defaultPageSize = {
                        5
                    }
                    className = "-striped -highlight"
                    style={
                        this.props.isDay ?
                        {
                            color: 'black'
                        }
                        : {
                            color: 'white'
                        }
                    }
                />
            </div>
        )
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
        getEmails: () => dispatch(getEmails()),
        denyEmail: id => dispatch(denyEmail(id))
    }
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ApprovedEmails);