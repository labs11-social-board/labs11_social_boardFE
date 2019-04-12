import React from 'react';
import styled from 'styled-components';

// components
import { Post } from '../components/index.js';


const PostsViewWrapper = styled.div`
`;

const PostsView = ({
	posts,
	historyPush,
	showEditPostForm,
	showAddReplyForm,
	updateEditPostForm,
	handleRemovePost,
	toggleAddReplyForm,
	handleFilterChange,
	handleTeamFilter,
	scrollTo,
	team_id,
  isShowImage,
  handleImageShow
}) => {
	
	return(
		
		<PostsViewWrapper>
			{ posts.map((post, index) =>
				<Post
					key = { index }
					post = { post }
					historyPush = { historyPush }
					showEditPostForm = { showEditPostForm }
					showAddReplyForm = {showAddReplyForm}
					updateEditPostForm = { updateEditPostForm }
					handleRemovePost = { handleRemovePost }
					toggleAddReplyForm = { toggleAddReplyForm }
					handleFilterChange = { handleFilterChange }
					handleTeamFilter = { handleTeamFilter }
					team_id = { team_id }
					scrollTo = { scrollTo }
					isShowImage = { isShowImage}
					handleImageShow = { handleImageShow}
				/>)
			}
		</PostsViewWrapper>
	)
};

export default PostsView;
