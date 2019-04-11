import React from 'react';
import { connect } from 'react-redux';
import { removePost } from '../store/actions/PostsActions.js'

const backendURL = 

class DeleteComment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            discussions: []
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            discussions: this.props.discussions
        })
    }

   handleRemovePost = (e, id) => {
        // e.preventDefault();
        removePost(id);
        console.log('run :D');
    
        // if (this.teamId) {
        //   handleTeamFilter();
        // } else {
        //   handleFilterChange();
        // }
    }
  
    render() {
console.log(this.state.discussions)
        return (
            <>    
          {(this.props.user_type == 'admin' || this.props.user_type == 'moderator') ? 
          (<a onClick={e => this.handleRemovePost(e, this.state.discussions.id)}>Delete comment</a>) : null}
          </>
         
         
        )
    }   
}

const mapStateToProps = state =>( {
    user_type: state.users.user_type,
    user_id: state.users.user_id,
    team_id: state.teams.team_id,
    discussions: state.discussions.discussion
})

export default connect(mapStateToProps, {removePost})(DeleteComment);

 