import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    getKeyResources
} from '../store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ApprovedKeyResources extends Component {
    componentDidMount() {
        this.props.getKeyResources()
    }

    // handleClick(e, id) {
    //     e.preventDefault();

    //     this.props.denyEmail(id)
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 800);
    // }
    render() {
        return (
            <div>
                <ReactTable
                    data={this.props.resources}
                    columns={
                        [
                            {
                                Header: "Title",
                                accessor: "title",
                                minWidth: 40
                            },
                            {
                                Header: "Username",
                                accessor: "username",
                                minWidth: 20
                            },
                            {
                                Header: "Info",
                                accessor: "info",
                                minWidth: 40
                            },
                            {
                                Header: "Resource",
                                accessor: 'resource'
                            }
                        ]
                    }
                    // SubComponent={
                    //     row => {
                    //         console.log(row)
                    //         return (
                    //             <div>
                    //                 <button
                    //                     onClick={e => this.handleClick(e, row.original.id)}
                    //                 >Deny Email</button>
                    //             </div>
                    //         );
                    //     }
                    // }
                    defaultPageSize={
                        5
                    }
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

const mapStoreToProps = state => {
    return {
        resources: state.emails.resources
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         approveEmail: email => dispatch(approveEmail(email)),
//         getEmails: () => dispatch(getEmails()),
//         denyEmail: id => dispatch(denyEmail(id))
//     }
// }

export default connect(
    mapStoreToProps,
    { getKeyResources }
)(ApprovedKeyResources);