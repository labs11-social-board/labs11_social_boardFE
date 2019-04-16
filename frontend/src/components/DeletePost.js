import React from 'react';
import { connect } from 'react-redux';
import { removePost, addDeletedPost } from '../store/actions/PostsActions.js'

class DeletePost extends React.Component {

  handleRemovePost = (e, id) => {
    // e.preventDefault();
    this.props.handleAddDeletedPost(e, id)
    this.props.removePost(id);
    console.log('run :D');

    if (this.teamId) {
      this.props.handleTeamFilter();
    } else {
      this.props.handleFilterChange();
    }
  }

  handleAddDeletedPost = (e, id) => {
    this.props.addDeletedPost(id)
  }

  render() {
       console.log(this.props.user_type)
    return (
      <>
        {(this.props.user_type === 'admin' || this.props.user_type === 'moderator') ?
          (<a onClick={e => this.handleRemovePost(e, this.props.id)}>Delete comment</a>) : null}
      </>
    )
  }
}

const mapStateToProps = state => ({
  user_type: state.users.user_type,
  user_id: state.users.user_id,
  team_id: state.teams.team_id
})

export default connect(mapStateToProps, { removePost, addDeletedPost })(DeletePost);

