import React from 'react';
import styled from 'styled-components';

// components
import { Discussion} from '../components/index.js';

const DiscussionViewWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 90%;
`;

const DiscussionView = ({ history, match, scrollTo }) => {
	const { id } = match.params;
	const historyPush = history.push;
	return(
		<DiscussionViewWrapper>
			<Discussion id = { id } scrollTo = {scrollTo} historyPush = { historyPush } history = { history } />
		</DiscussionViewWrapper>
	);
};

export default DiscussionView;
