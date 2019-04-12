import React from 'react';
import { connect } from 'react-redux';
import { removePost, addDeletedPost } from '../store/actions/PostsActions.js'

class DeleteComment extends React.Component {

   handleRemovePost = (e, id) => {
        // e.preventDefault();
        this.props.removePost(id);
        console.log('run :D');
    
        if (this.teamId) {
          this.props.handleTeamFilter();
        } else {
          this.props.handleFilterChange();
        }
    }

    handleAddDeletedPost = (e, id, post) => {
      this.props.addDeletedPost(id, post)
    }
  
    render() {
    //    console.log(this.props)
        return (
            <> 
            
          {( this.props.user_type === 'admin' || this.props.user_type === 'moderator') ? 
          (<a onClick={e => this.handleRemovePost(e, this.props.id)}>Delete comment</a>) : null} : 
          {(this.props.loggedInUserId === this.props.discussion_id || this.props.loggedInUserId === this.props.post_id) ? 
          (<a onClick={e => this.handleRemovePost(e, this.props.id)}>Delete comment</a>) : null}
          
          </>
        )
    }   
}

const mapStateToProps = state =>( {
    user_type: state.users.user_type,
    user_id: state.users.user_id,
    team_id: state.teams.team_id,
    loggedInUserId: state.users.user_id,
    discussion_id: state.discussions.discussion.user_id,
    post_id: state.discussions.discussion.posts.user_id
})

export default connect(mapStateToProps, {removePost, addDeletedPost})(DeleteComment);

 