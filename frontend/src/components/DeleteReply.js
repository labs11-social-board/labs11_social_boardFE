import React from 'react';
import { connect } from 'react-redux';
import { removeReply } from '../store/actions/RepliesActions.js'

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
                {(this.props.user_type === 'admin' || this.props.user_type === 'moderator') ?
                    (<a onClick={e => this.deleteReply(e, this.props.id)}>Delete comment</a>) : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user_type: state.users.user_type,
    user_id: state.users.user_id,
    team_id: state.teams.team_id
})

export default connect(mapStateToProps, { removeReply })(DeleteReply);

