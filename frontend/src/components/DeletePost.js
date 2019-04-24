import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { removePost, addDeletedPost } from '../store/actions/PostsActions.js'

const DeleteButton = styled.a`
    margin-left: 15px;
    color: #D8D8D8;
    cursor: pointer;
`

class DeletePost extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.setState({
      posts: this.props.post
    })
  }

  handleRemovePost = (e, id) => {
    e.preventDefault();

    this.handleAddDeletedPost(e, id)
    this.props.removePost(id);
    console.log('run :D');
    this.props.displayMessage('Post deleted')

    if (this.teamId) {
      this.props.handleTeamFilter();
    } else {
      this.props.handleFilterChange();
    }
  }

  handleAddDeletedPost = (e, id) => {
    const post = this.state.posts.filter(p => p.id === id)
    this.props.addDeletedPost(id, post)
  }

  render() {
  
    return (
      <>
        {(this.props.user_type === 'admin' || this.props.user_type === 'moderator' || this.props.user_permissions === 'moderator') ?
          (<DeleteButton onClick={e => this.handleRemovePost(e, this.props.id)}>Hide Comment</DeleteButton>) : null}
      </>
    )
  }
}

const mapStateToProps = state => ({
  user_type: state.users.user_type,
  user_permissions: state.users.user_permissions,
  user_id: state.users.user_id,
  team_id: state.teams.team_id,
  post: state.discussions.discussion.posts
})

export default connect(mapStateToProps, { removePost, addDeletedPost })(DeletePost);

