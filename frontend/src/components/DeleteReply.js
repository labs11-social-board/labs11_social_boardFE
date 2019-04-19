import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removeReply } from '../store/actions/RepliesActions.js'
import { addDeletedPost } from '../store/actions/PostsActions.js'


const DeleteButton = styled.a`
    color: red !important;
    margin-left: 15px;
    cursor: pointer;
`

class DeleteReply extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            replies: []
        }


    }

    componentDidMount() {
        const replyArray = [];
        replyArray.push(this.props.replies.map(reply => {
            return reply.replies
            
        }))

        for(let i = 0; i < replyArray.length; i++) {
            console.log(replyArray[i])
        }

        this.setState({
            replies: replyArray
        })
    }

    deleteReply = (e, id) => {
        e.preventDefault();
        this.handleAddDeletedReply(e, id)
        this.props.removeReply(id);
        console.log('run :D');
        this.props.displayMessage('Reply deleted')
        if (this.teamId) {
            this.props.handleTeamFilter();
        } else {
            this.props.handleFilterChange();
        }
    }

    handleAddDeletedReply = (e, id) => {

        const post = this.state.replies.filter(r => {
            console.log(r.replies)
        })

        this.props.addDeletedPost(id, post)
    }



    render() {
        console.log(this.state.replies)
        return (
            <>
                {(this.props.user_type === 'admin' || this.props.user_type === 'moderator' || this.props.user_permissions === 'moderator') ?
                    (<DeleteButton onClick={e => this.deleteReply(e, this.props.id)}>Delete comment</DeleteButton>) : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    user_type: state.users.user_type,
    user_permissions: state.users.user_permissions,
    user_id: state.users.user_id,
    team_id: state.teams.team_id,
    replies: state.discussions.discussion.posts
})

export default connect(mapStateToProps, { removeReply, addDeletedPost })(DeleteReply);

