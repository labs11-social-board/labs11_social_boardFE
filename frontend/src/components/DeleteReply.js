import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeReply } from '../store/actions/RepliesActions.js'

const DeleteButton = styled.a`
    color: red !important;
    margin-left: 15px;
    cursor: pointer;
`

class DeleteReply extends React.Component {


    deleteReply = (e, id) => {
        e.preventDefault();
        this.props.removeReply(id);
        console.log('run :D');
        this.props.displayMessage('Reply deleted')
        if (this.teamId) {
            this.props.handleTeamFilter();
        } else {
            this.props.handleFilterChange();
        }
    }

    render() {

        return (
            <>
                {(this.props.user_type === 'admin' || this.props.user_type === 'moderator' || this.props.user_permissions === 'moderator') ?
                    (<DeleteButton  onClick={e => this.deleteReply(e, this.props.id)}>Delete comment</DeleteButton>) : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user_type: state.users.user_type,
    user_permissions: state.users.user_permissions,
    user_id: state.users.user_id,
    team_id: state.teams.team_id
})

export default connect(mapStateToProps, { removeReply })(DeleteReply);

