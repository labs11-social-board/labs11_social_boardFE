import React from 'react';
import styled from 'styled-components';
import {phoneP, tabletP, } from '../globals/globals';

/***************************************************************************************************
 ********************************************** Styles **********************************************
 **************************************************************************************************/
const PostCountWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	border: ${props => props.theme.postCountWrapperBorder};
	font-size: 0.8rem;
	color: #a7a7a7;

	@media ${tabletP}{

		@media ${phoneP}{

		}
	  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/


 const PostCount = ({ post_count }) => {
	 let plural = () => {
		if (post_count <= 1) {
			return 'Comment'
		} else {
			return 'Comments'
		}
	}
	return (
		<PostCountWrapper>
			<div>{ post_count } </div>
			<div>&nbsp;&nbsp;{plural()}</div>
		</PostCountWrapper>
	);
};

export default PostCount;
