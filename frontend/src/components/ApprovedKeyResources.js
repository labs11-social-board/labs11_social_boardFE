import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    approveEmail,
    getEmails,
    denyEmail
} from '../store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ApprovedKeyResources extends Component {
    componentDidMount(){
        this.props.getEmails();
    }

    handleClick(e, id){
        e.preventDefault();
        
        this.props.denyEmail(id)
        setTimeout(() => {
            window.location.reload();
        }, 800);
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
                                Header: "E-Mail",
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
                                <div>
                                    <button
                                        onClick={e => this.handleClick(e, row.original.id)}
                                    >Deny Email</button>
                                </div>
                            );
                        }
                    }
                    defaultPageSize = {
                        5
                    }
                    className = "-striped -highlight"
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
)(ApprovedKeyResources);