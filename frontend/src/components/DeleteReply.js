import React from 'react';
import { connect } from 'react-redux';
import { removeReply } from '../store/actions/RepliesActions.js'

class DeleteReply extends React.Component {
    constructor() {
        super()


    }



    deleteReply = (e, id) => {
        // e.preventDefault();
        this.props.removeReply(id);
        console.log('run :D');

        if (this.teamId) {
            this.props.handleTeamFilter();
        } else {
            this.props.handleFilterChange();
        }
    }

    render() {
        //    console.log(this.props)
        return (
            <>
                {(this.props.loggedInUserId === this.props.discussion_id || this.props.loggedInUserId === this.props.discussions_id  || this.props.user_type === 'admin' || this.props.user_type === 'moderator') ?
                    (<a onClick={e => this.deleteReply(e, this.props.id)}>Delete comment</a>) : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user_type: state.users.user_type,
    user_id: state.users.user_id,
    team_id: state.teams.team_id,
    loggedInUserId: state.users.user_id,
    discussion_id: state.discussions.discussion.user_id,
    discussions_id: state.discussions.id
})

export default connect(mapStateToProps, { removeReply })(DeleteReply);

