import React from 'react';
import { connect } from 'react-redux';
import { getDeletedPost } from '../store/actions/index';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class DeletedPostAndMods extends React.Component {


    componentDidMount() {
        this.props.getDeletedPost();
    }

    render() {
        console.log(this.props.deletedPost)

        return (
            <>
                <ReactTable
                    data={this.props.deletedPost}
                    columns={[
                        {
                            Header: 'Username',
                            accessor: 'username',
                        },
                        {
                            Header: 'Deleted Post',
                            accessor: 'post',
                        }
                    ]}
                    style={
                        {
                            width: '100%'
                        }
                    }
                    defaultPageSize={5}
                    className='-striped -highlight'
                />
            </>
        )
    }
};

const mapStoreToProps = state => {
    return {
        deletedPost: state.posts.deletedPost
    }
}

export default connect(mapStoreToProps, { getDeletedPost })(DeletedPostAndMods);