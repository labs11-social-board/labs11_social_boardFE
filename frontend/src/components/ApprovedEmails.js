import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    getEmails
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
                    defaultPageSize = {
                        5
                    }
                    className = "-striped -highlight"
                    getTrProps = {
                            (state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: e => {
                                            this.setState({
                                                selected: rowInfo.row._original
                                            });
                                        },
                                        style: {
                                            background: rowInfo.row.email === this.state.selected.email ?
                                                "#418DCF" :
                                                "white",
                                            color: rowInfo.row.email === this.state.selected.email ?
                                                "white" :
                                                "black"
                                        }
                                    };
                                } else {
                                    return {};
                                }
                            }}
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
        getEmails: () => dispatch(getEmails())
    }
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ApprovedEmails);