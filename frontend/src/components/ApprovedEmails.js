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

class ApprovedEmails extends Component {
    state = {
        approvedEmails: this.props.approvedEmails,
        selected: {index:0}
    }
    componentDidMount(){
        this.props.getEmails();
    }

    handleClick(id){
        this.props.denyEmail(id)
        setTimeout(() => {
            window.location.reload();
        }, 800);
        // alert('Approve or Deny')
    }
    render() {
        return (
            <div>
                {/* <button onClick={() => {
                    this.handleClick()
                    }}>Deny Email</button> */}
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
                                        onClick={() => this.handleClick(row.original.id)}
                                    >Deny Email</button>
                                </div>
                            );
                        }
                    }
                    defaultPageSize = {
                        5
                    }
                    className = "-striped -highlight"
                    // getTrProps = {
                    //         (state, rowInfo) => {
                    //             if (rowInfo && rowInfo.row) {
                    //                 return {
                    //                     onClick: async e => {
                    //                         this.setState({
                    //                             selected: rowInfo.row._original
                    //                         });

                    //                         // this.handleClick()
                    //                     },
                    //                     // style: {
                    //                     //     background: rowInfo.row.email === this.state.selected.email ?
                    //                     //         "#418DCF" :
                    //                     //         "white",
                    //                     //     color: rowInfo.row.email === this.state.selected.email ?
                    //                     //         "white" :
                    //                     //         "black"
                    //                     // }
                    //                 };
                    //             } else {
                    //                 return {};
                    //             }
                            // }}
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