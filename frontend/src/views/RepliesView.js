import React from 'react';
import styled from 'styled-components';

import { Reply } from '../components/index.js';

const RepliesViewWrapper = styled.div``;

const RepliesView = ({
    replies,
    historyPush,
    showAddReplyForm,
    toggleAddReplyForm,
}) => {
    return(
        <RepliesViewWrapper>
            {replies.map((reply, index) =>
                <Reply
                    key = {index}
                    reply = {reply}
                    historyPush = { historyPush }
                    showAddReplyForm={showAddReplyForm}
                    toggleAddReplyForm={toggleAddReplyForm}
                />)
            }
        </RepliesViewWrapper>
    )
};

export default RepliesView;