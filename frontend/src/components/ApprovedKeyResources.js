import React, {
    Component
} from 'react';

import styled from 'styled-components';

import {
    connect
} from 'react-redux';

import {
    getKeyResources,
    deleteResource
} from '../store/actions';

import ReactTable from "react-table";
import "react-table/react-table.css";

const SubDrawer = styled.div`
  padding: 20px;
  display: flex;
`
const DeleteButton = styled.button`
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

class ApprovedKeyResources extends Component {
    componentDidMount() {
        this.props.getKeyResources()
    }

    handleClick(e, id) {
        e.preventDefault();

        this.props.deleteResource(id)
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
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
                    SubComponent={
                        row => {
                            console.log(row)
                            return (
                                <SubDrawer>
                                    <DeleteButton
                                        onClick={e => this.handleClick(e, row.original.id)}
                                    >Delete Resource</DeleteButton>
                                </SubDrawer>
                            );
                        }
                    }
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

export default connect(
    mapStoreToProps,
    { getKeyResources, deleteResource }
)(ApprovedKeyResources);